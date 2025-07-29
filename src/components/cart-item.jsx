import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import { useCartStore } from "../store/cart-store";

const CartItem = ({ product, isLast }) => {
    const increaseAmount = useCartStore((state) => state.increaseAmount);
    const decreaseAmount = useCartStore((state) => state.decreaseAmount);
    const removeItemFromCart = useCartStore(
        (state) => state.removeItemFromCart
    );

    return (
        <div
            href={`/shop/${product.slug}`}
            className={`grid grid-cols-12 ${!isLast ? "mb-[20px] pb-[20px] border-b border-slate-600" : ""}`}
        >
            <img src={product.image} className="max-h-[80px] col-span-4" />
            <div className="col-span-6">
                <div className="flex flex-col justify-center gap-[10px]">
                    <div>{product.name}</div>
                    <div className="flex gap-[5px] items-center text-lg bg-slate-700 w-fit rounded-md py-1">
                        <span
                            className="border-r border-slate-400 px-2 rounded-sm cursor-pointer"
                            onClick={() => decreaseAmount(product.id)}
                        >
                            <MinusIcon size={20} />
                        </span>
                        <span className="text-xl px-[10px] text-slate-200">
                            {product.amount}
                        </span>
                        <span
                            className="border-l border-slate-400 px-2 rounded-sm cursor-pointer"
                            onClick={() => increaseAmount(product.id)}
                        >
                            <PlusIcon size={20} />
                        </span>
                    </div>
                </div>
            </div>
            <div className="col-span-2">
                <div className="flex flex-col justify-between items-end h-full w-full text-slate-500">
                    <span
                        onClick={() => removeItemFromCart(product.id)}
                        className="cursor-pointer"
                    >
                        <TrashIcon size={20} />
                    </span>
                    <span className="text-lg font-semibold text-slate-100 mb-2">
                        ${product.price}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
