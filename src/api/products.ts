import { useQuery } from "@tanstack/react-query";
import { handleFetch } from "../lib/handleFetch";

export const useGetFourInCategory = (categorySlugs) => {
    return useQuery({
        queryKey: [`categories-products-4-${categorySlugs}`],
        queryFn: async () => {
            const requests = categorySlugs.map((slug) => {
                return handleFetch({
                    method: "GET",
                    url: `product/list?page-size=4&category=${slug}`,
                });
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
            return handleFetch({
                method: "GET",
                url: `product/${productSlug}`,
            });
        },
        enabled: !!productSlug,
    });
};

export const useGetFilteredProducts = (filters) => {
    const {
        priceRange,
        inStock,
        selectedCategories,
        playersRange,
        playingTime,
        complexity,
        rating,
    } = filters;

    let filterString = `?min-players=${playersRange.startValue}&max-players=${playersRange.endValue}&min-playing-time=${playingTime.startValue}&max-playing-time=${playingTime.endValue}&min-price=${priceRange.startValue}&max-price=${priceRange.endValue}&in-stock-only=${inStock}${selectedCategories.length ? `&category-slugs=${selectedCategories.join(",")}` : ""}&complexity=${complexity}&rating=${rating}`;

    return useQuery({
        queryKey: [`product-filters-${filterString}`],
        queryFn: async () => {
            return handleFetch({
                method: "GET",
                url: `product/list${filterString}`,
            });
        },
    });
};

export const useGetProducts = () => {
    return useQuery({
        queryKey: [`products`],
        queryFn: async () => {
            return handleFetch({
                method: "GET",
                url: `product/list?page-size=30`,
            });
        },
        enabled: true,
    });
};
