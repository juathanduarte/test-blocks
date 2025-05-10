import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FiChevronDown, FiGlobe } from "react-icons/fi";

interface ISelect {
	onChange?: (value: string) => void;
	items: IItems[];
}

interface IItems {
	value: string;
	label: string;
}

const Select = ({ onChange, items }: ISelect) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState(items[0]);
	const selectRef = useRef<HTMLDivElement>(null);

	// Fechar dropdown ao clicar fora
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				selectRef.current &&
				!selectRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const handleSelect = (item: IItems) => {
		setSelectedItem(item);
		setIsOpen(false);
		if (onChange) {
			onChange(item.value);
		}
	};

	return (
		<div className="relative" ref={selectRef}>
			<motion.button
				className="flex items-center gap-2 py-2 px-4 rounded-md border border-purple-200 bg-white text-purple-800 min-w-[170px] shadow-sm hover:border-purple-300 focus:outline-none"
				whileHover={{ backgroundColor: "#f9f5ff" }}
				whileTap={{ scale: 0.98 }}
				onClick={() => setIsOpen(!isOpen)}
				aria-label="Selecionar idioma"
				aria-expanded={isOpen}
				aria-haspopup="listbox"
			>
				<FiGlobe className="text-purple-600" />
				<span className="flex-grow text-left font-medium">
					{selectedItem.label}
				</span>
				<motion.div
					animate={{ rotate: isOpen ? 180 : 0 }}
					transition={{ duration: 0.3 }}
				>
					<FiChevronDown className="text-purple-600" />
				</motion.div>
			</motion.button>

			<AnimatePresence>
				{isOpen && (
					<motion.ul
						initial={{ opacity: 0, y: -10, scale: 0.95 }}
						animate={{ opacity: 1, y: 5, scale: 1 }}
						exit={{ opacity: 0, y: -10, scale: 0.95 }}
						transition={{ duration: 0.2, ease: "easeOut" }}
						className="absolute z-10 w-full mt-1 py-1 bg-white border border-purple-200 rounded-md shadow-lg max-h-60 overflow-auto"
						style={{ transformOrigin: "top center" }}
					>
						{items.map((item) => (
							<motion.li
								key={item.value}
								onClick={() => handleSelect(item)}
								className={`px-4 py-2 cursor-pointer ${
									selectedItem.value === item.value
										? "bg-purple-100 text-purple-800"
										: "text-gray-700 hover:bg-purple-50"
								}`}
								whileHover={{ backgroundColor: "#f3e8ff" }}
								whileTap={{ scale: 0.98 }}
								aria-selected={selectedItem.value === item.value}
							>
								<div className="flex items-center justify-between">
									<span>{item.label}</span>
									{selectedItem.value === item.value && (
										<motion.div
											initial={{ scale: 0 }}
											animate={{ scale: 1 }}
											className="w-2 h-2 rounded-full bg-purple-600"
										/>
									)}
								</div>
							</motion.li>
						))}
					</motion.ul>
				)}
			</AnimatePresence>
		</div>
	);
};

export default Select;
