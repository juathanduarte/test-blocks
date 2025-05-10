import { render, screen } from "@testing-library/react";
import Spinner from ".";

describe("Spinner", () => {
	it("renderiza o SVG do spinner", () => {
		render(<Spinner />);
		expect(screen.getByTestId("spinner-svg")).toBeInTheDocument();
	});

	it("aplica as props de cor, altura e largura", () => {
		render(<Spinner color="#123456" height={30} width={40} />);
		const svg = screen.getByTestId("spinner-svg");
		expect(svg).toHaveAttribute("height", "30");
		expect(svg).toHaveAttribute("width", "40");
		expect(svg.querySelector("circle")).toHaveAttribute("stroke", "#123456");
		expect(svg.querySelector("path")).toHaveAttribute("fill", "#123456");
	});

	it("aplica className customizado", () => {
		render(<Spinner className="custom-class" />);
		expect(screen.getByTestId("spinner-svg")).toHaveClass("custom-class");
	});
});
