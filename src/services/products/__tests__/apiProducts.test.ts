import api from "../../api";
import { fetchProducts } from "../apiProducts";

jest.mock("../../api");

const mockApi = api as jest.Mocked<typeof api>;

describe("fetchProducts", () => {
	const params = { locale: "pt-br", page: 1, limit: 10, sortBy: "name" };

	it("retorna dados em caso de sucesso", async () => {
		mockApi.post.mockResolvedValueOnce({ data: { result: "ok" } });
		const data = await fetchProducts(params);
		expect(data).toEqual({ result: "ok" });
		expect(mockApi.post).toHaveBeenCalledWith("/families", null, { params });
	});

	it("lança erro em caso de falha", async () => {
		mockApi.post.mockRejectedValueOnce(new Error("Erro de API"));
		await expect(fetchProducts(params)).rejects.toThrow("Erro de API");
	});

	describe("cenários adicionais", () => {
		it("faz chamada correta com outros parâmetros", async () => {
			const params = { locale: "en-us", page: 2, limit: 5, sortBy: "recent" };
			mockApi.post.mockResolvedValueOnce({
				data: { families: [1, 2], total: 2 },
			});
			const data = await fetchProducts(params);
			expect(data).toEqual({ families: [1, 2], total: 2 });
			expect(mockApi.post).toHaveBeenCalledWith("/families", null, { params });
		});

		it("retorna undefined se resposta não tem data", async () => {
			mockApi.post.mockResolvedValueOnce({});
			const data = await fetchProducts({
				locale: "pt-br",
				page: 1,
				limit: 10,
				sortBy: "name",
			});
			expect(data).toBeUndefined();
		});

		it("retorna estrutura inesperada sem erro", async () => {
			mockApi.post.mockResolvedValueOnce({ data: 123 });
			const data = await fetchProducts({
				locale: "pt-br",
				page: 1,
				limit: 10,
				sortBy: "name",
			});
			expect(data).toBe(123);
		});

		it("funciona com múltiplas chamadas em sequência", async () => {
			mockApi.post.mockClear();
			mockApi.post.mockResolvedValueOnce({ data: { a: 1 } });
			mockApi.post.mockResolvedValueOnce({ data: { b: 2 } });
			const data1 = await fetchProducts({
				locale: "pt-br",
				page: 1,
				limit: 10,
				sortBy: "name",
			});
			const data2 = await fetchProducts({
				locale: "en-us",
				page: 2,
				limit: 5,
				sortBy: "recent",
			});
			expect(data1).toEqual({ a: 1 });
			expect(data2).toEqual({ b: 2 });
			expect(mockApi.post).toHaveBeenCalledTimes(2);
		});
	});
});
