import React from "react";
import TestPage from "../pages/TestPage";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/About";
import CatalogPage from "../pages/Catalog";
import CategoriesPage from "../pages/Categories";

export const APP_ROUTES: any = [
    { path: "*", element: <HomePage /> },
    { path: "/test", element: <TestPage /> },
    { path: "/catalog", element: <CatalogPage /> },
    { path: "/categories", element: <CategoriesPage /> },
    { path: "/about", element: <AboutPage /> },
];

export const ROUTES: any[] = [...APP_ROUTES];
