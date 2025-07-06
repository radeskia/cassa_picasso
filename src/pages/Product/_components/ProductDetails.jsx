import FeaturedSingleSlider from "../../HomePage/_components/FeaturedSingleSlider";

const ProductDetails = ({ productDetails }) => {
    console.log("from here", productDetails);
    return (
        <section className="max-w-[1300px] mx-auto py-[45px]">
            <h1 className="text-5xl w-full text-transparent bg-clip-text font-extrabold bg-gradient-to-r from-violet-600 via-red-400  to-pink-600 text-center mb-[30px] leading-normal">
                {productDetails.name}
            </h1>
            <div className="grid grid-cols-12 gap-[40px] my-[20px]">
                <div className="col-span-6">
                    {/* <FeaturedSingleSlider images={images} /> */}
                </div>
                <div className="col-span-6">
                    <div className="flex flex-col max-w-md">
                        <div>
                            <div className="flex justify-center gap-[15px]">
                                {productDetails.categories.map(
                                    (category, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className="py-1 px-3 rounded-full font-semibold bg-gradient-to-r from-orange-800   to-orange-300 mb-[30px] leading-normal text-black"
                                            >
                                                {category.name}
                                            </div>
                                        );
                                    }
                                )}
                            </div>
                            <p>{productDetails.description}</p>
                        </div>

                        <div className="flex justify-end mt-[20px]">
                            <a className="btn btn-primary">See more</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductDetails;
