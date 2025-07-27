import { useMemo } from "react";
import { useGetFourInCategory } from "../../../api/products";
import ProductCard from "../../Categories/_components/product-card";

const RecommendedProducts = ({ categories, currentProductId }) => {
    const { isLoading, data } = useGetFourInCategory(categories);

    const mappedData = useMemo(() => {
        if (isLoading) return [];
        const extracted = data
            .map((category) => category.items)
            .flat()
            .filter((item) => item.id !== currentProductId)
            .slice(0, 4);

        return extracted;
    }, [isLoading, data]);

    console.log(mappedData);
    return (
        <div>
            {!isLoading && data ? (
                <div className="grid grid-cols-4 gap-[30px]">
                    {mappedData.map((item, index) => {
                        return (
                            <ProductCard
                                key={index}
                                details={item}
                                modifierClass={"border-0"}
                            />
                        );
                    })}
                </div>
            ) : null}
        </div>
    );
};

export default RecommendedProducts;
