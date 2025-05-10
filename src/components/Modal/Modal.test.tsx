import { fireEvent, render, screen } from "@testing-library/react";
import Modal from ".";

describe("Modal", () => {
	it("não renderiza quando open é false", () => {
		render(
			<Modal open={false} onClose={jest.fn()}>
				<div>Conteúdo do Modal</div>
			</Modal>,
		);
		expect(screen.queryByText("Conteúdo do Modal")).toBeNull();
	});

	it("renderiza quando open é true", () => {
		render(
			<Modal open={true} onClose={jest.fn()}>
				<div>Conteúdo do Modal</div>
			</Modal>,
		);
		expect(screen.getByText("Conteúdo do Modal")).toBeInTheDocument();
	});

	it("chama onClose ao clicar no fundo escuro", () => {
		const onClose = jest.fn();
		render(
			<Modal open={true} onClose={onClose}>
				<div>Conteúdo do Modal</div>
			</Modal>,
		);
		fireEvent.click(screen.getByRole("button", { name: /fechar modal/i }));
		expect(onClose).toHaveBeenCalled();
	});

	it("não chama onClose ao clicar dentro do conteúdo", () => {
		const onClose = jest.fn();
		render(
			<Modal open={true} onClose={onClose}>
				<div data-testid="conteudo">Conteúdo do Modal</div>
			</Modal>,
		);
		fireEvent.click(screen.getByTestId("conteudo"));
		expect(onClose).not.toHaveBeenCalled();
	});
});
