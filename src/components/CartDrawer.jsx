import { ShoppingCart } from "lucide-react";
import { useCartState } from "../store/cart-store";

const CartDrawer = () => {
    const isCartOpen = useCartState((state) => state.isCartOpen);
    const setIsCartOpen = useCartState((state) => state.setIsCartOpen);

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
                <ul className="menu bg-base-200 text-base-content min-h-full p-4 w-[450px]">
                    {/* Sidebar content here */}
                    <li>
                        <a>Sidebar Item 1</a>
                    </li>
                    <li>
                        <a>Sidebar Item 2</a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default CartDrawer;
