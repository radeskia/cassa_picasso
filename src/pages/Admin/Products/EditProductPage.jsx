import { useParams } from "react-router-dom";
import { useGetProductDetails } from "../../../api/products";
import { useEffect, useState } from "react";

const EditProductPage = () => {
    const params = useParams();
    const productSlug = params.productSlug;

    const { isLoading, data } = useGetProductDetails(productSlug);

    const [productDetails, setProductDetails] = useState({
        name: "",
        slug: "",
        description: "",
        shortDescription: "",
        numberOfPlayers: "",
        playingTime: "",
        communityAge: "",
        rating: 0,
        price: 0,
        stock: 0,
    });

    // TODO: Range Picker initial Limits
    const formFields = [
        { name: "name", title: "Name", type: "text" },
        { name: "slug", title: "Slug", type: "text" },
        { name: "description", title: "Description", type: "text" },
        { name: "shortDescription", title: "Short Description", type: "text" },
        { name: "numberOfPlayers", title: "Number of Players", type: "range" },
        { name: "playingTime", title: "Playing Time", type: "range" },
        { name: "communityAge", title: "Community Age", type: "string" },
        { name: "rating", title: "Rating", type: "number" },
        { name: "stock", title: "Stock", type: "number" },
    ];

    useEffect(() => {
        if (isLoading || !data) return;

        setProductDetails({
            name: data.name,
            slug: data.slug,
            description: data.description,
            shortDescription: data.shortDescription,
            numberOfPlayers: data.numberOfPlayers,
            playingTime: data.playingTime,
            communityAge: data.communityAge,
            rating: data.rating,
            price: data.price,
            stock: data.stock,
        });
    }, [data]);

    return (
        <div className="w-full flex flex-col">
            {!isLoading && data ? (
                <>
                    <div className="flex flex-col gap-[30px]">
                        <div className="w-full flex flex-col justify-center items-center">
                            <span className="text-5xl font-semibold">Edit</span>
                            <div className="text-6xl text-transparent bg-clip-text font-extrabold bg-gradient-to-r from-violet-600 via-red-500  to-pink-700 p-2">
                                {data.name}
                            </div>
                        </div>
                        <div className="w-[1200px] mx-auto">
                            <div className="grid grid-cols-2 gap-y-[20px] gap-x-[50px]">
                                {formFields.map((item, index) => {
                                    {
                                        /* if (item.type === "range") {
                                    return <RangePicker />;
                                } */
                                    }
                                    return (
                                        <div
                                            key={index}
                                            className="flex flex-col"
                                        >
                                            <label>{item.title}</label>
                                            <input
                                                name={item.name}
                                                className="input bg-slate-800"
                                                type={item.type}
                                                value={
                                                    productDetails[item.name]
                                                }
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="my-[30px] max-w-[600px] w-full flex flex-col justify-center mx-auto gap-[30px]">
                                <button className="btn btn-primary font-semibold text-xl w-full">
                                    Save
                                </button>
                                <button className="btn btn-outline font-semibold text-xl w-full">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </div>
    );
};

export default EditProductPage;
