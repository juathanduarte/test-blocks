import { useEffect, useRef, useState } from "react";
import { FiCheck } from "react-icons/fi";
import { useLocale } from "../../contexts/LocaleContext";
import { getLoadingMessage } from "../../helpers/getLoadingMessage";
import { useTranslation } from "../../hooks/useTranslation";
import Loading from "../Loading";

interface IInfiniteScroll {
	onLoadMore: () => void;
	hasMore: boolean;
	isLoading: boolean;
	loadingComponent?: React.ReactNode;
	threshold?: number;
}

export default function InfiniteScroll({
	onLoadMore,
	hasMore,
	isLoading,
	loadingComponent,
	threshold = 300,
}: IInfiniteScroll) {
	const loaderRef = useRef<HTMLDivElement>(null);
	const [loadCount, setLoadCount] = useState<number>(0);
	const { locale } = useLocale();
	const { t } = useTranslation(locale);

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

	return (
		<div
			ref={loaderRef}
			className="w-full py-8 flex justify-center items-center min-h-[100px]"
		>
			{isLoading && loadingComponent
				? loadingComponent
				: isLoading && (
						<Loading
							message={getLoadingMessage(
								loadCount,
								t as (key: string) => string,
							)}
						/>
					)}
			{!isLoading && !hasMore && (
				<div className="text-gray-600 py-4 px-6 bg-white rounded-lg shadow-sm border border-gray-200 flex items-center space-x-3">
					<FiCheck className="h-5 w-5 text-primary" aria-hidden="true" />
					<span className="font-medium">
						Você viu todos os produtos disponíveis
					</span>
				</div>
			)}
		</div>
	);
}
