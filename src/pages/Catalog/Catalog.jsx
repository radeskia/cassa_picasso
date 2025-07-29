import { useState } from "react";
import Checkbox from "../../components/checkbox";
import { useGetCategories } from "../../api/categories";
import RangePicker from "../../components/range-picker";
import { useGetFilteredProducts } from "../../api/products";
import ProductCard from "../Categories/_components/product-card";

const CatalogPage = () => {
    const [priceRange, setPriceRange] = useState({
        startValue: 30,
        endValue: 90,
    });
    const [inStock, setInStock] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [playersRange, setPlayersRange] = useState({
        startValue: 3,
        endValue: 5,
    });
    const [playingTime, setPlayingTime] = useState({
        startValue: 40,
        endValue: 50,
    });
    const [complexity, setComplexity] = useState(1);
    const [rating, setRating] = useState(1);

    const { data: categoriesData, isLoading: categoriesLoading } =
        useGetCategories();

    const [selectedFilters, setSelectedFilters] = useState({
        priceRange: { startValue: 30, endValue: 90 },
        playersRange: { startValue: 3, endValue: 5 },
        playingTime: { startValue: 40, endValue: 50 },
        selectedCategories: [],
        complexity: 1,
        inStock: false,
        rating: 1,
    });

    const handleToggleCategory = (categorySlug) => {
        if (selectedCategories.includes(categorySlug)) {
            const filtered = selectedCategories.filter(
                (item) => item !== categorySlug
            );
            setSelectedCategories(filtered);
        } else {
            setSelectedCategories([...selectedCategories, categorySlug]);
        }
    };

    const { data, isLoading } = useGetFilteredProducts(selectedFilters);

    return (
        <div className="pt-[40px]">
            <div className="flex flex-col">
                <h1 className="text-center text-5xl">Catalog</h1>
                <div className="grid grid-cols-12 px-[20px] gap-[30px] pt-[30px]">
                    <div className="col-span-3">
                        {!categoriesLoading && categoriesData ? (
                            <div className="bg-slate-800 px-[30px] py-[20px] flex flex-col gap-[15px]">
                                {/* PRICE RANGE SLIDER */}
                                <div className="flex flex-col border-b border-slate-600 gap-[15px] pb-[10px]">
                                    <label className="text-neutral-100">
                                        Price Range
                                    </label>
                                    <RangePicker
                                        min={5}
                                        max={150}
                                        step={5}
                                        ranges={priceRange}
                                        handleValueChange={(values) =>
                                            setPriceRange(values)
                                        }
                                        formatCurrency={true}
                                        label="Price"
                                        noMax
                                    />
                                </div>

                                {/* STOCK */}
                                <div className="flex flex-col gap-[10px] border-b border-slate-600 pb-[15px]">
                                    <div className="text-neutral-100">
                                        Availability
                                    </div>
                                    <div className="flex flex-col">
                                        <Checkbox
                                            title="In Stock"
                                            value={inStock}
                                            handleValue={() =>
                                                setInStock(!inStock)
                                            }
                                        />
                                    </div>
                                </div>

                                {/* RATING */}
                                <div className="flex flex-col gap-[10px] border-b border-slate-600 pb-[15px]">
                                    <label className="text-neutral-100">
                                        Rating
                                    </label>
                                    <div className="grid grid-cols-4 gap-[10px]">
                                        {[1, 2, 3, 4].map((value, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className="flex gap-[10px]"
                                                >
                                                    <input
                                                        checked={
                                                            rating === value
                                                        }
                                                        onChange={(e) =>
                                                            setRating(
                                                                Number(
                                                                    e.target
                                                                        .value
                                                                )
                                                            )
                                                        }
                                                        type="radio"
                                                        name="radio-5"
                                                        value={value}
                                                        className="radio radio-primary"
                                                    />
                                                    <span>{value}+</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* CATEGORIES */}
                                <div className="flex flex-col gap-[10px] border-b border-slate-600 pb-[15px]">
                                    <label className="text-neutral-100">
                                        Category
                                    </label>
                                    <div className="grid grid-cols-2 gap-[10px]">
                                        {categoriesData.items.map(
                                            (item, index) => {
                                                return (
                                                    <Checkbox
                                                        key={index}
                                                        title={
                                                            item.name.split(
                                                                "Games"
                                                            )[0]
                                                        }
                                                        value={selectedCategories.includes(
                                                            item.slug
                                                        )}
                                                        handleValue={() =>
                                                            handleToggleCategory(
                                                                item.slug
                                                            )
                                                        }
                                                    />
                                                );
                                            }
                                        )}
                                    </div>
                                </div>

                                {/* PLAYERS */}
                                <div className="flex flex-col gap-[10px] border-b border-slate-600 pb-[15px]">
                                    <label className="text-neutral-100">
                                        Players
                                    </label>
                                    <RangePicker
                                        min={1}
                                        max={10}
                                        ranges={playersRange}
                                        handleValueChange={(values) =>
                                            setPlayersRange(values)
                                        }
                                        formatCurrency={false}
                                        label="Players"
                                        noMax
                                    />
                                </div>

                                {/* PLAYING TIME */}
                                <div className="flex flex-col gap-[10px] border-b border-slate-600 pb-[15px]">
                                    <label className="text-neutral-100">
                                        Playing Time
                                    </label>
                                    <RangePicker
                                        min={5}
                                        max={125}
                                        step={5}
                                        ranges={playingTime}
                                        handleValueChange={(values) =>
                                            setPlayingTime(values)
                                        }
                                        formatCurrency={false}
                                        label="Minutes"
                                        noMax
                                    />
                                </div>

                                {/* COMPLEXITY */}
                                <div className="flex flex-col gap-[10px] border-b border-slate-600 pb-[15px]">
                                    <label className="text-neutral-100">
                                        Complexity
                                    </label>
                                    <div className="grid grid-cols-4 gap-[10px]">
                                        {[1, 2, 3, 4].map((value, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className="flex gap-[10px]"
                                                >
                                                    <input
                                                        checked={
                                                            complexity === value
                                                        }
                                                        onChange={(e) =>
                                                            setComplexity(
                                                                Number(
                                                                    e.target
                                                                        .value
                                                                )
                                                            )
                                                        }
                                                        type="radio"
                                                        name="radio-4"
                                                        value={value}
                                                        className="radio radio-primary"
                                                    />
                                                    <span>{value}+</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                <button
                                    className="btn btn-primary my-[10px]"
                                    onClick={() =>
                                        setSelectedFilters({
                                            priceRange,
                                            playersRange,
                                            complexity,
                                            inStock,
                                            playingTime,
                                            selectedCategories,
                                            rating,
                                        })
                                    }
                                >
                                    Filter
                                </button>
                            </div>
                        ) : null}
                    </div>
                    <div className="col-span-9">
                        {!isLoading && data ? (
                            <div className="grid grid-cols-4 gap-[20px]">
                                {data.items.map((item, index) => {
                                    return (
                                        <ProductCard
                                            key={index}
                                            details={item}
                                            modifierClass="border-0"
                                        />
                                    );
                                })}
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CatalogPage;
