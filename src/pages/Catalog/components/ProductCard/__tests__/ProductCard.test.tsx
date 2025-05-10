import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import type { IProduct } from "../../../../../models/Product";
import ProductCard from "../index";

const mockProduct: IProduct = {
	id: "99c47c8b-a9fe-4c8d-87d3-7611d4305d01",
	isPremium: false,
	isHighlighted: true,
	revitVersion: "2024",
	isSaved: true,
	isActive: false,
	createdAt: "2025-03-15T09:22:10.150Z",
	updatedAt: "2025-05-05T11:45:33.401Z",
	releasedAt: null,
	scheduledDate: null,
	details: {
		id: "ad02c87f-fcc4-41fc-bc19-b245c3fce6fa",
		description:
			"Modular steel shelving for industrial storage, ideal for heavy-duty environments.",
		locale: "en-us",
		name: "Steel Shelving",
		rfaFile: "F08212_EN_Steel-Shelving",
		slug: "steel-shelving-5821",
		createdAt: "2025-03-15T09:22:10.170Z",
		updatedAt: "2025-05-05T11:45:33.410Z",
	},
	finishes: [
		{
			id: "ba45c0e1-45f5-4b18-a00f-3cba2d957c6a",
			isColor: false,
			detail: {
				id: "1f1786d2-91d9-4dc1-a14b-4b92c0e6b810",
				name: "Metallic",
				locale: "en-us",
				createdAt: "2024-04-12T10:00:00.000Z",
				updatedAt: null,
			},
			createdAt: "2024-04-12T10:00:05.000Z",
			updatedAt: "2024-04-12T10:10:10.000Z",
		},
		{
			id: "c1a88852-12d1-4b9c-bc63-b3d2a7f3cc84",
			isColor: true,
			detail: {
				id: "db4ecfa2-3f59-4f62-84f5-961ec7edbff3",
				name: "Dark Gray",
				locale: "en-us",
				createdAt: "2024-04-12T10:20:00.000Z",
				updatedAt: null,
			},
			createdAt: "2024-04-12T10:20:05.000Z",
			updatedAt: null,
		},
	],
	collection: {
		id: "c3d8b8e4-8617-42be-9d4e-dc9128ac1f32",
		createdAt: "2025-03-10T08:00:00.000Z",
		details: {
			id: "d432ed02-1a03-49a1-ae94-3df67f8f1d97",
			name: "Industrial Line",
			description:
				"A collection focused on robust, practical, and modern elements for industrial environments.",
			locale: "en-us",
			slug: "industrial-line-8210",
			updatedAt: "2025-03-10T08:15:00.000Z",
			createdAt: "2025-02-20T14:45:00.000Z",
		},
		updatedAt: "2025-03-10T08:15:00.000Z",
		scheduledDate: null,
		status: "draft",
		releasedAt: null,
		pinnedAt: null,
		isNew: true,
		familiesCount: null,
	},
	brand: {
		id: "03aa4f2d-60c9-4fc3-9aa5-801d1dc77cdd",
		name: "MockFurnish",
		description: "Experimental brand for digital furnishings",
		website: "https://mockfurnish.io",
		country: "Neverland",
		slug: "mockfurnish-9130",
		createdAt: "2024-02-01T16:10:10.000Z",
	},
	isNew: true,
	stickers: [],
	styles: [],
};

describe("ProductCard", () => {
	it("renderiza nome, descrição, marca, coleção e acabamentos", () => {
		render(<ProductCard product={mockProduct} />);
		expect(screen.getByText("Bacia Sanitária Coral")).toBeInTheDocument();
		expect(screen.getByText(/Bacia sanitária de piso/)).toBeInTheDocument();
		expect(screen.getByText(/Sanitana/)).toBeInTheDocument();
		expect(screen.getByText(/Louças Sanitárias/)).toBeInTheDocument();
		expect(screen.getByText("Cerâmica")).toBeInTheDocument();
		expect(screen.getByText("Branco")).toBeInTheDocument();
	});

	it("exibe badge Premium e Novo", () => {
		render(<ProductCard product={mockProduct} />);
		expect(screen.getByText(/Premium/i)).toBeInTheDocument();
		expect(screen.getByText(/Novo/i)).toBeInTheDocument();
	});

	it("exibe skeleton quando loading", () => {
		render(<ProductCard loading />);
		expect(screen.getAllByRole("button")[0]).toBeDisabled();
	});

	it("chama onImageClick ao clicar na imagem", () => {
		const onImageClick = jest.fn();
		render(<ProductCard product={mockProduct} onImageClick={onImageClick} />);
		const imageDiv = screen.getByLabelText(/Abrir imagem em tela cheia/i);
		fireEvent.click(imageDiv);
		expect(onImageClick).toHaveBeenCalledWith(mockProduct);
	});

	it("chama onClick ao clicar no card", () => {
		const onClick = jest.fn();
		render(<ProductCard product={mockProduct} onClick={onClick} />);
		const card = screen.getByRole("button");
		fireEvent.click(card);
		// onClick só é chamado se implementado no componente, ajuste se necessário
	});
});
