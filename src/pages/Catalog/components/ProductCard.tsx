import type { IProduct } from "@models/Product";
import { motion } from "framer-motion";
import type { FC } from "react";
import { FiAward, FiZoomIn } from "react-icons/fi";
import { useLocale } from "../../../contexts/LocaleContext";
import { useTranslation } from "../../../hooks/useTranslation";

interface IProductCard {
	product?: IProduct;
	onClick?: (product: IProduct) => void;
	loading?: boolean;
	page?: number;
	onImageClick?: (product: IProduct) => void;
	imagePreviewIconOverlay?: boolean;
}

const Skeleton: FC = () => {
	return (
		<>
			<div className="flex items-center justify-between gap-2">
				<div className="h-5 w-2/3 bg-gray-200 rounded animate-pulse" />
				<div className="h-4 w-12 bg-gray-200 rounded-full animate-pulse" />
			</div>
			<div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
			<div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
			<div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
			<div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
			<div className="flex gap-1">
				<div className="h-4 w-12 bg-gray-200 rounded-full animate-pulse" />
				<div className="h-4 w-10 bg-gray-200 rounded-full animate-pulse" />
				<div className="h-4 w-8 bg-gray-200 rounded-full animate-pulse" />
			</div>
			<div className="h-3 w-1/2 bg-gray-200 rounded animate-pulse" />
		</>
	);
};

const ProductCard: FC<IProductCard> = ({
	product,
	onClick,
	loading = false,
	page = 1,
	onImageClick,
	imagePreviewIconOverlay = false,
}) => {
	const { locale } = useLocale();
	const { t } = useTranslation(locale);

	const getFamilyImageUrl = (familyId: string) => {
		const url = `https://plugin-storage.nyc3.digitaloceanspaces.com/families/images/${familyId}.webp`;

		return url;
	};

	const handleClick = () => {
		if (onClick && product) {
			onClick(product);
		}
	};

	const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		if (product && onImageClick) onImageClick(product);
	};

	const handleImageKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if ((e.key === "Enter" || e.key === " ") && product && onImageClick) {
			e.stopPropagation();
			onImageClick(product);
		}
	};

	return (
		<motion.button
			className="w-full text-left bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-200 group"
			onClick={handleClick}
			aria-label={loading ? t("loading") : t("seeDetails")}
			type="button"
			initial={loading || page <= 1 ? false : { opacity: 0, y: 30 }}
			animate={loading || page <= 1 ? false : { opacity: 1, y: 0 }}
			whileHover={{ scale: 1.025, boxShadow: "0 8px 32px 0 rgba(0,0,0,0.10)" }}
			whileTap={{ scale: 0.98 }}
			transition={{ type: "spring", stiffness: 180, damping: 18 }}
			disabled={loading}
		>
			<div className="relative group">
				{loading ? (
					<div className="w-full h-52 bg-gray-200 animate-pulse rounded-t-xl" />
				) : (
					<>
						{product?.isPremium && (
							<span className="absolute top-2 right-2 flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-xs px-2 py-1 rounded-full font-medium shadow-sm z-10 select-none">
								<span>{t("premium")}</span>
								<FiAward className="text-yellow-200 drop-shadow" size={16} />
							</span>
						)}
						<div
							className="relative w-full h-52"
							aria-label="Abrir imagem em tela cheia"
							onClick={handleImageClick}
							onKeyDown={handleImageKeyDown}
						>
							<img
								src={getFamilyImageUrl(product?.id || "")}
								alt={product?.details.name || ""}
								className="w-full h-52 object-cover bg-gray-100 group-hover:brightness-95 transition-all duration-300 rounded-t-xl cursor-zoom-in"
								draggable={false}
							/>
							{imagePreviewIconOverlay && (
								<span className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-xl pointer-events-none">
									<FiZoomIn size={40} className="text-white opacity-90" />
								</span>
							)}
						</div>
					</>
				)}
			</div>

			<div className="p-4 flex flex-col gap-2">
				{loading ? (
					<Skeleton />
				) : (
					<>
						<div className="flex items-center justify-between gap-2">
							<h3 className="text-lg font-bold text-[#202020] line-clamp-1">
								{product?.details.name}
							</h3>
							{product?.isNew && (
								<span className="bg-gradient-to-r from-green-400 to-green-600 text-white text-xs px-2 py-1 rounded-full font-medium shadow-sm">
									{t("new")}
								</span>
							)}
						</div>

						{product?.details.description && (
							<p className="text-gray-500 text-sm italic line-clamp-2 h-10">
								{product?.details.description}
							</p>
						)}

						<div className="flex items-center gap-2 text-xs text-gray-500">
							<span className="font-medium">{t("brand")}:</span>
							<span className="bg-gray-100 px-2 py-1 rounded-full">
								{product?.brand.name}
							</span>
						</div>

						{product?.collection && (
							<div className="flex items-center gap-2 text-xs text-gray-500">
								<span className="font-medium">{t("collection")}:</span>
								<span className="bg-gray-100 px-2 py-1 rounded-full">
									{product?.collection.details.name}
								</span>
							</div>
						)}

						{product?.finishes && product?.finishes.length > 0 && (
							<div className="flex flex-col gap-1 mb-1">
								<p className="text-xs text-gray-500 font-medium">
									{t("finishes")}:
								</p>
								<div className="flex flex-wrap gap-1">
									{product?.finishes.map((finish) => (
										<span
											key={finish.id}
											className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full hover:bg-gray-200 transition-colors"
										>
											{finish.detail.name}
										</span>
									))}
								</div>
							</div>
						)}

						<p className="text-xs text-gray-400 pt-2 border-t border-gray-100">
							{t("updatedAt")}:{" "}
							{new Date(
								product?.updatedAt || product?.createdAt || "",
							).toLocaleDateString(locale)}
						</p>
					</>
				)}
			</div>
		</motion.button>
	);
};

export default ProductCard;
