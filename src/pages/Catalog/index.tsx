import FloatingButton, {
	type IOptionsFloatingButton,
} from "@/components/FloatingButton";
import Header from "@/components/Header";
import InfiniteScroll from "@/components/InfiniteScroll";
import ProductCard from "@/components/ProductCard";
import type { TLocale } from "@/models/Locale";
import type { IApiResponse, IProduct } from "@models/Product";
import { fetchProducts } from "@services/apiFamilies";
import { type FC, useCallback, useEffect, useRef, useState } from "react";
import { FiChevronUp, FiGlobe, FiList, FiRefreshCw } from "react-icons/fi";

const CatalogPage: FC = () => {
	const [products, setProducts] = useState<IProduct[]>([]);
	const [initialLoading, setInitialLoading] = useState<boolean>(true);
	const [loadingMore, setLoadingMore] = useState<boolean>(false);
	const [page, setPage] = useState<number>(1);
	const [totalItems, setTotalItems] = useState<number>(0);
	const [limit, setLimit] = useState<number>(8);
	const [locale, setLocale] = useState<TLocale>("pt-br");
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
		(newLocale: TLocale) => {
			if (newLocale !== locale) {
				setLocale(newLocale);
			}
		},
		[locale],
	);

	const handleChangeLimit = (newLimit: number) => {
		setLimit(newLimit);
		setPage(1);
		setProducts([]);
		loadProducts(1, true, locale);
	};

	// TODO: Tirar esse biome-ignore
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
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

	const optionsFloatingButton: IOptionsFloatingButton[] = [
		{
			key: "reset",
			icon: <FiRefreshCw size={26} />,
			onClick: handleResetPagination,
			label: "Resetar paginação",
			title: "Resetar a paginação",
		},
		{
			key: "scrollTop",
			icon: <FiChevronUp size={28} />,
			onClick: handleScrollTop,
			label: "Ir para o topo",
			title: "Voltar ao topo da página",
		},
		{
			key: "lang",
			icon: <FiGlobe size={26} />,
			label: "Trocar idioma",
			title: "Alterar idioma do catálogo",
			submenu: (
				<div className="bg-white border border-purple-200 rounded-xl shadow-lg p-4 z-50 flex flex-col gap-2 min-w-[180px]">
					<button
						className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors w-full text-left ${locale === "pt-br" ? "bg-purple-100 text-purple-800" : "text-gray-700 hover:bg-purple-50"}`}
						onClick={() => handleLanguageChange("pt-br")}
						type="button"
					>
						<FiGlobe className="text-purple-600" /> Português
					</button>
					<button
						className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors w-full text-left ${locale === "en-us" ? "bg-purple-100 text-purple-800" : "text-gray-700 hover:bg-purple-50"}`}
						onClick={() => handleLanguageChange("en-us")}
						type="button"
					>
						<FiGlobe className="text-purple-600" /> English
					</button>
					<button
						className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors w-full text-left ${locale === "es-es" ? "bg-purple-100 text-purple-800" : "text-gray-700 hover:bg-purple-50"}`}
						onClick={() => handleLanguageChange("es-es")}
						type="button"
					>
						<FiGlobe className="text-purple-600" /> Español
					</button>
				</div>
			),
		},
		{
			key: "limit",
			icon: <FiList size={24} />,
			label: "Limite",
			title: "Alterar quantidade de itens por página",
			submenu: (
				<div className="bg-white border border-purple-200 rounded-xl shadow-lg p-4 z-50 flex flex-col gap-2 min-w-[140px]">
					{[4, 8, 12, 16, 20].map((value) => (
						<button
							key={value}
							className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors w-full text-left ${limit === value ? "bg-purple-100 text-purple-800" : "text-gray-700 hover:bg-purple-50"}`}
							onClick={() => handleChangeLimit(value)}
							type="button"
						>
							{value} itens
						</button>
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
				<Header
					title={
						locale === "pt-br"
							? "Teste Técnico"
							: locale === "en-us"
								? "Technical Test"
								: "Prueba técnica"
					}
					description="Juathan Coelho Duarte"
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
					/>
				)}

				<FloatingButton
					options={optionsFloatingButton}
					position={{ bottom: 32, right: 32 }}
				/>
			</div>
		</div>
	);
};

export default CatalogPage;
