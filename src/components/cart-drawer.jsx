import { ShoppingCart } from "lucide-react";
import { useCartState, useCartStore } from "../store/cart-store";
import CartItem from "./cart-item";

const CartDrawer = () => {
    const isCartOpen = useCartState((state) => state.isCartOpen);
    const setIsCartOpen = useCartState((state) => state.setIsCartOpen);
    const cartItems = useCartStore((state) => state.cartItems);

    const cartTotal = cartItems.reduce((acc, curr) => {
        return curr.amount * curr.price + acc;
    }, 0);

    return (
        <div className="drawer drawer-end max-w-[200px]">
            <input
                id="my-drawer-4"
                type="checkbox"
                className="drawer-toggle"
                checked={isCartOpen}
                readOnly
            />
            <div className="drawer-content">
                <label
                    htmlFor="my-drawer-4"
                    className="btn btn-primary w-[40px] h-[40px] p-[5px] m-0 rounded-lg min-h-[40px]"
                    onClick={() => setIsCartOpen(true)}
                >
                    <ShoppingCart width={22} height={22} />
                </label>
            </div>
            <div className="drawer-side">
                <label
                    htmlFor="my-drawer-4"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                    onClick={() => setIsCartOpen(false)}
                ></label>
                <div className="menu bg-base-200 text-base-content min-h-full px-4 py-8 w-[450px] flex flex-col justify-between">
                    <div>
                        <h1 className="mb-[40px] text-xl font-semibold text-slate-300">
                            My Cart
                        </h1>
                        {/* CART ITEM CARD */}
                        <div className="px-[10px]">
                            {cartItems.map((item, index) => {
                                return (
                                    <CartItem
                                        product={item}
                                        key={index}
                                        isLast={index === cartItems.length - 1}
                                    />
                                );
                            })}
                        </div>
                    </div>
                    <div className="flex flex-col gap-[20px]">
                        <div className="flex justify-between">
                            <div className="text-2xl text-slate-200">
                                Subtotal:
                            </div>
                            <div className="text-2xl text-slate-100 font-semibold tracking-wide">
                                ${cartTotal.toFixed(2)}
                            </div>
                        </div>
                        <div className="btn btn-primary">Checkout</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartDrawer;
