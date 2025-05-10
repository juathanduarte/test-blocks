import { motion } from "framer-motion";
import { Link } from "react-router-dom";

<motion.div
	initial={{ opacity: 0, y: 20 }}
	animate={{ opacity: 1, y: 0 }}
	transition={{ delay: 0.5, duration: 0.5 }}
>
	<Link
		to="/"
		className="px-6 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition-all font-medium hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
	>
		Voltar para o início
	</Link>
</motion.div>;
