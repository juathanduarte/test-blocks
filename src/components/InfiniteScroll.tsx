import FloatingButton from "@/components/FloatingButton";
import Spinner from "@/components/Spinner";
import type { TLocale } from "@/models/Locale";
import { useEffect, useRef, useState } from "react";
import { FiCheck } from "react-icons/fi";

interface IInfiniteScroll {
	onLoadMore: () => void;
	hasMore: boolean;
	isLoading: boolean;
	loadingComponent?: React.ReactNode;
	threshold?: number;
	currentLocale?: TLocale;
	onLanguageChange?: (locale: TLocale) => void;
	onScrollTop?: () => void;
	onResetPagination?: () => void;
}

export default function InfiniteScroll({
	onLoadMore,
	hasMore,
	isLoading,
	loadingComponent,
	threshold = 300,
	currentLocale = "pt-br",
	onLanguageChange,
	onScrollTop,
	onResetPagination,
}: IInfiniteScroll) {
	const loaderRef = useRef<HTMLDivElement>(null);
	const [loadCount, setLoadCount] = useState<number>(0);

	useEffect(() => {
		const currentLoaderRef = loaderRef.current;

		const observer = new IntersectionObserver(
			(entries) => {
				const [entry] = entries;

				if (entry.isIntersecting && hasMore && !isLoading) {
					onLoadMore();
					setLoadCount((prev) => prev + 1);
				}
			},
			{
				root: null,
				rootMargin: `0px 0px ${threshold}px 0px`,
				threshold: 0.1,
			},
		);

		if (currentLoaderRef) {
			observer.observe(currentLoaderRef);
		}

		return () => {
			if (currentLoaderRef) {
				observer.unobserve(currentLoaderRef);
			}
		};
	}, [onLoadMore, hasMore, isLoading, threshold]);

	const getLoadingMessage = () => {
		if (loadCount < 2) return "Carregando mais itens...";
		if (loadCount < 4) return "Buscando mais famílias...";
		if (loadCount < 6) return "Quase lá, mais produtos chegando...";
		return "Continuamos buscando mais produtos para você...";
	};

	return (
		<div
			ref={loaderRef}
			className="w-full py-8 flex justify-center items-center min-h-[100px]"
		>
			{isLoading && loadingComponent
				? loadingComponent
				: isLoading && <Spinner message={getLoadingMessage()} />}
			{!isLoading && !hasMore && (
				<div className="text-gray-600 py-4 px-6 bg-white rounded-lg shadow-sm border border-gray-200 flex items-center space-x-3">
					<FiCheck className="h-5 w-5 text-primary" aria-hidden="true" />
					<span className="font-medium">
						Você viu todos os produtos disponíveis
					</span>
				</div>
			)}
			{onLanguageChange && onScrollTop && onResetPagination && (
				<FloatingButton
					currentLocale={currentLocale}
					onLanguageChange={onLanguageChange}
					onScrollTop={onScrollTop}
					onResetPagination={onResetPagination}
				/>
			)}
		</div>
	);
}
