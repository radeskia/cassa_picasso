import { useQuery } from "@tanstack/react-query";
import { handleFetch } from "./handleFetch";

export const useGetFourInCategory = (categorySlugs) => {
    return useQuery({
        queryKey: [`categories-products-4-${categorySlugs}`],
        queryFn: async () => {
            const requests = categorySlugs.map((slug) => {
                return handleFetch(
                    "GET",
                    `${import.meta.env.VITE_SERVER_URL}product/list?page-size=4&category=${slug}`
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

export const useGetFilteredProducts = (filters) => {
    const {
        priceRange,
        inStock,
        selectedCategories,
        playersRange,
        playingTime,
        complexity,
    } = filters;

    let filterString = `?min-players=${playersRange.startValue}&max-players=${playersRange.endValue}&min-playing-time=${playingTime.startValue}&max-playing-time=${playingTime.endValue}&min-price=${priceRange.startValue}&max-price=${priceRange.endValue}&in-stock-only=${inStock}${selectedCategories.length ? `&category-slugs=${selectedCategories.join(",")}` : ""}&complexity=${complexity}`;

    // PLAYERS
    // filterString +
    //     `min-players=${playersRange.startValue}&max-players=${playersRange.endValue}`;

    // PLAYING TIME
    // filterString +
    //     `&min-playing-time=${playingTime.startValue}&max-playing-time=${playingTime.endValue}`;

    // PRICE RANGE
    // filterString +
    //     `&min-price=${priceRange.startValue}&max-price=${priceRange.endValue}`;

    // // IN STOCK
    // filterString + `&in-stock-only=${inStock}`;

    // CATEGORIES
    // filterString + `&category-slugs=${selectedCategories.join(",")}`;

    // COMPLEXITY
    // filterString + `&complexity=${complexity}`;

    console.log(filterString);

    return useQuery({
        queryKey: [`product-filters-${filterString}`],
        queryFn: async () => {
            return handleFetch(
                "GET",
                `${import.meta.env.VITE_SERVER_URL}product/list${filterString}`
            );
        },
        // enabled: !!productSlug,
    });
};
