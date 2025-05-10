import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";

interface IModal {
	open: boolean;
	onClose: () => void;
	children: ReactNode;
}

export default function Modal({ open, onClose, children }: IModal) {
	return (
		<AnimatePresence>
			{open && (
				<motion.div
					className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.18 }}
					onClick={onClose}
				>
					<motion.div
						className="relative bg-white rounded-2xl shadow-2xl border border-purple-200 max-w-lg w-full mx-4 p-8"
						initial={{ scale: 0.92, y: 40, opacity: 0 }}
						animate={{ scale: 1, y: 0, opacity: 1 }}
						exit={{ scale: 0.92, y: 40, opacity: 0 }}
						transition={{ type: "spring", stiffness: 260, damping: 22 }}
						onClick={(e) => e.stopPropagation()}
					>
						<button
							className="absolute top-4 right-4 text-gray-400 hover:text-purple-700 transition-colors text-xl font-bold focus:outline-none"
							onClick={onClose}
							aria-label="Fechar modal"
							type="button"
						>
							×
						</button>
						{children}
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
