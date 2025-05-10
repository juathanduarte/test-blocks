import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FiHome } from "react-icons/fi";
import FloatingButton, { type IOptionsFloatingButton } from ".";

describe("FloatingButton", () => {
	const options: IOptionsFloatingButton[] = [
		{
			key: "home",
			icon: <FiHome data-testid="icon-home" />,
			label: "Home",
			title: "Ir para Home",
			onClick: jest.fn(),
		},
		{
			key: "disabled",
			icon: <span data-testid="icon-disabled">D</span>,
			label: "Desabilitado",
			title: "Opção desabilitada",
			onClick: jest.fn(),
			disabled: true,
		},
		{
			key: "submenu",
			icon: <span data-testid="icon-submenu">S</span>,
			label: "Com submenu",
			title: "Opção com submenu",
			submenu: <div data-testid="submenu-content">Submenu</div>,
		},
	];

	it("renderiza o botão principal", () => {
		render(<FloatingButton options={options} />);
		expect(
			screen.getByRole("button", { name: /abrir opções/i }),
		).toBeInTheDocument();
		expect(screen.queryByTestId("icon-home")).not.toBeInTheDocument();
	});

	it("abre e fecha as opções ao clicar no botão principal", async () => {
		const user = userEvent.setup();
		render(<FloatingButton options={options} />);
		const mainButton = screen.getByRole("button", { name: /abrir opções/i });
		await user.click(mainButton);
		expect(screen.getByRole("button", { name: /home/i })).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: /desabilitado/i }),
		).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: /com submenu/i }),
		).toBeInTheDocument();
		await user.click(mainButton);
		await waitFor(() => {
			expect(screen.queryByRole("button", { name: /home/i })).toBeNull();
		});
	});

	it("chama onClick da opção quando clicada e fecha o menu", async () => {
		const user = userEvent.setup();
		render(<FloatingButton options={options} />);
		const mainButton = screen.getByRole("button", { name: /abrir opções/i });
		await user.click(mainButton);
		const homeButton = screen.getByRole("button", { name: /home/i });
		await user.click(homeButton);
		expect(options[0].onClick).toHaveBeenCalled();
		await waitFor(() => {
			expect(screen.queryByRole("button", { name: /home/i })).toBeNull();
		});
	});

	it("não chama onClick se a opção estiver desabilitada", async () => {
		const user = userEvent.setup();
		render(<FloatingButton options={options} />);
		const mainButton = screen.getByRole("button", { name: /abrir opções/i });
		await user.click(mainButton);
		const disabledButton = screen.getByRole("button", {
			name: /desabilitado/i,
		});
		await user.click(disabledButton);
		expect(options[1].onClick).not.toHaveBeenCalled();
	});

	it("abre e fecha submenu ao clicar na opção com submenu", async () => {
		const user = userEvent.setup();
		render(<FloatingButton options={options} />);
		const mainButton = screen.getByRole("button", { name: /abrir opções/i });
		await user.click(mainButton);
		const submenuButton = screen.getByRole("button", { name: /com submenu/i });
		await user.click(submenuButton);
		expect(screen.getByTestId("submenu-content")).toBeInTheDocument();
		// Fecha submenu
		const closeSubmenu = screen.getByRole("button", {
			name: /fechar submenu/i,
		});
		await user.click(closeSubmenu);
		await waitFor(() => {
			expect(screen.queryByTestId("submenu-content")).toBeNull();
		});
	});

	it("permite customizar o ícone principal", () => {
		render(
			<FloatingButton
				options={options}
				mainIcon={<span data-testid="custom-main-icon">C</span>}
				mainAriaLabel="Botão customizado"
			/>,
		);
		expect(screen.getByTestId("custom-main-icon")).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: /botão customizado/i }),
		).toBeInTheDocument();
	});

	it("renderiza com a posição correta", () => {
		render(
			<FloatingButton
				options={options}
				position={{ bottom: 100, right: 100 }}
			/>,
		);
		// O container é o primeiro div
		const container = screen.getByRole("button", {
			name: /abrir opções/i,
		}).parentElement;
		expect(container).toHaveStyle({
			bottom: "100px",
			right: "100px",
		});
	});
});
