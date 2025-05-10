import Header from "@/components/Header";
import InfiniteScroll from "@/components/InfiniteScroll";
import ProductCard from "@/components/ProductCard";
import type { IApiResponse, IProduct } from "@models/Product";
import { fetchProducts } from "@services/apiFamilies";
import { type FC, useCallback, useEffect, useRef, useState } from "react";

const CatalogPage: FC = () => {
	const [products, setProducts] = useState<IProduct[]>([]);
	const [initialLoading, setInitialLoading] = useState<boolean>(true);
	const [loadingMore, setLoadingMore] = useState<boolean>(false);
	const [page, setPage] = useState<number>(1);
	const [totalItems, setTotalItems] = useState<number>(0);
	const [limit] = useState<number>(8);
	const [locale, setLocale] = useState<string>("pt-br");
	const hasInitiallyLoaded = useRef<boolean>(false);

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
			} catch (error) {
				console.error("Erro ao carregar produtos", error);
			} finally {
				if (isInitialLoad) {
					setInitialLoading(false);
					hasInitiallyLoaded.current = true;
				} else {
					setLoadingMore(false);
				}
			}
		},
		[limit, locale],
	);

	useEffect(() => {
		setPage(1);
		setProducts([]);
		loadProducts(1, true, locale);
	}, [locale, loadProducts]);

	const handleLanguageChange = useCallback(
		(newLocale: string) => {
			if (newLocale !== locale) {
				setLocale(newLocale);
			}
		},
		[locale],
	);

	const handleLoadMore = useCallback(() => {
		console.log("handleLoadMore");
		if (products.length < totalItems) {
			const nextPage = page + 1;
			setPage(nextPage);
			loadProducts(nextPage, false);
		}
	}, [page, products.length, totalItems]);

	const handleScrollTop = useCallback(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, []);

	const handleResetPagination = useCallback(() => {
		setPage(1);
		setProducts([]);
		loadProducts(1, true, locale);
	}, [loadProducts, locale]);

	const isLoading = initialLoading && !hasInitiallyLoaded.current;
	const shouldShowSkeletons = isLoading || products.length === 0;

	const hasMoreItems = products.length < totalItems;

	return (
		<div className="min-h-screen bg-[#fbfbfb]">
			<div>
				<Header
					title={
						locale === "pt-br"
							? "Teste Técnico"
							: locale === "en-us"
								? "Technical Test"
								: "Prueba técnica"
					}
					description="Juathan Coelho Duarte"
					onLanguageChange={handleLanguageChange}
				/>

				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
					{shouldShowSkeletons
						? Array.from({ length: limit }).map((_) => (
								<ProductCard key={`skeleton-${Math.random()}`} loading />
							))
						: products.map((product) => (
								<ProductCard key={product.id} product={product} page={page} />
							))}
				</div>

				{!shouldShowSkeletons && (
					<InfiniteScroll
						onLoadMore={handleLoadMore}
						hasMore={hasMoreItems}
						isLoading={loadingMore}
						threshold={400}
						currentLocale={locale}
						onLanguageChange={handleLanguageChange}
						onScrollTop={handleScrollTop}
						onResetPagination={handleResetPagination}
					/>
				)}
			</div>
		</div>
	);
};

export default CatalogPage;
