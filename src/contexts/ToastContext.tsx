import type { IToast, TToastPosition, TToastType } from "@/components/Toast";
import { ToastContext, ToastList } from "@/components/Toast";
import {
	type ReactNode,
	useCallback,
	useContext,
	useRef,
	useState,
} from "react";

export const ToastProvider = ({
	children,
	position = "top-right",
}: {
	children: ReactNode;
	position?: TToastPosition;
}) => {
	const [toasts, setToasts] = useState<IToast[]>([]);
	const toastId = useRef(0);

	const showToast = useCallback(
		(message: string, type: TToastType = "info") => {
			const id = ++toastId.current;
			setToasts((prev) => [...prev, { id, message, type }]);
			setTimeout(() => {
				setToasts((prev) => prev.filter((t) => t.id !== id));
			}, 3500);
		},
		[],
	);

	const removeToast = (id: number) => {
		setToasts((prev) => prev.filter((t) => t.id !== id));
	};

	const visibleToasts = toasts.slice(0);

	return (
		<ToastContext.Provider value={{ showToast }}>
			{children}
			<ToastList
				toasts={visibleToasts}
				position={position}
				removeToast={removeToast}
			/>
		</ToastContext.Provider>
	);
};

export const useToast = () => {
	const ctx = useContext(ToastContext);
	if (!ctx) throw new Error("useToast deve ser usado dentro do ToastProvider");
	return ctx;
};
