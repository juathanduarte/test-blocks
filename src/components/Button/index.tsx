import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";
import Spinner from "../Spinner";
export type TButtonVariant = "default" | "outlined" | "error";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
	label?: string;
	variant?: TButtonVariant;
	loading?: boolean;
	height?: number | string;
	width?: number | string;
	className?: string;
	icon?: ReactNode;
}

const Button = ({
	label,
	variant = "default",
	loading = false,
	disabled = false,
	height,
	width,
	children,
	className = "",
	style,
	icon,
	...rest
}: IButton) => {
	let variantClass = "";

	if (variant === "outlined") {
		variantClass = `flex flex-row items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors w-full text-left border border-purple-200 ${disabled ? "bg-gray-100 text-gray-400" : "text-gray-700 hover:bg-purple-50"}`;
	} else if (variant === "error") {
		variantClass =
			"flex flex-row items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition-all font-medium focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed";
	} else {
		variantClass =
			"flex flex-row items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition-all font-medium focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed";
	}

	const customStyle: CSSProperties = {
		...style,
		...(height ? { height } : {}),
		...(width ? { width } : {}),
	};

	return (
		<button
			disabled={disabled || loading}
			className={`${variantClass} ${className}`}
			style={customStyle}
			{...rest}
		>
			{loading ? (
				<span className="flex items-center">
					<Spinner height={16} width={16} />
				</span>
			) : (
				icon && <span className="flex items-center text-inherit">{icon}</span>
			)}
			<span className="flex-1 min-w-0 truncate text-center">
				{label ? label : children}
			</span>
		</button>
	);
};

export default Button;
