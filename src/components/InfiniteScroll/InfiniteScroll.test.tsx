import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import InfiniteScroll from ".";

jest.mock("../../contexts/LocaleContext", () => ({
	useLocale: () => ({ locale: "pt" }),
}));
jest.mock("../../hooks/useTranslation", () => ({
	useTranslation: () => (key: string) => key,
}));
jest.mock("../../helpers/getLoadingMessage", () => ({
	getLoadingMessage: (count: number) => `Carregando...${count}`,
}));

const customLoading = (
	<div data-testid="custom-loading">Carregando customizado</div>
);

describe("InfiniteScroll", () => {
	it("renderiza o loading padrão quando isLoading é true", () => {
		render(
			<InfiniteScroll onLoadMore={jest.fn()} hasMore={true} isLoading={true} />,
		);
		expect(screen.getByText(/Carregando.../)).toBeInTheDocument();
	});

	it("renderiza o loading customizado quando passado", () => {
		render(
			<InfiniteScroll
				onLoadMore={jest.fn()}
				hasMore={true}
				isLoading={true}
				loadingComponent={customLoading}
			/>,
		);
		expect(screen.getByTestId("custom-loading")).toBeInTheDocument();
	});

	it("renderiza a mensagem de fim quando não há mais itens", () => {
		render(
			<InfiniteScroll
				onLoadMore={jest.fn()}
				hasMore={false}
				isLoading={false}
			/>,
		);
		expect(
			screen.getByText(/você viu todos os produtos disponíveis/i),
		).toBeInTheDocument();
	});

	it("chama onLoadMore quando intersecta e há mais itens e não está carregando", () => {
		const onLoadMore = jest.fn();
		render(
			<InfiniteScroll
				onLoadMore={onLoadMore}
				hasMore={true}
				isLoading={false}
			/>,
		);
		const observerInstance = (window.IntersectionObserver as jest.Mock).mock
			.instances[0];
		const callback = observerInstance.callback;
		callback([{ isIntersecting: true }]);
		expect(onLoadMore).toHaveBeenCalled();
	});
});

beforeAll(() => {
	class IntersectionObserverMock {
		callback: (entries: unknown[]) => void;
		constructor(callback: (entries: unknown[]) => void) {
			this.callback = callback;
			IntersectionObserverMock.mock.instances.push(this);
		}
		observe() {}
		unobserve() {}
		disconnect() {}
		static mock = { instances: [] as IntersectionObserverMock[] };
	}
	// @ts-ignore
	window.IntersectionObserver = IntersectionObserverMock;
});

beforeEach(() => {
	// @ts-ignore
	window.IntersectionObserver.mock.instances = [];
});
