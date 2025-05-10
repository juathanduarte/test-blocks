import { fireEvent, render, screen } from "@testing-library/react";
import { type IToast, ToastList } from ".";

describe("ToastList", () => {
	const baseToast: IToast = {
		id: 1,
		message: "Mensagem de teste",
		type: "info",
	};

	it("renderiza toast do tipo info", () => {
		render(<ToastList toasts={[baseToast]} removeToast={jest.fn()} />);
		expect(screen.getByText("Mensagem de teste")).toBeInTheDocument();
		expect(screen.getByText("Mensagem de teste").parentElement).toHaveClass(
			"border-blue-200",
		);
	});

	it("renderiza toast do tipo success", () => {
		render(
			<ToastList
				toasts={[{ ...baseToast, type: "success" }]}
				removeToast={jest.fn()}
			/>,
		);
		expect(screen.getByText("Mensagem de teste").parentElement).toHaveClass(
			"border-green-200",
		);
	});

	it("renderiza toast do tipo warning", () => {
		render(
			<ToastList
				toasts={[{ ...baseToast, type: "warning" }]}
				removeToast={jest.fn()}
			/>,
		);
		expect(screen.getByText("Mensagem de teste").parentElement).toHaveClass(
			"border-yellow-200",
		);
	});

	it("renderiza toast do tipo error", () => {
		render(
			<ToastList
				toasts={[{ ...baseToast, type: "error" }]}
				removeToast={jest.fn()}
			/>,
		);
		expect(screen.getByText("Mensagem de teste").parentElement).toHaveClass(
			"border-red-200",
		);
	});

	it("chama removeToast ao clicar no botão de fechar", () => {
		const removeToast = jest.fn();
		render(<ToastList toasts={[baseToast]} removeToast={removeToast} />);
		fireEvent.click(screen.getByRole("button", { name: /fechar toast/i }));
		expect(removeToast).toHaveBeenCalledWith(1);
	});

	it("aplica a posição correta (top-left)", () => {
		render(
			<ToastList
				toasts={[baseToast]}
				removeToast={jest.fn()}
				position="top-left"
			/>,
		);
		expect(
			screen.getByText("Mensagem de teste").parentElement?.parentElement,
		).toHaveClass("top-6 left-6");
	});
});
