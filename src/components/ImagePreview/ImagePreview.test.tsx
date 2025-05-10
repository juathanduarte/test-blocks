import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ImagePreview from ".";

const IMAGE_URL = "https://exemplo.com/imagem.jpg";
const ALT_TEXT = "Imagem de teste";

describe("ImagePreview", () => {
	const onClose = jest.fn();

	beforeEach(() => {
		onClose.mockClear();
	});

	it("não renderiza nada quando open é false", () => {
		render(
			<ImagePreview
				open={false}
				onClose={onClose}
				imageUrl={IMAGE_URL}
				imageAlt={ALT_TEXT}
			/>,
		);
		expect(screen.queryByAltText(ALT_TEXT)).not.toBeInTheDocument();
	});

	it("renderiza a imagem e os botões quando open é true", () => {
		render(
			<ImagePreview
				open={true}
				onClose={onClose}
				imageUrl={IMAGE_URL}
				imageAlt={ALT_TEXT}
			/>,
		);
		expect(screen.getByAltText(ALT_TEXT)).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: /fechar visualização/i }),
		).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: /zoom in/i }),
		).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: /zoom out/i }),
		).toBeInTheDocument();
		expect(screen.getByRole("button", { name: /girar/i })).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: /download/i }),
		).toBeInTheDocument();
	});

	it("chama onClose ao clicar no botão de fechar", async () => {
		const user = userEvent.setup();
		render(
			<ImagePreview
				open={true}
				onClose={onClose}
				imageUrl={IMAGE_URL}
				imageAlt={ALT_TEXT}
			/>,
		);
		await user.click(
			screen.getByRole("button", { name: /fechar visualização/i }),
		);
		expect(onClose).toHaveBeenCalled();
	});

	it("chama onClose ao clicar no fundo escuro", async () => {
		const user = userEvent.setup();
		render(
			<ImagePreview
				open={true}
				onClose={onClose}
				imageUrl={IMAGE_URL}
				imageAlt={ALT_TEXT}
			/>,
		);
		const overlay = screen.getByAltText(ALT_TEXT).closest(".fixed");
		expect(overlay).not.toBeNull();
		if (overlay) await user.click(overlay);
		expect(onClose).toHaveBeenCalled();
	});

	it("chama onClose ao pressionar Escape", async () => {
		render(
			<ImagePreview
				open={true}
				onClose={onClose}
				imageUrl={IMAGE_URL}
				imageAlt={ALT_TEXT}
			/>,
		);
		const overlay = screen.getByAltText(ALT_TEXT).closest(".fixed");
		if (overlay) {
			fireEvent.keyDown(overlay, { key: "Escape" });
		}
		expect(onClose).toHaveBeenCalled();
	});

	it("faz zoom in e zoom out ao clicar nos botões", async () => {
		const user = userEvent.setup();
		render(
			<ImagePreview
				open={true}
				onClose={onClose}
				imageUrl={IMAGE_URL}
				imageAlt={ALT_TEXT}
			/>,
		);
		const img = screen.getByAltText(ALT_TEXT);
		const zoomIn = screen.getByRole("button", { name: /zoom in/i });
		const zoomOut = screen.getByRole("button", { name: /zoom out/i });
		const getScale = () =>
			img.getAttribute("style")?.match(/scale\(([^)]+)\)/)?.[1];
		const scaleBefore = getScale();
		await user.click(zoomIn);
		const scaleAfterIn = getScale();
		await user.click(zoomOut);
		const scaleAfterOut = getScale();
		expect(scaleAfterIn).not.toBeUndefined();
		expect(scaleBefore).not.toBeUndefined();
		expect(Number(scaleAfterIn)).toBeGreaterThan(Number(scaleBefore));
		expect(scaleAfterOut).not.toBeUndefined();
		expect(Number(scaleAfterOut)).toBeLessThan(Number(scaleAfterIn));
	});

	it("gira a imagem ao clicar no botão de girar", async () => {
		const user = userEvent.setup();
		render(
			<ImagePreview
				open={true}
				onClose={onClose}
				imageUrl={IMAGE_URL}
				imageAlt={ALT_TEXT}
			/>,
		);
		const img = screen.getByAltText(ALT_TEXT);
		const rotateBtn = screen.getByRole("button", { name: /girar/i });
		const getRotation = () =>
			img.getAttribute("style")?.match(/rotate\((\d+)deg\)/)?.[1];
		const rotationBefore = getRotation();
		await user.click(rotateBtn);
		const rotationAfter = getRotation();
		expect(rotationAfter).not.toBeUndefined();
		expect(rotationBefore).not.toBeUndefined();
		expect(Number(rotationAfter)).toBe((Number(rotationBefore) + 90) % 360);
	});

	it("aciona o download ao clicar no botão de download", async () => {
		const user = userEvent.setup();
		const createElementSpy = jest.spyOn(document, "createElement");
		render(
			<ImagePreview
				open={true}
				onClose={onClose}
				imageUrl={IMAGE_URL}
				imageAlt={ALT_TEXT}
			/>,
		);
		const downloadBtn = screen.getByRole("button", { name: /download/i });
		await user.click(downloadBtn);
		expect(createElementSpy).toHaveBeenCalledWith("a");
		createElementSpy.mockRestore();
	});
});
