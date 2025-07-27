import { Link } from "react-router-dom";
import { cn } from "../../../lib/utils";

const ProductCard = ({ details, modifierClass }) => {
    const primaryImage = details.images.find((item) => item.isPrimary);
    return (
        <Link
            to={`/product/${details.slug}`}
            className={cn(
                "flex flex-col px-[30px] py-[30px] border border-slate-700 rounded-md grow justify-between gap-[20px]",
                modifierClass
            )}
        >
            <div className="flex justify-center items-center">
                {primaryImage ? <img src={primaryImage.url} /> : null}
            </div>
            <div className="flex flex-col gap-[5px]">
                <div className="text-2xl font-medium">{details.name}</div>
                <div className="mb-[10px] text-white text-lg">
                    ${details.price}
                </div>
                <button className="btn btn-secondary text-neutral-100 font-bold uppercase">
                    Add to cart
                </button>
            </div>
        </Link>
    );
};

export default ProductCard;
