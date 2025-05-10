import Button from "@/components/Button";
import FloatingButton, {
	type IOptionsFloatingButton,
} from "@/components/FloatingButton";
import Header from "@/components/Header";
import ImagePreview from "@/components/ImagePreview";
import InfiniteScroll from "@/components/InfiniteScroll";
import Modal from "@/components/Modal";
import { useLocale } from "@/contexts/LocaleContext";
import { useToast } from "@/contexts/ToastContext";
import { useTranslation } from "@/hooks/useTranslation";
import type { TLocale } from "@/models/Locale";
import type { IApiResponse, IProduct } from "@models/Product";
import { fetchProducts } from "@services/apiFamilies";
import { type FC, useCallback, useEffect, useRef, useState } from "react";
import { FiChevronUp, FiGlobe, FiList, FiRefreshCw } from "react-icons/fi";
import BodyModal from "./components/BodyModal";
import ProductCard from "./components/ProductCard";

export interface IImageToPreview {
	url: string;
	alt?: string;
}

const CatalogPage: FC = () => {
	const [products, setProducts] = useState<IProduct[]>([]);
	const [initialLoading, setInitialLoading] = useState<boolean>(true);
	const [loadingMore, setLoadingMore] = useState<boolean>(false);
	const [page, setPage] = useState<number>(1);
	const [totalItems, setTotalItems] = useState<number>(0);
	const [limit, setLimit] = useState<number>(8);
	const { locale, setLocale } = useLocale();
	const hasInitiallyLoaded = useRef<boolean>(false);
	const [scrollY, setScrollY] = useState<number>(0);
	const { t } = useTranslation(locale);
	const { showToast } = useToast();
	const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [imageViewerOpen, setImageViewerOpen] = useState<boolean>(false);
	const [imageToPreview, setImageToPreview] = useState<IImageToPreview | null>(
		null,
	);

	const loadProducts = useCallback(
		async (
			currentPage: number,
			isInitialLoad = false,
			currentLocale = locale,
		) => {
			try {
				if (isInitialLoad) {
					setInitialLoading(true);
				} else {
					setLoadingMore(true);
				}

				const params = {
					page: currentPage,
					limit,
					sortBy: "recent",
					locale: currentLocale,
				};

				await new Promise((r) => setTimeout(r, isInitialLoad ? 800 : 1200));

				const response: IApiResponse = await fetchProducts(params);

				if (isInitialLoad) {
					setProducts(response.families || []);
				} else {
					setProducts((prev) => [...prev, ...(response.families || [])]);
				}

				setTotalItems(response.total || 0);

				showToast(t("toastSuccessLoadProducts"), "success");
			} catch (error) {
				console.error("Erro ao carregar produtos", error);
				showToast(t("toastErrorLoadProducts"), "error");
			} finally {
				if (isInitialLoad) {
					setInitialLoading(false);
					hasInitiallyLoaded.current = true;
				} else {
					setLoadingMore(false);
				}
			}
		},
		[limit, locale, showToast, t],
	);

	useEffect(() => {
		setPage(1);
		setProducts([]);
		loadProducts(1, true, locale);
	}, [loadProducts, locale]);

	useEffect(() => {
		const handleScroll = () => setScrollY(window.scrollY);
		window.addEventListener("scroll", handleScroll);
		handleScroll();
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const handleLanguageChange = useCallback(
		(newLocale: TLocale) => {
			if (newLocale !== locale) {
				setLocale(newLocale);
			}
		},
		[locale, setLocale],
	);

	const handleChangeLimit = (newLimit: number) => {
		setLimit(newLimit);
		setPage(1);
		setProducts([]);
		loadProducts(1, true, locale);
	};

	const handleLoadMore = useCallback(() => {
		if (products.length < totalItems) {
			const nextPage = page + 1;
			setPage(nextPage);
			loadProducts(nextPage, false);
		}
	}, [page, products.length, totalItems, loadProducts]);

	const handleScrollTop = useCallback(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, []);

	const handleResetPagination = useCallback(() => {
		handleScrollTop();
		setPage(1);
		setProducts([]);
		loadProducts(1, true, locale);
	}, [handleScrollTop, loadProducts, locale]);

	const handleOpenModal = (product: IProduct) => {
		setSelectedProduct(product);
		setModalOpen(true);
	};

	const handleCloseModal = () => {
		setModalOpen(false);
		setTimeout(() => setSelectedProduct(null), 200);
	};

	const optionsFloatingButton: IOptionsFloatingButton[] = [
		{
			key: "reset",
			icon: <FiRefreshCw size={26} />,
			onClick: handleResetPagination,
			label: t("tooltipResetPagination"),
			title: t("tooltipResetPagination"),
			disabled: page === 1,
		},
		{
			key: "scrollTop",
			icon: <FiChevronUp size={28} />,
			onClick: handleScrollTop,
			label: t("tooltipScrollTop"),
			title: t("tooltipScrollTop"),
			disabled: scrollY === 0,
		},
		{
			key: "lang",
			icon: <FiGlobe size={26} />,
			label: t("tooltipChangeLanguage"),
			title: t("tooltipChangeLanguage"),
			submenu: (
				<div className="bg-white border border-purple-200 rounded-xl shadow-lg p-4 z-50 flex flex-col gap-2 min-w-[180px]">
					<Button
						variant={locale === "pt-br" ? "default" : "outlined"}
						icon={<FiGlobe />}
						label="Português"
						onClick={() => handleLanguageChange("pt-br")}
					/>
					<Button
						variant={locale === "en-us" ? "default" : "outlined"}
						icon={<FiGlobe />}
						label="English"
						onClick={() => handleLanguageChange("en-us")}
					/>
					<Button
						variant={locale === "es-es" ? "default" : "outlined"}
						icon={<FiGlobe />}
						label="Español"
						onClick={() => handleLanguageChange("es-es")}
					/>
				</div>
			),
		},
		{
			key: "limit",
			icon: <FiList size={24} />,
			label: t("tooltipChangeLimit"),
			title: t("tooltipChangeLimit"),
			submenu: (
				<div className="bg-white border border-purple-200 rounded-xl shadow-lg p-4 z-50 flex flex-col gap-2 min-w-[140px]">
					{[4, 8, 12, 16, 20].map((value) => (
						<Button
							key={value}
							variant={limit === value ? "default" : "outlined"}
							label={`${value} ${t("itemPlural")}`}
							onClick={() => handleChangeLimit(value)}
						/>
					))}
				</div>
			),
		},
	];

	const isLoading = initialLoading && !hasInitiallyLoaded.current;
	const shouldShowSkeletons = isLoading || products.length === 0;
	const hasMoreItems = products.length < totalItems;

	return (
		<div className="min-h-screen bg-[#fbfbfb]">
			<div className="pt-24">
				<Header title={t("headerTitle")} description="Juathan Coelho Duarte" />

				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
					{shouldShowSkeletons
						? Array.from({ length: limit }).map((_) => (
								<ProductCard key={`skeleton-${Math.random()}`} loading />
							))
						: products.map((product) => (
								<ProductCard
									key={product.id}
									product={product}
									page={page}
									onClick={handleOpenModal}
									onImageClick={() => {
										setImageToPreview({
											url: `https://plugin-storage.nyc3.digitaloceanspaces.com/families/images/${product.id}.webp`,
											alt: product.details.name,
										});
										setImageViewerOpen(true);
									}}
									imagePreviewIconOverlay={true}
								/>
							))}
				</div>

				{!shouldShowSkeletons && (
					<InfiniteScroll
						onLoadMore={handleLoadMore}
						hasMore={hasMoreItems}
						isLoading={loadingMore}
						threshold={400}
					/>
				)}

				<FloatingButton
					options={optionsFloatingButton}
					position={{ bottom: 32, right: 32 }}
				/>
			</div>

			<Modal open={modalOpen} onClose={handleCloseModal}>
				{selectedProduct && (
					<BodyModal
						selectedProduct={selectedProduct}
						setImageToPreview={setImageToPreview}
						setImageViewerOpen={setImageViewerOpen}
					/>
				)}
			</Modal>
			<ImagePreview
				open={imageViewerOpen}
				onClose={() => setImageViewerOpen(false)}
				imageUrl={imageToPreview?.url || ""}
				imageAlt={imageToPreview?.alt}
			/>
		</div>
	);
};

export default CatalogPage;
