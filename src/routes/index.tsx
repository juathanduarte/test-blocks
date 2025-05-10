import { BrowserRouter, Route, Routes } from "react-router-dom";
import CatalogPage from "../pages/Catalog";

const AppRoutes = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<CatalogPage />} />
			</Routes>
		</BrowserRouter>
	);
};

export default AppRoutes;
