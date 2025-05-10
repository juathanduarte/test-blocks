import { motion } from "framer-motion";
import Spinner from "../Spinner";

interface ILoading {
	message?: string;
	size?: "small" | "medium" | "large";
}

const Loading = ({ message, size = "medium" }: ILoading) => {
	const spinnerSize = size === "small" ? 16 : size === "large" ? 32 : 20;

	return (
		<motion.div
			initial={{ scale: 0 }}
			animate={{ scale: 1 }}
			className={`flex flex-row gap-2 py-2 px-4 bg-purple-100 text-purple-800 rounded-lg items-center shadow-sm ${
				size === "small" ? "text-sm" : size === "large" ? "text-lg" : ""
			}`}
		>
			<Spinner height={spinnerSize} width={spinnerSize} color="#7c3aed" />
			{message && <span className="font-medium">{message}</span>}
		</motion.div>
	);
};

export default Loading;
