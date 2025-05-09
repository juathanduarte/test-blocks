import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppRoutes from "./routes/index.tsx";

const rootElement = document.getElementById("root");

if (!rootElement) throw new Error("Elemento root não encontrado");

createRoot(rootElement).render(
	<StrictMode>
		<AppRoutes />
	</StrictMode>,
);
