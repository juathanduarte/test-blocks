import { AnimatePresence, motion } from "framer-motion";
import { type ReactNode, useState } from "react";

interface ITooltip {
	content: string;
	children: ReactNode;
	placement?: TPlacement;
	visible?: boolean;
}

type TPlacement = "top" | "bottom" | "left" | "right";

export default function Tooltip({
	content,
	children,
	placement = "top",
	visible: controlledVisible,
}: ITooltip) {
	const [hoverVisible, setHoverVisible] = useState<boolean>(false);
	const shouldShow = controlledVisible === false ? false : hoverVisible;

	const tooltipClass =
		"absolute z-50 px-3 py-1 rounded bg-gray-900 text-white text-xs whitespace-nowrap shadow-lg pointer-events-none";
	let positionClass = "";

	switch (placement) {
		case "top":
			positionClass = "left-1/2 -translate-x-1/2 bottom-full mb-2";
			break;
		case "bottom":
			positionClass = "left-1/2 -translate-x-1/2 top-full mt-2";
			break;
		case "left":
			positionClass = "right-full mr-2 top-1/2 -translate-y-1/2";
			break;
		case "right":
			positionClass = "left-full ml-2 top-1/2 -translate-y-1/2";
			break;
	}

	const variants = {
		hidden: {
			opacity: 0,
			y: placement === "top" ? 8 : placement === "bottom" ? -8 : 0,
		},
		visible: { opacity: 1, y: 0 },
		exit: {
			opacity: 0,
			y: placement === "top" ? 8 : placement === "bottom" ? -8 : 0,
		},
	};

	return (
		<span
			className="relative inline-block"
			onMouseEnter={() => setHoverVisible(true)}
			onMouseLeave={() => setHoverVisible(false)}
			onFocus={() => setHoverVisible(true)}
			onBlur={() => setHoverVisible(false)}
		>
			{children}
			<AnimatePresence>
				{shouldShow && (
					<motion.span
						className={`${tooltipClass} ${positionClass}`}
						initial="hidden"
						animate="visible"
						exit="exit"
						variants={variants}
						transition={{ duration: 0.18 }}
					>
						{content}
					</motion.span>
				)}
			</AnimatePresence>
		</span>
	);
}
