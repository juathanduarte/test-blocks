import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Loading from ".";

jest.mock("../Spinner", () => () => <div data-testid="spinner" />);

describe("Loading", () => {
	it("deve renderizar o spinner e a mensagem padrão", () => {
		render(<Loading message="Carregando..." />);
		expect(screen.getByTestId("spinner")).toBeInTheDocument();
		expect(screen.getByText("Carregando...")).toBeInTheDocument();
	});

	it("deve renderizar sem mensagem se não for passada", () => {
		render(<Loading />);
		expect(screen.getByTestId("spinner")).toBeInTheDocument();
		expect(screen.queryByText(/./)).not.toBeInTheDocument();
	});

	it("deve aplicar classe de tamanho pequeno", () => {
		render(<Loading size="small" message="Pequeno" />);
		const container = screen.getByText("Pequeno").parentElement;
		expect(container).toHaveClass("text-sm");
	});

	it("deve aplicar classe de tamanho grande", () => {
		render(<Loading size="large" message="Grande" />);
		const container = screen.getByText("Grande").parentElement;
		expect(container).toHaveClass("text-lg");
	});
});
