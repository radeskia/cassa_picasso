import { ShoppingCart } from "lucide-react";
import { useCartState, useCartStore } from "../store/cart-store";

const CartDrawer = () => {
    const isCartOpen = useCartState((state) => state.isCartOpen);
    const setIsCartOpen = useCartState((state) => state.setIsCartOpen);
    const cartItems = useCartStore((state) => state.cartItems);
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
                <div className="menu bg-base-200 text-base-content min-h-full p-4 w-[450px] flex flex-col justify-between">
                    <div>
                        <h1 className="mb-[20px] text-xl font-semibold">
                            My Cart
                        </h1>
                        {/* CART ITEM CARD */}
                        {cartItems.map((item, index) => {
                            return (
                                <a
                                    href={`/shop/${item.slug}`}
                                    key={index}
                                    className={`flex justify-between items-center ${index !== cartItems.length - 1 ? "mb-[20px] pb-[20px] border-b" : ""}`}
                                >
                                    <img
                                        src={item.image}
                                        className="max-h-[80px]"
                                    />
                                    <span>{item.name}</span>
                                    <span>{item.price}</span>
                                    <span>{item.amount}</span>
                                </a>
                            );
                        })}
                    </div>
                    <div className="btn btn-accent">Checkout</div>
                </div>
            </div>
        </div>
    );
};

export default CartDrawer;
