import { useQuery } from "@tanstack/react-query";
import { handleFetch } from "../lib/handleFetch";

export const useGetCategories = () => {
    return useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            return await handleFetch({ method: "GET", url: `category/list` });
        },
    });
};

export const useGetCategoryDetails = (categorySlug) => {
    return useQuery({
        queryKey: [`category-${categorySlug}`],
        queryFn: async () => {
            return await handleFetch({
                method: "GET",
                url: `category/${categorySlug}`,
            });
        },
        enabled: !!categorySlug,
    });
};

export const useGetCategoryProducts = (categorySlug) => {
    return useQuery({
        queryKey: [`category-products-${categorySlug}`],
        queryFn: async () => {
            return await handleFetch({
                method: "GET",
                url: `product/list?category=${categorySlug}`,
            });
        },
        enabled: !!categorySlug,
    });
};
