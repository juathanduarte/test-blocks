import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiLinkedin, FiMail, FiMessageCircle } from "react-icons/fi";
import blocksLogo from "../../assets/blocks_logo.svg";

interface IHeader {
	title: string;
	description?: string;
}

const Header = ({ title, description }: IHeader) => {
	const [visible, setVisible] = useState<boolean>(true);

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const handleScroll = () => {
		const currentScrollY = window.scrollY;
		if (currentScrollY <= 0) {
			setVisible(true);
		} else {
			setVisible(false);
		}
	};

	return (
		<div
			className={`bg-[#FFF] border-b border-purple-200 transition-transform duration-300 fixed top-0 left-0 w-full z-40 ${
				visible ? "translate-y-0" : "-translate-y-full"
			}`}
		>
			<div className="flex flex-row items-center justify-between w-full px-4 sm:px-8 md:px-12 py-3 gap-4 sm:gap-8">
				<div className="flex-shrink-0 flex items-center">
					<a
						href="https://www.blocksrvt.com/pt/home"
						target="_blank"
						rel="noopener noreferrer"
					>
						<motion.img
							src={blocksLogo}
							alt="Blocks Logo"
							className="h-9 cursor-pointer"
							whileHover={{ scale: 1.1 }}
						/>
					</a>
				</div>
				<div className="flex flex-col items-center flex-1 min-w-0">
					<h1 className="text-xl sm:text-2xl font-bold text-purple-900 truncate w-full text-center">
						{title}
					</h1>
					{description && (
						<span className="text-purple-700 text-xs sm:text-sm truncate w-full text-center">
							{description}
						</span>
					)}
				</div>
				<div className="flex items-center gap-3 min-w-fit ml-2">
					<motion.a
						href="https://wa.me/5553999515492"
						target="_blank"
						rel="noopener noreferrer"
						title="WhatsApp"
						className="text-purple-600 hover:text-purple-800 transition-colors"
						whileHover={{ scale: 1.15 }}
						whileTap={{ scale: 0.95 }}
					>
						<FiMessageCircle size={22} />
					</motion.a>
					<motion.a
						href="https://www.linkedin.com/in/juathanduarte/"
						target="_blank"
						rel="noopener noreferrer"
						title="LinkedIn"
						className="text-purple-600 hover:text-purple-800 transition-colors"
						whileHover={{ scale: 1.15 }}
						whileTap={{ scale: 0.95 }}
					>
						<FiLinkedin size={22} />
					</motion.a>
					<motion.a
						href="mailto:juathanduarte13@gmail.com"
						title="E-mail"
						className="text-purple-600 hover:text-purple-800 transition-colors"
						target="_blank"
						rel="noopener noreferrer"
						whileHover={{ scale: 1.15 }}
						whileTap={{ scale: 0.95 }}
					>
						<FiMail size={22} />
					</motion.a>
				</div>
			</div>
		</div>
	);
};

export default Header;
