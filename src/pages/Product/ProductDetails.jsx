import StarRating from "../../components/star-rating";
import { Warehouse } from "lucide-react";
import ProductImageSlider from "./_components/ProductImageSlider";
import Tabs from "../../components/tabs";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import RecommendedProducts from "./_components/RelatedProducts";
import { useCartStore } from "../../store/cart-store";

const ProductDetails = ({ productDetails }) => {
    const addItemToCart = useCartStore((state) => state.addItemToCart);

    const primaryImage = productDetails.images.find((item) => item.isPrimary);

    const navigate = useNavigate();

    const images = productDetails.images.map((item) => {
        return { image_src: item.url };
    });

    const [searchParams] = useSearchParams();
    const paramTab = searchParams.get("tabId");

    const [activeTab, setActiveTab] = useState(paramTab);

    const TAB_ITEMS = [
        { id: "description", text: "Short Description" },
        { id: "awards", text: "Awards" },
    ];

    return (
        <section className="max-w-[1300px] mx-auto py-[45px]">
            <h1 className="text-[55px] w-full text-transparent bg-clip-text font-extrabold bg-gradient-to-r from-violet-600 via-red-500  to-pink-700 text-center  leading-normal">
                {productDetails.name}
            </h1>
            <div className="flex justify-center mb-[30px]">
                <StarRating rating={3.5} />
            </div>

            <div className="grid grid-cols-12 gap-[40px] mt-[20px] mb-[50px]">
                <div className="col-span-7">
                    <ProductImageSlider images={images} />
                </div>
                <div className="col-span-5">
                    <div className="flex flex-col gap-[20px] justify-between h-full py-[25px]">
                        <div>
                            <div className="flex justify-center gap-[15px]">
                                {productDetails.categories.map(
                                    (category, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className="py-1 px-3 rounded-full font-semibold bg-orange-500 mb-[30px] text-[13px] leading-normal text-black"
                                            >
                                                {category.name}
                                            </div>
                                        );
                                    }
                                )}
                            </div>

                            <div className="text-[33px] text-neutral-100">
                                ${productDetails.price}
                            </div>

                            <div className="mt-5">
                                {productDetails.shortDescription}
                            </div>

                            <div className="mt-5">
                                <ul className="ml-10">
                                    <li>
                                        <div className="flex gap-[10px]">
                                            <span className="font-semibold text-[18px]">
                                                Number of players:
                                            </span>
                                            <span>
                                                {productDetails.numberOfPlayers}
                                            </span>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="flex gap-[10px]">
                                            <span className="font-semibold text-[18px]">
                                                Playing time:
                                            </span>
                                            <span>
                                                {productDetails.playingTime}
                                            </span>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="flex gap-[10px]">
                                            <span className="font-semibold text-[18px]">
                                                Community Age:
                                            </span>
                                            <span>
                                                {productDetails.communityAge}
                                            </span>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="flex gap-[10px]">
                                            <span className="font-semibold text-[18px]">
                                                Complexity:
                                            </span>
                                            <span>
                                                {productDetails.complexity}
                                            </span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex gap-[10px] text-lg">
                            <div className="text-emerald-600">
                                <Warehouse />
                            </div>
                            <div>
                                <span className="font-semibold">
                                    {productDetails.stock}
                                </span>
                                <span> in stock.</span>
                            </div>
                        </div>

                        <div className="mt-[20px] w-full flex justify-center">
                            <button
                                className="btn btn-primary font-bold uppercase w-full max-w-md"
                                onClick={() =>
                                    addItemToCart({
                                        ...productDetails,
                                        product_id: productDetails.id,
                                        image: primaryImage.url,
                                    })
                                }
                            >
                                Add to cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mb-[40px]">
                <Tabs
                    tabs={TAB_ITEMS}
                    activeTabId={activeTab}
                    handleTabSelection={(tab) => {
                        navigate(`?tabId=${tab.id}`);
                        setActiveTab(tab.id);
                    }}
                />

                <div className="mt-5">
                    {activeTab === "description" ? (
                        <div
                            className="text-lg"
                            dangerouslySetInnerHTML={{
                                __html: productDetails.description.replaceAll(
                                    "\n",
                                    "</br>"
                                ),
                            }}
                        ></div>
                    ) : (
                        <div className="text-lg text-center">
                            <h2 className="mb-[10px] text-3xl text-neutral-200">
                                Awards List
                            </h2>
                            {productDetails.awards.map((award, index) => {
                                return (
                                    <p key={index} className="pb-[5px]">
                                        {award}
                                    </p>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
            <div>
                <h2 className="text-3xl text-neutral-100 mb-[20px]">
                    Discover More...
                </h2>
                <RecommendedProducts
                    categories={productDetails.categories.map(
                        (category) => category.slug
                    )}
                    currentProductId={productDetails.id}
                />
            </div>
        </section>
    );
};

export default ProductDetails;
