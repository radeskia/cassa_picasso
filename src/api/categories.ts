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
