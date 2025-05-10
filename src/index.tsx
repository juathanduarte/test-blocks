import { LocaleProvider } from "@/contexts/LocaleContext";
import { ToastProvider } from "@/contexts/ToastContext";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppRoutes from "./routes/index.tsx";
import "./styles/global.css";

const rootElement = document.getElementById("root");

if (!rootElement) throw new Error("Elemento root não encontrado");

createRoot(rootElement).render(
	<StrictMode>
		<ToastProvider>
			<LocaleProvider>
				<AppRoutes />
			</LocaleProvider>
		</ToastProvider>
	</StrictMode>,
);
