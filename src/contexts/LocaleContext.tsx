import type { SupportedLocale } from "@/hooks/useTranslation";
import {
	type ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";

interface ILocaleContext {
	locale: SupportedLocale;
	setLocale: (locale: SupportedLocale) => void;
}

const LocaleContext = createContext<ILocaleContext | undefined>(undefined);

const LOCALE_KEY = "app_locale";
const DEFAULT_LOCALE: SupportedLocale = "pt-br";
const SUPPORTED: SupportedLocale[] = ["pt-br", "en-us", "es-es"];

export function LocaleProvider({ children }: { children: ReactNode }) {
	const [locale, setLocaleState] = useState<SupportedLocale>(DEFAULT_LOCALE);
	const [isReady, setIsReady] = useState<boolean>(false);

	useEffect(() => {
		const saved = localStorage.getItem(LOCALE_KEY) as SupportedLocale | null;
		if (saved && SUPPORTED.includes(saved)) {
			setLocaleState(saved);
			setIsReady(true);
			return;
		}
		const browser = navigator.language.toLowerCase();
		const found = SUPPORTED.find((l) => browser.startsWith(l));
		setLocaleState(found || DEFAULT_LOCALE);
		setIsReady(true);
	}, []);

	const setLocale = (newLocale: SupportedLocale) => {
		setLocaleState(newLocale);
		localStorage.setItem(LOCALE_KEY, newLocale);
	};

	if (!isReady) return null;

	return (
		<LocaleContext.Provider value={{ locale, setLocale }}>
			{children}
		</LocaleContext.Provider>
	);
}

export function useLocale() {
	const ctx = useContext(LocaleContext);
	if (!ctx)
		throw new Error("useLocale deve ser usado dentro de LocaleProvider");
	return ctx;
}
