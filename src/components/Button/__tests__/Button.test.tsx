import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FiHome } from "react-icons/fi";
import Button, { type TButtonVariant } from "..";

describe("Button", () => {
	it("renderiza com o label", () => {
		render(<Button label="Clique aqui" />);
		expect(screen.getByText("Clique aqui")).toBeInTheDocument();
	});

	it("renderiza children quando label não é passado", () => {
		render(<Button>Botão com children</Button>);
		expect(screen.getByText("Botão com children")).toBeInTheDocument();
	});

	it("chama onClick quando clicado", async () => {
		const user = userEvent.setup();
		const onClick = jest.fn();
		render(<Button label="Clique" onClick={onClick} />);
		await user.click(screen.getByRole("button"));
		expect(onClick).toHaveBeenCalled();
	});

	it("não chama onClick quando desabilitado", async () => {
		const user = userEvent.setup();
		const onClick = jest.fn();
		render(<Button label="Desabilitado" onClick={onClick} disabled />);
		await user.click(screen.getByRole("button"));
		expect(onClick).not.toHaveBeenCalled();
	});

	it("renderiza o spinner quando loading", () => {
		render(<Button label="Carregando" loading />);
		expect(screen.getByRole("button")).toBeDisabled();
		expect(screen.getByTestId("spinner-svg")).toBeInTheDocument();
	});

	it("renderiza o ícone quando passado", () => {
		render(
			<Button label="Com ícone" icon={<FiHome data-testid="icon-home" />} />,
		);
		expect(screen.getByTestId("icon-home")).toBeInTheDocument();
	});

	it.each<TButtonVariant>(["default", "outlined", "error"])(
		"renderiza com a variante %s",
		(variant) => {
			render(<Button label={variant} variant={variant} />);
			expect(screen.getByText(variant)).toBeInTheDocument();
		},
	);

	it("aplica estilos customizados de height e width", () => {
		render(<Button label="Custom" height={100} width={200} />);
		const button = screen.getByRole("button");
		expect(button).toHaveStyle({ height: "100px", width: "200px" });
	});
});
