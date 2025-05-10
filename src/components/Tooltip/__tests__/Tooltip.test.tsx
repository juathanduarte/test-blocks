import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Tooltip from "..";

describe("Tooltip", () => {
	it("renderiza o conteúdo filho", () => {
		render(
			<Tooltip content="Dica de teste">
				<button type="button">Botão</button>
			</Tooltip>,
		);
		expect(screen.getByText("Botão")).toBeInTheDocument();
	});

	it("exibe o tooltip ao passar o mouse", () => {
		render(
			<Tooltip content="Dica de teste">
				<button type="button">Botão</button>
			</Tooltip>,
		);
		fireEvent.mouseEnter(screen.getByText("Botão"));
		expect(screen.getByText("Dica de teste")).toBeInTheDocument();
	});

	it("esconde o tooltip ao tirar o mouse", () => {
		render(
			<Tooltip content="Dica de teste">
				<button type="button">Botão</button>
			</Tooltip>,
		);
		const botao = screen.getByText("Botão");
		fireEvent.mouseEnter(botao);
		fireEvent.mouseLeave(botao);
		const tooltip = screen.getByText("Dica de teste");
		expect(tooltip).toHaveStyle("opacity: 0");
	});

	it("respeita a prop placement (bottom)", () => {
		render(
			<Tooltip content="Dica de teste" placement="bottom">
				<button type="button">Botão</button>
			</Tooltip>,
		);
		fireEvent.mouseEnter(screen.getByText("Botão"));
		const tooltip = screen.getByText("Dica de teste");
		expect(tooltip.className).toMatch(/top-full/);
	});

	it("respeita a prop visible (controlado)", () => {
		render(
			<Tooltip content="Dica de teste" visible={false}>
				<button type="button">Botão</button>
			</Tooltip>,
		);
		expect(screen.queryByText("Dica de teste")).toBeNull();
	});
});
