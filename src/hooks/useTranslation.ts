import { useCallback } from "react";
import dictionary from "./dictionary.json";

export type SupportedLocale = keyof typeof dictionary;

export const useTranslation = (locale: SupportedLocale) => {
	const t = useCallback(
		(key: keyof (typeof dictionary)[SupportedLocale]) => {
			return dictionary[locale]?.[key] || key;
		},
		[locale],
	);
	return { t };
};
