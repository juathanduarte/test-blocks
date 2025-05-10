import { AnimatePresence, motion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";
import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import { HiDotsHorizontal } from "react-icons/hi";
import Tooltip from "../Tooltip";

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
	disabled?: boolean;
}

interface IPositionFloatingButton {
	bottom: number;
	top: number;
	left: number;
	right: number;
}

const entriesPolyfill = (obj: Record<string, unknown>) => {
	const ownProps = Object.keys(obj);
	let i = ownProps.length;
	const resArray: [string, unknown][] = new Array(i);
	while (i--) {
		resArray[i] = [ownProps[i], obj[ownProps[i]]];
	}
	return resArray;
};

const fromEntriesPolyfill = (entries: [string, unknown][]) => {
	const obj: Record<string, unknown> = {};
	for (const [k, v] of entries) obj[k] = v;
	return obj;
};

export default function FloatingButton({
	options,
	position = { bottom: 32, right: 32 },
	mainIcon,
	mainAriaLabel = "Abrir opções",
}: IFloatingButton) {
	const [open, setOpen] = useState<boolean>(false);
	const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
	const [showOptions, setShowOptions] = useState<boolean>(false);

	useEffect(() => {
		if (!open && openSubmenu) {
			const timer = setTimeout(() => {
				setOpenSubmenu(null);
			}, 200);
			return () => clearTimeout(timer);
		}

		setShowOptions(open);
	}, [open, openSubmenu]);

	const style: CSSProperties = {
		position: "fixed",
		zIndex: 50,
		display: "flex",
		flexDirection: "column",
		alignItems: "end",
		gap: "0.75rem",
		...fromEntriesPolyfill(
			entriesPolyfill(position).map(([k, v]) => [
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
				{showOptions &&
					options.map((option, idx) => {
						const tooltipVisible = openSubmenu !== option.key && !openSubmenu;
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
									className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center border focus:outline-none transition-colors
                                        ${
																					option.disabled
																						? "bg-gray-100 border-gray-200 text-gray-300 cursor-not-allowed opacity-60"
																						: "bg-white text-purple-700 hover:bg-purple-50 border-purple-200"
																				}
                                        ${option.buttonClassName || ""}`}
									onClick={() => handleOptionClick(option)}
									aria-label={option.label}
									type="button"
									disabled={option.disabled}
								>
									{option.icon}
								</motion.button>
								{option.submenu && (
									<AnimatePresence>
										{openSubmenu === option.key && (
											<motion.div
												initial={{ opacity: 0, y: 20 }}
												animate={{ opacity: 1, y: 0 }}
												exit={{ opacity: 0, y: 20 }}
												transition={{
													type: "spring",
													stiffness: 300,
													damping: 24,
												}}
												className="absolute right-full bottom-0 z-50 pt-2 pr-2 pb-2"
											>
												<div className="relative">
													<button
														className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-800 focus:outline-none bg-white rounded-full shadow"
														onClick={() => setOpenSubmenu(null)}
														type="button"
														aria-label="Fechar submenu"
													>
														<FiX size={20} />
													</button>
													{option.submenu}
												</div>
											</motion.div>
										)}
									</AnimatePresence>
								)}
							</Tooltip>
						);
					})}
			</AnimatePresence>

			{!showOptions && openSubmenu && (
				<AnimatePresence>
					{options
						.filter((option) => option.key === openSubmenu)
						.map((option) => (
							<motion.div
								key={`submenu-${option.key}`}
								initial={{ opacity: 1 }}
								exit={{ opacity: 0, y: 20 }}
								transition={{ type: "spring", stiffness: 300, damping: 24 }}
								className="absolute right-full bottom-[80px] z-50 pt-2 pr-2 pb-2"
							>
								<div className="relative">
									<button
										className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-800 focus:outline-none bg-white rounded-full shadow"
										onClick={() => setOpenSubmenu(null)}
										type="button"
										aria-label="Fechar submenu"
									>
										<FiX size={20} />
									</button>
									{option.submenu}
								</div>
							</motion.div>
						))}
				</AnimatePresence>
			)}

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
