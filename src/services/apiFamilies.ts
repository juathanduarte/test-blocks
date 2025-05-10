import api from "./api";

interface IFetchProducts {
	locale: string;
	page: number;
	limit: number;
	sortBy: string;
}

export async function fetchProducts(params: IFetchProducts) {
	try {
		const url = "/families";

		const response = await api.post(url, null, { params });

		return response.data;
	} catch (error) {
		console.error("Erro ao buscar produtos:", error);
		throw error;
	}
}
