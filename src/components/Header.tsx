import blocksLogo from "@assets/blocks_logo.svg";
import { useEffect, useState } from "react";

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
			className={`bg-[#FFF] border-b border-gray-200 transition-transform duration-300 fixed top-0 left-0 w-full z-40 ${
				visible ? "translate-y-0" : "-translate-y-full"
			}`}
		>
			<div className="flex justify-between px-12 py-4 w-full items-center">
				<div className="flex-shrink-0">
					<img src={blocksLogo} alt="Blocks Logo" className="h-9" />
				</div>
				<div className="flex flex-col items-center">
					<h1 className="text-2xl font-bold text-[#202020]">{title}</h1>
					<span className="text-gray-500 text-sm">{description}</span>
				</div>
			</div>
		</div>
	);
};

export default Header;
