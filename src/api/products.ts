import { useQuery } from "@tanstack/react-query";
import { handleFetch } from "./handleFetch";

export const useGetFourInCategory = (categoryIDs) => {
    return useQuery({
        queryKey: ["categories-products"],
        queryFn: async () => {
            const requests = categoryIDs.map((id) => {
                return handleFetch(
                    "GET",
                    `${import.meta.env.VITE_SERVER_URL}category/${id}`
                );
            });

            return Promise.all(requests);
        },
        enabled: true,
    });
};

export const useGetProductDetails = (productSlug) => {
    return useQuery({
        queryKey: [`product-details-${productSlug}`],
        queryFn: async () => {
            return handleFetch(
                "GET",
                `${import.meta.env.VITE_SERVER_URL}product/${productSlug}`
            );
        },
        enabled: !!productSlug,
    });
};
