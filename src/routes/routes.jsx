import TestPage from "../pages/TestPage";
import HomePage from "../pages/HomePage/HomePage";
import CatalogPage from "../pages/Catalog/Catalog";
import CategoriesPage from "../pages/Categories/Categories";
import AboutPage from "../pages/About/About";
import ProductPage from "../pages/Product/ProductPage";

export const APP_ROUTES = [
    { path: "*", element: <HomePage /> },
    { path: "/test", element: <TestPage /> },
    { path: "/catalog", element: <CatalogPage /> },
    { path: "/categories", element: <CategoriesPage /> },
    { path: "/about", element: <AboutPage /> },
    { path: "/product/:productId", element: <ProductPage /> },
];

export const ROUTES = [...APP_ROUTES];
