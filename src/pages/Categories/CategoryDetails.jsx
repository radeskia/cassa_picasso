import { useParams } from "react-router-dom";
import {
    useGetCategoryDetails,
    useGetCategoryProducts,
} from "../../api/categories";
import ProductCard from "./_components/product-card";

const CategoryDetails = () => {
    const params = useParams();

    const { isLoading: categoryLoading, data: categoryData } =
        useGetCategoryDetails(params.categorySlug);

    const { isLoading: productsLoading, data: productsData } =
        useGetCategoryProducts(params.categorySlug);

    return (
        <section className="max-w-[1300px] mx-auto py-[45px]">
            <h1 className="text-5xl w-full text-transparent bg-clip-text font-extrabold bg-gradient-to-r from-violet-600 via-red-500  to-pink-700 text-center mb-[30px] leading-normal">
                {!categoryLoading && categoryData ? (
                    <>{categoryData.name}</>
                ) : null}
            </h1>
            <div className="grid grid-cols-4 gap-[30px]">
                {!productsLoading && productsData && productsData.items ? (
                    <>
                        {productsData.items.map((item, index) => {
                            return <ProductCard key={index} details={item} />;
                        })}
                    </>
                ) : null}
            </div>
        </section>
    );
};

export default CategoryDetails;
