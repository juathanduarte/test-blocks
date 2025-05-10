import { AnimatePresence, motion } from "framer-motion";
import { createContext } from "react";
import {
	FiAlertTriangle,
	FiCheckCircle,
	FiInfo,
	FiX,
	FiXCircle,
} from "react-icons/fi";

export type TToastType = "info" | "success" | "warning" | "error";
export type TToastPosition =
	| "top-right"
	| "top-left"
	| "bottom-right"
	| "bottom-left";

export interface IToast {
	id: number;
	message: string;
	type: TToastType;
}

export interface IToastContext {
	showToast: (message: string, type?: TToastType) => void;
}

export const ToastContext = createContext<IToastContext | undefined>(undefined);

const iconMap = {
	info: <FiInfo className="text-blue-500" size={22} />,
	success: <FiCheckCircle className="text-green-500" size={22} />,
	warning: <FiAlertTriangle className="text-yellow-500" size={22} />,
	error: <FiXCircle className="text-red-500" size={22} />,
};

const baseStyle =
	"flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg mb-2 min-w-[240px] max-w-xs text-sm font-medium bg-white border";
const typeStyle = {
	info: "border-blue-200 text-blue-900",
	success: "border-green-200 text-green-900",
	warning: "border-yellow-200 text-yellow-900",
	error: "border-red-200 text-red-900",
};

const positionStyleMap: Record<TToastPosition, string> = {
	"top-right": "top-6 right-6 items-end",
	"top-left": "top-6 left-6 items-start",
	"bottom-right": "bottom-6 right-6 items-end",
	"bottom-left": "bottom-6 left-6 items-start",
};

export function ToastList({
	toasts,
	position = "top-right",
	removeToast,
}: {
	toasts: IToast[];
	position?: TToastPosition;
	removeToast: (id: number) => void;
}) {
	return (
		<div
			className={`fixed z-[9999] flex flex-col pointer-events-none ${positionStyleMap[position]}`}
			style={{ maxWidth: 360 }}
		>
			<AnimatePresence initial={false}>
				{toasts.map((toast) => (
					<motion.div
						key={toast.id}
						initial={{ opacity: 0, y: -30 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -30 }}
						transition={{ type: "spring", stiffness: 400, damping: 30 }}
						className={`${baseStyle} ${typeStyle[toast.type]} pointer-events-auto relative`}
					>
						{iconMap[toast.type]}
						<span className="flex-1">{toast.message}</span>
						<button
							className="ml-2 text-gray-400 hover:text-gray-700 transition-colors"
							onClick={() => removeToast(toast.id)}
							aria-label="Fechar toast"
							type="button"
						>
							<FiX size={18} />
						</button>
					</motion.div>
				))}
			</AnimatePresence>
		</div>
	);
}
