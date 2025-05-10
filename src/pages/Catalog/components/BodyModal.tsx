import type { IProduct } from "@/models/Product";
import type { IImageToPreview } from "@/pages/Catalog";
import type { FC } from "react";
import { useLocale } from "../../../contexts/LocaleContext";
import { useTranslation } from "../../../hooks/useTranslation";

interface IBodyModal {
	selectedProduct: IProduct;
	setImageToPreview: (image: IImageToPreview) => void;
	setImageViewerOpen: (open: boolean) => void;
}

const BodyModal: FC<IBodyModal> = ({
	selectedProduct,
	setImageToPreview,
	setImageViewerOpen,
}) => {
	const { locale } = useLocale();
	const { t } = useTranslation(locale);
	return (
		<div className="flex flex-col gap-6 w-full max-w-2xl min-w-[340px]">
			<div className="flex flex-col items-center gap-3">
				<img
					src={`https://plugin-storage.nyc3.digitaloceanspaces.com/families/images/${selectedProduct.id}.webp`}
					alt={selectedProduct.details.name}
					className="w-48 h-48 object-cover rounded-2xl border border-gray-100 shadow-lg bg-gray-50 cursor-zoom-in"
					onClick={() => {
						setImageToPreview({
							url: `https://plugin-storage.nyc3.digitaloceanspaces.com/families/images/${selectedProduct.id}.webp`,
							alt: selectedProduct.details.name,
						});
						setImageViewerOpen(true);
					}}
					onKeyDown={(e) => {
						if (e.key === "Enter" || e.key === " ") {
							setImageToPreview({
								url: `https://plugin-storage.nyc3.digitaloceanspaces.com/families/images/${selectedProduct.id}.webp`,
								alt: selectedProduct.details.name,
							});
							setImageViewerOpen(true);
						}
					}}
					title="Clique para ampliar"
					aria-label="Abrir imagem em tela cheia"
				/>
				<h2 className="text-3xl font-extrabold text-[#202020] text-center tracking-tight">
					{selectedProduct.details.name}
				</h2>
				<div className="flex gap-2 items-center justify-center">
					{selectedProduct.isPremium && (
						<span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-sm uppercase tracking-wide">
							{t("premium")}
						</span>
					)}
					{selectedProduct.isNew && (
						<span className="bg-gradient-to-r from-green-400 to-green-600 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-sm uppercase tracking-wide">
							{t("new")}
						</span>
					)}
					{!selectedProduct.isActive && (
						<span className="bg-gray-300 text-gray-700 text-xs px-3 py-1 rounded-full font-semibold shadow-sm uppercase tracking-wide">
							{t("inactive")}
						</span>
					)}
				</div>
				{selectedProduct.details.description && (
					<p className="text-gray-500 text-base italic text-center max-w-xl mt-2">
						{selectedProduct.details.description}
					</p>
				)}
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div className="flex flex-col gap-2 text-sm text-gray-700">
					<div>
						<span className="font-semibold">{t("brand")}:</span>{" "}
						{selectedProduct.brand.name}
					</div>
					{selectedProduct.collection && (
						<div>
							<span className="font-semibold">{t("collection")}:</span>{" "}
							{selectedProduct.collection.details.name}
						</div>
					)}
					<div>
						<span className="font-semibold">{t("revitVersion")}:</span>{" "}
						{selectedProduct.revitVersion}
					</div>
					<div>
						<span className="font-semibold">{t("status")}:</span>{" "}
						{selectedProduct.isActive ? t("active") : t("inactive")}
					</div>
					{selectedProduct.stickers &&
						Array.isArray(selectedProduct.stickers) &&
						selectedProduct.stickers.length > 0 && (
							<div>
								<span className="font-semibold">{t("stickers")}:</span>
								<div className="flex flex-wrap gap-1 mt-1">
									{(
										selectedProduct.stickers as (
											| string
											| { id: string | number }
										)[]
									).map((sticker, idx) => (
										<span
											key={
												typeof sticker === "object" &&
												sticker !== null &&
												"id" in sticker
													? sticker.id
													: idx
											}
											className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full"
										>
											{typeof sticker === "string"
												? sticker
												: JSON.stringify(sticker)}
										</span>
									))}
								</div>
							</div>
						)}
				</div>
				<div className="flex flex-col gap-2 text-sm text-gray-700">
					{selectedProduct.finishes && selectedProduct.finishes.length > 0 && (
						<div>
							<span className="font-semibold">{t("finishes")}:</span>
							<div className="flex flex-wrap gap-1 mt-1">
								{selectedProduct.finishes.map((finish) => (
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
					{selectedProduct.styles && selectedProduct.styles.length > 0 && (
						<div>
							<span className="font-semibold">{t("styles")}:</span>
							<div className="flex flex-wrap gap-1 mt-1">
								{selectedProduct.styles.map((style) => (
									<span
										key={style.id}
										className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded-full border border-purple-200"
									>
										{style.detail.name}
									</span>
								))}
							</div>
						</div>
					)}
				</div>
			</div>
			<div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-2 mt-4 border-t pt-4 border-gray-100 text-xs text-gray-400">
				<span>
					{t("createdAt")}:{" "}
					{new Date(selectedProduct.createdAt).toLocaleDateString(locale)}
				</span>
				<span>
					{t("updatedAt")}:{" "}
					{new Date(
						selectedProduct.updatedAt || selectedProduct.createdAt || "",
					).toLocaleDateString(locale)}
				</span>
			</div>
		</div>
	);
};

export default BodyModal;
