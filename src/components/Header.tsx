import Select from "@/components/Select";
import blocksLogo from "@assets/blocks_logo.svg";

interface IHeader {
	title: string;
	description?: string;
	onLanguageChange?: (locale: string) => void;
}

interface LanguageOption {
	value: string;
	label: string;
}

const languages: LanguageOption[] = [
	{ value: "pt-br", label: "Português" },
	{ value: "en-us", label: "English" },
	{ value: "es-es", label: "Español" },
];

const Header = ({ title, description, onLanguageChange }: IHeader) => {
	return (
		<div className="bg-[#FFF] border-b border-gray-200">
			<div className="flex justify-between px-12 py-4 w-full items-center">
				<div className="flex-shrink-0">
					<img src={blocksLogo} alt="Blocks Logo" className="h-9" />
				</div>
				<div className="flex flex-col items-center">
					<h1 className="text-2xl font-bold text-[#202020]">{title}</h1>
					<span className="text-gray-500 text-sm">{description}</span>
				</div>
				<Select
					items={languages}
					onChange={(value) => {
						console.log("Selected language:", value);
						if (onLanguageChange) {
							onLanguageChange(value);
						}
					}}
				/>
			</div>
		</div>
	);
};

export default Header;
