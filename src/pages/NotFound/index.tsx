import { motion } from "framer-motion";
import { FiAlertTriangle } from "react-icons/fi";
import { Link } from "react-router-dom";

const NotFound = () => {
	return (
		<motion.div
			className="min-h-screen flex flex-col items-center justify-center bg-[#fbfbfb] p-4"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.6 }}
		>
			<motion.div
				className="mb-4"
				initial={{ y: -30 }}
				animate={{ y: 0 }}
				transition={{ type: "spring", stiffness: 300, damping: 10 }}
			>
				<motion.div
					animate={{ scale: [1, 1.2, 1] }}
					transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.2 }}
				>
					<FiAlertTriangle size={64} className="text-purple-600" />
				</motion.div>
			</motion.div>
			<motion.p
				className="text-2xl font-semibold text-gray-800 mb-6"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.3, duration: 0.5 }}
			>
				Página não encontrada
			</motion.p>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.5, duration: 0.5 }}
			>
				<Link
					to="/"
					className="px-6 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition-all font-medium hover:scale-105 focus:scale-105"
				>
					Voltar para o início
				</Link>
			</motion.div>
		</motion.div>
	);
};

export default NotFound;
