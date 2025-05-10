import { BrowserRouter, Route, Routes } from "react-router-dom";
import CatalogPage from "../pages/Catalog";
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<CatalogPage />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
};

export default AppRoutes;
