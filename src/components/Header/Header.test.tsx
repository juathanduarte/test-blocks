import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Header from ".";

// Mock do logo para evitar erro de importação
jest.mock("@assets/blocks_logo.svg", () => "logo.svg");

describe("Header", () => {
	it("deve renderizar o título corretamente", () => {
		render(<Header title="Título de Teste" />);
		expect(screen.getByText("Título de Teste")).toBeInTheDocument();
	});

	it("deve renderizar a descrição se fornecida", () => {
		render(<Header title="Título" description="Descrição de Teste" />);
		expect(screen.getByText("Descrição de Teste")).toBeInTheDocument();
	});

	it("deve renderizar o logo com alt correto", () => {
		render(<Header title="Título" />);
		const logo = screen.getByAltText("Blocks Logo");
		expect(logo).toBeInTheDocument();
		expect(logo).toHaveAttribute("src", expect.stringContaining("logo.svg"));
	});

	it("deve mostrar e esconder o header ao rolar a página", () => {
		render(<Header title="Título" />);
		const header = screen.getByRole("banner");
		// Simula scroll para baixo
		window.scrollY = 100;
		window.dispatchEvent(new Event("scroll"));
		expect(header.className).toContain("-translate-y-full");
		// Simula scroll para o topo
		window.scrollY = 0;
		window.dispatchEvent(new Event("scroll"));
		expect(header.className).toContain("translate-y-0");
	});
});
