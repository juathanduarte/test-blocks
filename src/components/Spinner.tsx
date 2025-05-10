import { motion } from "framer-motion";

interface ISpinner {
	message?: string;
	size?: "small" | "medium" | "large";
}

const Spinner = ({ message = "Atualizando...", size = "medium" }: ISpinner) => {
	return (
		<motion.div
			initial={{ scale: 0 }}
			animate={{ scale: 1 }}
			className={`py-2 px-4 bg-purple-100 text-purple-800 rounded-lg flex items-center shadow-sm ${
				size === "small" ? "text-sm" : size === "large" ? "text-lg" : ""
			}`}
		>
			<div className="animate-spin h-5 w-5 mr-3">
				<svg
					className="w-full h-full"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					aria-hidden="true"
				>
					<circle
						className="opacity-25"
						cx="12"
						cy="12"
						r="10"
						stroke="currentColor"
						strokeWidth="4"
					/>
					<path
						className="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					/>
				</svg>
			</div>
			{message && <span className="font-medium">{message}</span>}
		</motion.div>
	);
};

export default Spinner;
