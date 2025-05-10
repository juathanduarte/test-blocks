import type { IProduct } from "@models/Product";
import { motion } from "framer-motion";
import type { FC } from "react";

interface IProductCard {
	product?: IProduct;
	onClick?: (product: IProduct) => void;
	loading?: boolean;
	page?: number;
}

const ProductCard: FC<IProductCard> = ({
	product,
	onClick,
	loading = false,
	page = 1,
}) => {
	const getFamilyImageUrl = (familyId: string) => {
		return `https://plugin-storage.nyc3.digitaloceanspaces.com/families/images/${familyId}.webp`;
	};

	const handleClick = () => {
		if (onClick && product) {
			onClick(product);
		}
	};

	return (
		<motion.button
			className="w-full text-left bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-200 group"
			onClick={handleClick}
			aria-label={
				loading ? "Carregando..." : `Ver detalhes de ${product?.details.name}`
			}
			type="button"
			initial={loading || page <= 1 ? false : { opacity: 0, y: 30 }}
			animate={loading || page <= 1 ? false : { opacity: 1, y: 0 }}
			whileHover={{ scale: 1.025, boxShadow: "0 8px 32px 0 rgba(0,0,0,0.10)" }}
			whileTap={{ scale: 0.98 }}
			transition={{ type: "spring", stiffness: 180, damping: 18 }}
			disabled={loading}
		>
			<div className="relative">
				{loading ? (
					<div className="w-full h-52 bg-gray-200 animate-pulse rounded-t-xl" />
				) : (
					<>
						{product?.isPremium && (
							<span className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-xs px-2 py-1 rounded-full font-medium shadow-sm z-10">
								Premium
							</span>
						)}
						<img
							src={getFamilyImageUrl(product?.id || "")}
							alt={product?.details.name || ""}
							className="w-full h-52 object-cover bg-gray-100 group-hover:brightness-95 transition-all duration-300"
						/>
					</>
				)}
			</div>

			<div className="p-4">
				{loading ? (
					<>
						<div className="flex items-center justify-between mb-2">
							<div className="h-5 w-2/3 bg-gray-200 rounded mb-1 animate-pulse" />
							<div className="h-4 w-12 bg-gray-200 rounded-full animate-pulse" />
						</div>
						<div className="h-4 w-full bg-gray-200 rounded mb-2 animate-pulse" />
						<div className="h-4 w-1/2 bg-gray-200 rounded mb-2 animate-pulse" />
						<div className="h-4 w-24 bg-gray-200 rounded mb-1 animate-pulse" />
						<div className="h-4 w-20 bg-gray-200 rounded mb-1 animate-pulse" />
						<div className="flex gap-1 mb-2">
							<div className="h-4 w-12 bg-gray-200 rounded-full animate-pulse" />
							<div className="h-4 w-10 bg-gray-200 rounded-full animate-pulse" />
							<div className="h-4 w-8 bg-gray-200 rounded-full animate-pulse" />
						</div>
						<div className="h-3 w-1/2 bg-gray-200 rounded mt-2 animate-pulse" />
					</>
				) : (
					<>
						<div className="flex items-center justify-between mb-2">
							<h3 className="text-lg font-bold text-[#202020] line-clamp-1">
								{product?.details.name}
							</h3>
							{product?.isNew && (
								<span className="bg-gradient-to-r from-green-400 to-green-600 text-white text-xs px-2 py-1 rounded-full font-medium shadow-sm">
									Novo
								</span>
							)}
						</div>

						{product?.details.description && (
							<p className="text-gray-500 mb-2 text-sm line-clamp-2 h-10 italic">
								{product?.details.description}
							</p>
						)}

						<div className="text-xs text-gray-500 mb-1 flex items-center">
							<span className="font-medium mr-1">Marca:</span>
							<span className="bg-gray-100 px-2 py-1 rounded-full">
								{product?.brand.name}
							</span>
						</div>

						{product?.collection && (
							<div className="text-xs text-gray-500 mb-1 flex items-center">
								<span className="font-medium mr-1">Coleção:</span>
								<span className="bg-gray-100 px-2 py-1 rounded-full">
									{product?.collection.details.name}
								</span>
							</div>
						)}

						{product?.finishes && product?.finishes.length > 0 && (
							<div className="mb-2">
								<p className="text-xs text-gray-500 mb-1 font-medium">
									Acabamentos:
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

						<p className="text-xs text-gray-400 mt-2 pt-2 border-t border-gray-100">
							Atualizado em:{" "}
							{new Date(
								product?.updatedAt || product?.createdAt || "",
							).toLocaleDateString("pt-BR")}
						</p>
					</>
				)}
			</div>
		</motion.button>
	);
};

export default ProductCard;
