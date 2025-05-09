import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppRoutes from "./routes";

const rootElement = document.getElementById("root");

if (!rootElement) throw new Error("Elemento root não encontrado");

ReactDOM.createRoot(rootElement).render(
	<React.StrictMode>
		<AppRoutes />
	</React.StrictMode>,
);
