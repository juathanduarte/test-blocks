import type { CSSProperties } from "react";

interface ISpinner {
	height?: number | string;
	width?: number | string;
	color?: string;
	className?: string;
	style?: CSSProperties;
}

const Spinner = ({
	height = 20,
	width = 20,
	color = "currentColor",
	className = "",
	style,
}: ISpinner) => {
	return (
		<svg
			className={`animate-spin ${className}`}
			height={height}
			width={width}
			style={style}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
		>
			<circle
				className="opacity-25"
				cx="12"
				cy="12"
				r="10"
				stroke={color}
				strokeWidth="4"
			/>
			<path
				className="opacity-75"
				fill={color}
				d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
			/>
		</svg>
	);
};

export default Spinner;
