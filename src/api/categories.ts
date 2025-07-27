import { useQuery } from "@tanstack/react-query";
import { handleFetch } from "./handleFetch";

export const useGetCategories = () => {
    return useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            return await handleFetch(
                "GET",
                `${import.meta.env.VITE_SERVER_URL}category/list`
            );
        },
    });
};

export const useGetCategoryDetails = (categorySlug) => {
    return useQuery({
        queryKey: [`category-${categorySlug}`],
        queryFn: async () => {
            return await handleFetch(
                "GET",
                `${import.meta.env.VITE_SERVER_URL}category/${categorySlug}`
            );
        },
        enabled: !!categorySlug,
    });
};

export const useGetCategoryProducts = (categorySlug) => {
    return useQuery({
        queryKey: [`category-products-${categorySlug}`],
        queryFn: async () => {
            return await handleFetch(
                "GET",
                `${import.meta.env.VITE_SERVER_URL}product/list?category=${categorySlug}`
            );
        },
        enabled: !!categorySlug,
    });
};
