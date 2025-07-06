import { useParams } from "react-router-dom";
import { useGetProductDetails } from "../../api/products";
import ProductDetails from "./_components/ProductDetails";

const ProductPage = () => {
    const params = useParams();

    // TODO: Replace product ID with product slug
    const { isLoading, data } = useGetProductDetails(6);

    console.log(data);
    return (
        <div className="max-w-[1300px] mx-auto pt-[40px]">
            {!isLoading && data ? (
                <ProductDetails productDetails={data} />
            ) : null}
        </div>
    );
};

export default ProductPage;

{
    /* <div>
                        <h1 className="text-center text-5xl mb-[20px]">
                            {data && data.name}
                        </h1>
                    </div>
                    <div className="flex justify-center gap-[15px]">
                        {data.categories.map((category, index) => {
                            return (
                                <div
                                    key={index}
                                    className="bg-orange-500 text-black font-semibold px-3 rounded-full flex items-center leading-relaxed"
                                >
                                    {category.name}
                                </div>
                            );
                        })}
                    </div> */
}
