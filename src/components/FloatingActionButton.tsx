import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FiChevronUp, FiGlobe, FiPlus, FiRefreshCw, FiX } from "react-icons/fi";

interface LanguageOption {
	value: string;
	label: string;
}

interface FloatingActionButtonProps {
	currentLocale: string;
	onLanguageChange: (locale: string) => void;
	onScrollTop: () => void;
	onResetPagination: () => void;
}

const languages: LanguageOption[] = [
	{ value: "pt-br", label: "Português" },
	{ value: "en-us", label: "English" },
	{ value: "es-es", label: "Español" },
];

export default function FloatingActionButton({
	currentLocale,
	onLanguageChange,
	onScrollTop,
	onResetPagination,
}: FloatingActionButtonProps) {
	const [open, setOpen] = useState(false);
	const [showLangs, setShowLangs] = useState(false);

	return (
		<div className="fixed z-50 bottom-8 right-8 flex flex-col items-end gap-3">
			<AnimatePresence>
				{open && !showLangs && (
					<motion.button
						key="scroll-top"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 20 }}
						transition={{ type: "spring", stiffness: 300, damping: 20 }}
						className="mb-2 w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center text-purple-700 hover:bg-purple-50 border border-purple-200"
						onClick={() => {
							setOpen(false);
							onScrollTop();
						}}
						aria-label="Ir para o topo"
					>
						<FiChevronUp size={28} />
					</motion.button>
				)}
				{open && !showLangs && (
					<motion.button
						key="reset-pagination"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 20 }}
						transition={{
							type: "spring",
							stiffness: 300,
							damping: 20,
							delay: 0.05,
						}}
						className="mb-2 w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center text-purple-700 hover:bg-purple-50 border border-purple-200"
						onClick={() => {
							setOpen(false);
							onResetPagination();
						}}
						aria-label="Resetar paginação"
					>
						<FiRefreshCw size={26} />
					</motion.button>
				)}
				{open && !showLangs && (
					<motion.button
						key="lang"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 20 }}
						transition={{
							type: "spring",
							stiffness: 300,
							damping: 20,
							delay: 0.1,
						}}
						className="mb-2 w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center text-purple-700 hover:bg-purple-50 border border-purple-200"
						onClick={() => setShowLangs(true)}
						aria-label="Trocar idioma"
					>
						<FiGlobe size={26} />
					</motion.button>
				)}
				{open && showLangs && (
					<motion.div
						key="langs"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 20 }}
						transition={{ type: "spring", stiffness: 300, damping: 20 }}
						className="mb-2 flex flex-col gap-2 bg-white p-3 rounded-xl shadow-lg border border-purple-200"
					>
						{languages.map((lang) => (
							<button
								key={lang.value}
								type="button"
								className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors w-full text-left ${
									currentLocale === lang.value
										? "bg-purple-100 text-purple-800"
										: "text-gray-700 hover:bg-purple-50"
								}`}
								onClick={() => {
									setShowLangs(false);
									setOpen(false);
									onLanguageChange(lang.value);
								}}
							>
								<FiGlobe className="text-purple-600" />
								{lang.label}
							</button>
						))}
						<button
							type="button"
							className="mt-2 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 font-medium"
							onClick={() => setShowLangs(false)}
						>
							<FiX /> Fechar
						</button>
					</motion.div>
				)}
			</AnimatePresence>
			<motion.button
				className="w-16 h-16 rounded-full bg-purple-700 shadow-xl flex items-center justify-center text-white hover:bg-purple-800 border-4 border-white focus:outline-none focus:ring-2 focus:ring-purple-400"
				whileTap={{ scale: 0.92 }}
				animate={{ rotate: open ? 45 : 0 }}
				transition={{ type: "spring", stiffness: 300, damping: 20 }}
				onClick={() => {
					if (open && showLangs) setShowLangs(false);
					setOpen((v) => !v);
				}}
				aria-label={open ? "Fechar opções" : "Abrir opções"}
			>
				<FiPlus
					size={32}
					className={
						open ? "rotate-45 transition-transform" : "transition-transform"
					}
				/>
			</motion.button>
		</div>
	);
}
