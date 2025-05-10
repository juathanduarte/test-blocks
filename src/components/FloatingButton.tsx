import { AnimatePresence, motion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";
import { useState } from "react";
import { FiX } from "react-icons/fi";
import Tooltip from "./Tooltip";
import { HiDotsHorizontal } from "react-icons/hi";

export interface IFloatingButton {
	options: IOptionsFloatingButton[];
	position?: Partial<IPositionFloatingButton>;
	mainIcon?: ReactNode;
	mainAriaLabel?: string;
}

export interface IOptionsFloatingButton {
	icon: ReactNode;
	onClick?: () => void;
	label: string;
	title: string;
	key: string;
	buttonClassName?: string;
	submenu?: ReactNode;
}

interface IPositionFloatingButton {
	bottom: number;
	top: number;
	left: number;
	right: number;
}

export default function FloatingButton({
	options,
	position = { bottom: 32, right: 32 },
	mainIcon,
	mainAriaLabel = "Abrir opções",
}: IFloatingButton) {
	const [open, setOpen] = useState<boolean>(false);
	const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

	const style: CSSProperties = {
		position: "fixed",
		zIndex: 50,
		display: "flex",
		flexDirection: "column",
		alignItems: "end",
		gap: "0.75rem",
		...Object.fromEntries(
			Object.entries(position).map(([k, v]) => [
				k,
				typeof v === "number" ? `${v}px` : v,
			]),
		),
	};

	const getTooltipPlacement = (
		position: IFloatingButton["position"],
	): "top" | "bottom" | "left" | "right" => {
		if (position?.bottom !== undefined && position?.right !== undefined)
			return "left";
		if (position?.bottom !== undefined && position?.left !== undefined)
			return "right";
		if (position?.top !== undefined) return "bottom";
		return "top";
	};

	const handleOptionClick = (option: IOptionsFloatingButton) => {
		if (option.submenu) {
			if (openSubmenu === option.key) {
				setOpenSubmenu(null);
			} else {
				setOpenSubmenu(option.key);
			}
		} else {
			setOpen(false);
			option.onClick?.();
		}
	};

	return (
		<div style={style}>
			<AnimatePresence>
				{open &&
					options.map((option, idx) => {
						const tooltipVisible = openSubmenu !== option.key;
						return (
							<Tooltip
								key={option.key}
								content={option.title}
								placement={getTooltipPlacement(position)}
								visible={tooltipVisible}
							>
								<motion.button
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: 20 }}
									transition={{
										type: "spring",
										stiffness: 300,
										damping: 20,
										delay: idx * 0.05,
									}}
									className={`w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center text-purple-700 hover:bg-purple-50 border border-purple-200 focus:outline-none ${option.buttonClassName || ""}`}
									onClick={() => handleOptionClick(option)}
									aria-label={option.label}
									type="button"
								>
									{option.icon}
								</motion.button>
								{openSubmenu === option.key && option.submenu && (
									<div className="absolute right-full mr-4 bottom-0 z-50">
										<div className="relative">
											<button
												className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-800 focus:outline-none"
												onClick={() => setOpenSubmenu(null)}
												type="button"
												aria-label="Fechar submenu"
											>
												<FiX size={20} />
											</button>
											{option.submenu}
										</div>
									</div>
								)}
							</Tooltip>
						);
					})}
			</AnimatePresence>
			<motion.button
				className="w-16 h-16 rounded-full bg-purple-700 shadow-xl flex items-center justify-center text-white hover:bg-purple-800 border-4 border-white focus:outline-none focus:ring-2 focus:ring-purple-400"
				whileTap={{ scale: 0.92 }}
				animate={{ rotate: open ? 45 : 0 }}
				transition={{ type: "spring", stiffness: 300, damping: 20 }}
				onClick={() => setOpen((v) => !v)}
				aria-label={mainAriaLabel}
				type="button"
			>
				{mainIcon || (
					<HiDotsHorizontal
						size={32}
						className={
							open ? "rotate-45 transition-transform" : "transition-transform"
						}
					/>
				)}
			</motion.button>
		</div>
	);
}
