import TestPage from "../pages/TestPage";
import HomePage from "../pages/HomePage/HomePage";
import CatalogPage from "../pages/Catalog/Catalog";
import CategoriesPage from "../pages/Categories/CategoriesPage";
import AboutPage from "../pages/About/About";
import ProductPage from "../pages/Product/ProductPage";
import CategoryDetails from "../pages/Categories/CategoryDetails";
import Dashboard from "../pages/Admin/Dashboard";
import AdminLayout from "../layout/AdminLayout";
import LoginPage from "../pages/Login/LoginPage";
import AdminProducts from "../pages/Admin/Products/AdminProducts";
import EditProductPage from "../pages/Admin/Products/EditProductPage";

export const APP_ROUTES = [
    { path: "*", element: <HomePage /> },
    { path: "/test", element: <TestPage /> },
    { path: "/catalog", element: <CatalogPage /> },
    { path: "/categories", element: <CategoriesPage /> },
    { path: "/about", element: <AboutPage /> },
    { path: "/product/:productSlug", element: <ProductPage /> },
    { path: "/category/:categorySlug", element: <CategoryDetails /> },
    { path: "/login", element: <LoginPage /> },
];

export const ADMIN_ROUTES = [
    {
        path: "/admin",
        element: (
            <AdminLayout>
                <Dashboard />
            </AdminLayout>
        ),
    },
    {
        path: "/admin/dashboard",
        element: (
            <AdminLayout>
                <Dashboard />
            </AdminLayout>
        ),
    },
    {
        path: "/admin/products",
        element: (
            <AdminLayout>
                <AdminProducts />
            </AdminLayout>
        ),
    },
    {
        path: "/admin/products/:productSlug/edit",
        element: (
            <AdminLayout>
                <EditProductPage />
            </AdminLayout>
        ),
    },
    {
        path: "/admin/categories",
        element: (
            <AdminLayout>
                <Dashboard />
            </AdminLayout>
        ),
    },
];

export const ROUTES = [...APP_ROUTES];
