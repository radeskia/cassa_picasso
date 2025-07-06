import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItemModel {
    product_id: number;
    price: number;
    amount: number;
    name: string;
    slug: string;
    image: string;
}

export interface CartStoreState {
    cartItems: CartItemModel[];
    addItemToCart: (item: CartItemModel) => void;
    removeItemFromCart: (product_id: number) => void;
    increaseAmount: (product_id: number) => void;
    decreaseAmount: (product_id: number) => void;
    modifyAmount: (product_id: number, newAmount: number) => void;
    clearCart: () => void;
}

const STORAGE_IDENTIFIER = "CART_STORAGE";

export const useCartStore = create<CartStoreState>()(
    persist(
        (set) => ({
            cartItems: [],

            addItemToCart: (item: CartItemModel) =>
                set((state) => {
                    const existingItem = state.cartItems.find(
                        (cartItem) => cartItem.product_id === item.product_id
                    );
                    if (existingItem) {
                        return {
                            cartItems: state.cartItems.map((cartItem) =>
                                cartItem.product_id === item.product_id
                                    ? {
                                          ...cartItem,
                                          amount: cartItem.amount + 1,
                                      }
                                    : {
                                          ...cartItem,
                                          id: Date.now(),
                                      }
                            ),
                        };
                    }
                    return {
                        cartItems: [
                            ...state.cartItems,
                            {
                                ...item,
                                amount: 1,
                            },
                        ],
                    };
                }),

            removeItemFromCart: (product_id) =>
                set((state) => ({
                    cartItems: state.cartItems.filter(
                        (item) => item.product_id !== product_id
                    ),
                })),

            increaseAmount: (product_id) =>
                set((state) => ({
                    cartItems: state.cartItems.map((item) =>
                        item.product_id === product_id
                            ? { ...item, amount: item.amount + 1 }
                            : item
                    ),
                })),

            decreaseAmount: (product_id) =>
                set((state) => ({
                    cartItems: state.cartItems.map((item) =>
                        item.product_id === product_id && item.amount > 1
                            ? { ...item, amount: item.amount - 1 }
                            : item
                    ),
                })),

            modifyAmount: (variant_id, newAmount) =>
                set((state) => ({
                    cartItems: state.cartItems.map((item) =>
                        item.product_id === variant_id
                            ? { ...item, amount: newAmount }
                            : item
                    ),
                })),

            clearCart: () => set(() => ({ cartItems: [] })),
        }),
        {
            name: STORAGE_IDENTIFIER,
        }
    )
);

interface CartOpenState {
    isCartOpen: boolean;
    setIsCartOpen: (value: boolean) => void;
}

export const useCartState = create<CartOpenState>((set) => ({
    isCartOpen: false,
    setIsCartOpen: (value) => set({ isCartOpen: value }),
}));
