import { Link } from "react-router-dom";
import { cn } from "../../../../lib/utils";

const AdminProductCard = ({ details, modifierClass }) => {
    const primaryImage = details.images.find((item) => item.isPrimary);
    return (
        <div
            className={cn(
                "flex flex-col px-[30px] py-[30px] border border-slate-700 rounded-md justify-between gap-[5px] hover:bg-slate-800",
                modifierClass
            )}
        >
            <div>
                <div className="flex justify-center items-center">
                    {primaryImage ? <img src={primaryImage.url} /> : null}
                </div>
                <div className="text-2xl font-medium mt-[20px]">
                    {details.name}
                </div>
                <div className="mb-[10px] text-white text-lg">
                    ${details.price}
                </div>
            </div>

            <Link
                to={`/admin/products/${details.slug}/edit`}
                className="btn btn-secondary text-neutral-100 font-bold uppercase"
            >
                Edit
            </Link>
        </div>
    );
};

export default AdminProductCard;
