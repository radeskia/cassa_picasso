import { useNavigate, useParams } from "react-router-dom";
import { useGetProductDetails } from "../../../api/products";
import { useEffect, useRef, useState } from "react";
import RangePicker from "../../../components/range-picker";
import { handleFetch } from "../../../lib/handleFetch";
import { queryClient } from "../../../App";
import { XIcon } from "lucide-react";
import { ImageUpload } from "./components/image-upload";
import { useGetCategories } from "../../../api/categories";
import Checkbox from "../../../components/checkbox";

const EditProductPage = () => {
    const params = useParams();
    const navigate = useNavigate();

    const productSlug = params.productSlug;

    const { isLoading, data } = useGetProductDetails(productSlug);

    const { isLoading: categoriesLoading, data: categoriesData } =
        useGetCategories();

    const [productDetails, setProductDetails] = useState({
        id: "",
        name: "",
        slug: "",
        description: "",
        shortDescription: "",
        numberOfPlayers: "",
        playingTime: "",
        communityAge: "",
        complexity: "",
        rating: 0,
        price: 0,
        stock: 0,
        awards: "",
        categoryIds: [],
        images: [],
    });

    useEffect(() => {
        if (isLoading || !data) return;

        setProductDetails({
            id: data.id,
            name: data.name,
            slug: data.slug,
            description: data.description,
            shortDescription: data.shortDescription,
            numberOfPlayers: data.numberOfPlayers,
            playingTime: data.playingTime,
            communityAge: data.communityAge,
            rating: data.rating,
            complexity: data.complexity,
            price: data.price,
            stock: data.stock,
            awards: data.awards,
            categoryIds: data.categories.map((item) => item.id),
            images: data.images,
        });
    }, [data]);

    const handleSubmit = async (formEvent) => {
        formEvent.preventDefault();
        const formData = new FormData(formEvent.currentTarget);

        const dataObject = {
            id: productDetails.id,
            name: formData.get("name"),
            slug: formData.get("slug"),
            description: formData.get("description"),
            "short-description": formData.get("shortDescription"),
            "number-of-players": formData.get("numberOfPlayers"),
            "playing-time": formData.get("playingTime"),
            "community-age": formData.get("communityAge"),
            rating: formData.get("rating"),
            complexity: formData.get("complexity"),
            price: formData.get("price"),
            stock: formData.get("stock"),
            awards: awardsRef.current?.innerHTML
                .replaceAll("<div>", ",")
                .replaceAll("</div>", "")
                .split("<br>")
                .join(","),
            "category-ids": formData.get("categoryIds"),
        };

        const newFormData = new FormData();

        for (let key in dataObject) {
            newFormData.append(key, dataObject[key]);
        }

        await handleFetch({
            url: "product/update",
            method: "PUT",
            body: newFormData,
        });

        queryClient.invalidateQueries({
            queryKey: [`product-details-${productSlug}`],
        });

        navigate("/admin/products");
    };

    const handleTogglePrimary = async (id) => {
        await handleFetch({ url: `image/set-primary/${id}`, method: "PUT" });
        await queryClient.invalidateQueries({
            queryKey: [`product-details-${productSlug}`],
        });
    };

    const awardsRef = useRef(null);

    useEffect(() => {
        if (awardsRef.current) {
            // Convert the comma-separated awards to new lines
            const html = productDetails.awards
                .map((award) => award.trim())
                .join("<br />");
            awardsRef.current.innerHTML = html;
        }
    }, [categoriesData, productDetails]);

    const toggleCategory = (categoryId) => {
        const presentCategories = [...productDetails.categoryIds];

        if (presentCategories.includes(categoryId)) {
            const filtered = presentCategories.filter(
                (id) => id !== categoryId
            );
            setProductDetails({ ...productDetails, categoryIds: filtered });
        } else {
            setProductDetails({
                ...productDetails,
                categoryIds: [...productDetails.categoryIds, categoryId],
            });
        }
    };

    return (
        <div className="w-full flex flex-col">
            {!isLoading && !categoriesLoading && data && productDetails.slug ? (
                <>
                    <form
                        className="flex flex-col gap-[30px]"
                        id="edit-product-form"
                        onSubmit={handleSubmit}
                    >
                        {/* TODO: */}
                        <input
                            type="hidden"
                            defaultValue={productDetails.categoryIds}
                            name="categoryIds"
                        />

                        <input
                            type="hidden"
                            defaultValue={productDetails.id}
                            name="id"
                        />
                        <div className="w-full flex flex-col justify-center items-center">
                            <span className="text-5xl font-semibold">Edit</span>
                            <div className="text-6xl text-transparent bg-clip-text font-extrabold bg-gradient-to-r from-violet-600 via-red-500  to-pink-700 p-2">
                                {data.name}
                            </div>
                        </div>
                        <div className="w-[1200px] mx-auto">
                            <div className="grid grid-cols-2 gap-y-[20px] gap-x-[50px]">
                                {/* NAME */}
                                <div className="flex flex-col">
                                    <label>Name</label>
                                    <input
                                        name="name"
                                        className="input bg-slate-800"
                                        defaultValue={productDetails.name}
                                    />
                                </div>

                                {/* SLUG */}
                                <div className="flex flex-col">
                                    <label>Slug</label>
                                    <input
                                        name="slug"
                                        className="input bg-slate-800"
                                        defaultValue={productDetails.slug}
                                    />
                                </div>

                                {/* DESCRIPTION */}
                                <div className="flex flex-col">
                                    <label>Description</label>
                                    <textarea
                                        name="description"
                                        className="input bg-slate-800 resize-none h-[200px] py-2"
                                        defaultValue={
                                            productDetails.description
                                        }
                                        form="edit-product-form"
                                    />
                                </div>

                                {/* SHORT DESCRIPTION */}
                                <div className="flex flex-col">
                                    <label>Short Description</label>
                                    <textarea
                                        name="shortDescription"
                                        className="input bg-slate-800 resize-none h-[200px] py-2"
                                        defaultValue={
                                            productDetails.shortDescription
                                        }
                                        form="edit-product-form"
                                    />
                                </div>

                                {/* NUMBER OF PLAYERS */}
                                <div className="flex flex-col justify-between py-3">
                                    <div className="flex flex-col gap-[20px]">
                                        <label>
                                            Number of players :{" "}
                                            {
                                                productDetails.numberOfPlayers.split(
                                                    "-"
                                                )[0]
                                            }{" "}
                                            -{" "}
                                            {productDetails.numberOfPlayers.split(
                                                "-"
                                            )[1] === "10"
                                                ? "10+"
                                                : productDetails.numberOfPlayers.split(
                                                      "-"
                                                  )[1]}
                                        </label>
                                        <RangePicker
                                            min={1}
                                            max={10}
                                            ranges={{
                                                startValue: Number(
                                                    productDetails.numberOfPlayers.split(
                                                        "-"
                                                    )[0]
                                                ),
                                                endValue: Number(
                                                    productDetails.numberOfPlayers.split(
                                                        "-"
                                                    )[1]
                                                ),
                                            }}
                                            handleValueChange={(values) => {
                                                setProductDetails({
                                                    ...productDetails,
                                                    numberOfPlayers: `${values.startValue}-${values.endValue}`,
                                                });
                                            }}
                                        />

                                        <input
                                            type="hidden"
                                            defaultValue={
                                                productDetails.numberOfPlayers
                                            }
                                            name="numberOfPlayers"
                                        />
                                    </div>

                                    {/* PLAYING TIME */}
                                    <div className="flex flex-col gap-[20px]">
                                        <label>
                                            Playing time :{" "}
                                            {
                                                productDetails.playingTime.split(
                                                    "-"
                                                )[0]
                                            }{" "}
                                            -{" "}
                                            {productDetails.playingTime.split(
                                                "-"
                                            )[1] === "125"
                                                ? "125+"
                                                : productDetails.playingTime.split(
                                                      "-"
                                                  )[1]}
                                        </label>
                                        <RangePicker
                                            min={5}
                                            max={125}
                                            step={5}
                                            ranges={{
                                                startValue: Number(
                                                    productDetails.playingTime.split(
                                                        "-"
                                                    )[0]
                                                ),
                                                endValue: Number(
                                                    productDetails.playingTime.split(
                                                        "-"
                                                    )[1]
                                                ),
                                            }}
                                            handleValueChange={(values) => {
                                                setProductDetails({
                                                    ...productDetails,
                                                    playingTime: `${values.startValue}-${values.endValue}`,
                                                });
                                            }}
                                        />

                                        <input
                                            type="hidden"
                                            defaultValue={
                                                productDetails.playingTime
                                            }
                                            name="playingTime"
                                        />
                                    </div>
                                </div>

                                {/* AWARDS */}
                                <div className="flex flex-col">
                                    <label>Awards</label>
                                    <div
                                        ref={awardsRef}
                                        contentEditable
                                        className="input bg-slate-800 resize-none h-[200px] py-2 overflow-scroll"
                                        data-name="awards"
                                        form="edit-product-form"
                                        suppressContentEditableWarning
                                    ></div>
                                </div>

                                {/* COMMUNITY AGE */}
                                <div className="flex flex-col">
                                    <label>Community Age</label>
                                    <input
                                        name="communityAge"
                                        className="input bg-slate-800"
                                        value={
                                            productDetails.communityAge.split(
                                                "+"
                                            )[0]
                                        }
                                        type="number"
                                        min={1}
                                        onChange={(event) => {
                                            setProductDetails({
                                                ...productDetails,
                                                communityAge: `${event.target.value}+`,
                                            });
                                        }}
                                    />
                                </div>

                                {/* RATING */}
                                <div className="flex flex-col">
                                    <label>Rating</label>
                                    <input
                                        name="rating"
                                        className="input bg-slate-800"
                                        value={productDetails.rating}
                                        type="number"
                                        min={1}
                                        step={0.01}
                                        onChange={(event) => {
                                            setProductDetails({
                                                ...productDetails,
                                                rating: `${event.target.value}`,
                                            });
                                        }}
                                    />
                                </div>

                                {/* PRICE */}
                                <div className="flex flex-col">
                                    <label>Price</label>
                                    <input
                                        name="price"
                                        className="input bg-slate-800"
                                        value={productDetails.price}
                                        type="number"
                                        min={1}
                                        step={0.01}
                                        onChange={(event) => {
                                            setProductDetails({
                                                ...productDetails,
                                                price: `${event.target.value}`,
                                            });
                                        }}
                                    />
                                </div>

                                {/* STOCK */}
                                <div className="flex flex-col">
                                    <label>Stock</label>
                                    <input
                                        name="stock"
                                        className="input bg-slate-800"
                                        value={productDetails.stock}
                                        type="number"
                                        min={0}
                                        step={1}
                                        onChange={(event) => {
                                            setProductDetails({
                                                ...productDetails,
                                                stock: `${event.target.value}`,
                                            });
                                        }}
                                    />
                                </div>

                                {/* COMPLEXITY */}
                                <div className="flex flex-col">
                                    <label>Complexity</label>
                                    <input
                                        type="number"
                                        step={0.1}
                                        className="input bg-slate-800"
                                        defaultValue={productDetails.complexity}
                                        name="complexity"
                                    />
                                </div>
                            </div>

                            {/* CATEGORIES */}
                            <div className="mt-[20px] mb-[60px] flex flex-col gap-[10px]">
                                <label>Categories</label>
                                <div className="flex gap-[20px]">
                                    {categoriesData.items.map(
                                        (category, index) => {
                                            return (
                                                <Checkbox
                                                    key={index}
                                                    title={category.name}
                                                    value={productDetails.categoryIds.includes(
                                                        category.id
                                                    )}
                                                    handleValue={() =>
                                                        toggleCategory(
                                                            category.id
                                                        )
                                                    }
                                                />
                                            );
                                        }
                                    )}
                                    <input
                                        type="hidden"
                                        value={productDetails.categoryIds.join(
                                            ","
                                        )}
                                        name="category-ids"
                                    />
                                </div>
                            </div>

                            {/* IMAGES */}
                            <div className="mt-[20px] flex flex-col gap-[10px]">
                                <label>Product Images</label>
                                <div className="flex gap-[30px]">
                                    {productDetails.images.map(
                                        (image, index) => {
                                            return (
                                                <div key={index}>
                                                    <div className="relative flex items-center justify-center bg-slate-700/30 rounded-lg p-6 w-fit">
                                                        <img
                                                            src={image.url}
                                                            className="max-h-[130px]"
                                                        />
                                                        <div className="absolute top-0 right-0 bg-rose-500 rounded-full p-[3px]">
                                                            <XIcon
                                                                className="text-white"
                                                                size={16}
                                                            />
                                                        </div>
                                                    </div>
                                                    {!image.isPrimary ? (
                                                        <div className="flex justify-center mt-2">
                                                            <button
                                                                className="btn btn-ghost h-[12px]"
                                                                type="button"
                                                                onClick={() =>
                                                                    handleTogglePrimary(
                                                                        image.id
                                                                    )
                                                                }
                                                            >
                                                                Set Primary
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <div className="flex justify-center mt-2 text-emerald-600 font-semibold">
                                                            <div className="btn btn-ghost h-[12px] text-emerald-600">
                                                                Primary
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        }
                                    )}
                                    <ImageUpload
                                        productId={productDetails.id}
                                        productSlug={productSlug}
                                    />
                                </div>
                            </div>

                            <div className="my-[30px] max-w-[600px] w-full flex flex-col justify-center mx-auto gap-[30px]">
                                <button
                                    className="btn btn-primary font-semibold text-xl w-full"
                                    type="submit"
                                >
                                    Save
                                </button>
                                <button className="btn btn-outline font-semibold text-xl w-full">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </form>
                </>
            ) : null}
        </div>
    );
};

export default EditProductPage;
