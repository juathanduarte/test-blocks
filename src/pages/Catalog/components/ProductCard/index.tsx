import type { IProduct } from "@models/Product";
import { motion } from "framer-motion";
import type { FC } from "react";
import { FiAward, FiGrid, FiLayers, FiTag, FiZoomIn } from "react-icons/fi";
import { useLocale } from "../../../../contexts/LocaleContext";
import { useTranslation } from "../../../../hooks/useTranslation";

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
			className="w-full text-left bg-white rounded-2xl overflow-hidden border border-purple-200 hover:border-purple-400 focus:border-purple-500 transition-all duration-300 focus:outline-none group shadow-none hover:shadow-[0_2px_16px_0_rgba(168,85,247,0.10)] flex flex-col justify-between h-full"
			aria-label={loading ? t("loading") : t("seeDetails")}
			type="button"
			initial={loading || page <= 1 ? false : { opacity: 0, y: 30 }}
			animate={loading || page <= 1 ? false : { opacity: 1, y: 0 }}
			whileHover={{ scale: 1.025 }}
			whileTap={{ scale: 0.98 }}
			transition={{ type: "spring", stiffness: 180, damping: 18 }}
			disabled={loading}
		>
			<div className="relative group">
				{loading ? (
					<div className="w-full h-52 bg-gray-200 animate-pulse rounded-t-2xl" />
				) : (
					<>
						{product?.isPremium && (
							<span className="absolute top-2 right-2 flex items-center gap-1 bg-gradient-to-r from-purple-400 to-purple-600 text-white text-xs px-2 py-1 rounded-full font-semibold shadow-sm z-10 select-none border-2 border-purple-300">
								<span>{t("premium")}</span>
								<FiAward className="text-purple-200 drop-shadow" size={16} />
							</span>
						)}
						<div
							className="relative w-full h-32 sm:h-52 min-h-[128px] sm:min-h-[208px] max-h-52 bg-gray-100 rounded-t-2xl overflow-hidden border-b-2 border-purple-100"
							aria-label="Abrir imagem em tela cheia"
							onClick={handleImageClick}
							onKeyDown={handleImageKeyDown}
						>
							<img
								src={getFamilyImageUrl(product?.id || "")}
								alt={product?.details.name || ""}
								className="w-full h-full object-contain object-top cursor-zoom-in select-none"
								draggable={false}
							/>
							{imagePreviewIconOverlay && (
								<span className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-2xl pointer-events-none">
									<FiZoomIn size={40} className="text-white opacity-90" />
								</span>
							)}
							{!loading && (
								<span className="absolute right-2 bottom-2 text-[11px] bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full border border-purple-100 font-medium shadow-sm">
									{t("updatedAt")}:{" "}
									{new Date(
										product?.updatedAt || product?.createdAt || "",
									).toLocaleDateString(locale as string)}
								</span>
							)}
						</div>
					</>
				)}
			</div>

			<div className="p-5 flex flex-col gap-3">
				{loading ? (
					<Skeleton />
				) : (
					<>
						<div className="flex items-center justify-between gap-2">
							<h3 className="text-2xl font-extrabold text-purple-900 tracking-tight leading-tight relative after:content-[''] after:block after:w-8 after:h-1 after:bg-purple-400 after:rounded-full after:mt-1">
								{product?.details.name}
							</h3>
							{product?.isNew && (
								<span className="bg-gradient-to-r from-purple-400 to-purple-600 text-white text-xs px-2 py-1 rounded-full font-semibold shadow-sm border border-purple-300">
									{t("new")}
								</span>
							)}
						</div>
						{product?.details.description && (
							<p className="text-gray-500 text-sm italic line-clamp-2">
								{product?.details.description}
							</p>
						)}

						<div className="flex flex-col gap-0.5 w-full text-xs">
							<span className="flex items-center gap-1 text-purple-700 font-medium">
								<FiTag className="w-3 h-3 text-purple-400" title="Marca" />
								<strong className="font-semibold text-purple-700">
									{t("brand")}:
								</strong>
								<span className="font-normal text-purple-900 truncate">
									{product?.brand.name}
								</span>
							</span>
							{product?.collection && (
								<span className="flex items-center gap-1 text-purple-700 font-medium">
									<FiLayers
										className="w-3 h-3 text-purple-400"
										title="Coleção"
									/>
									<strong className="font-semibold text-purple-700">
										{t("collection")}:
									</strong>
									<span className="font-normal text-purple-900 truncate">
										{product?.collection.details.name}
									</span>
								</span>
							)}
						</div>

						{product?.finishes && product?.finishes.length > 0 && (
							<div className="flex flex-col gap-1 flex-1 justify-end">
								<p className="text-xs text-purple-700 font-semibold flex items-center gap-1">
									<FiGrid
										className="w-3 h-3 text-purple-400"
										title="Acabamento"
									/>
									{t("finishes")}:
								</p>
								<div className="flex flex-wrap items-center justify-between w-full gap-1">
									<div className="flex flex-wrap gap-1">
										{product?.finishes.map((finish) => (
											<span
												key={finish.id}
												className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded-full border border-purple-200 hover:bg-purple-100 transition-colors font-medium"
											>
												{finish.detail.name}
											</span>
										))}
									</div>
								</div>
							</div>
						)}
					</>
				)}
			</div>
		</motion.button>
	);
};

export default ProductCard;
