import { create } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie";
import { SHOP_DATA } from "../data/shop-data";

const cookieStorage = {
    getItem: (name) => {
        const value = Cookies.get(name);
        return value ? JSON.parse(value) : undefined;
    },
    setItem: (name, value) => {
        // TODO: Expires?
        Cookies.set(name, JSON.stringify(value), {
            expires: 365,
            path: "/",
            sameSite: "None",
            secure: true,
        });
    },
    removeItem: (name) => {
        Cookies.remove(name);
    },
};

const COOKIE_NAME = "CART_STORAGE";

export const useCartStore = create()(
    persist(
        (set) => ({
            cartItems: [],

            addItemToCart: (item) =>
                set((state) => {
                    const existingItem = state.cartItems.find(
                        (cartItem) =>
                            cartItem.product_id === item.product_id &&
                            cartItem.variant_id === item.variant_id
                    );
                    if (existingItem) {
                        return {
                            cartItems: state.cartItems.map((cartItem) =>
                                cartItem.product_id === item.product_id &&
                                cartItem.variant_id === item.variant_id
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

            removeItemFromCart: (variant_id) =>
                set((state) => ({
                    cartItems: state.cartItems.filter(
                        (item) => item.variant_id !== variant_id
                    ),
                })),

            increaseAmount: (variant_id) =>
                set((state) => ({
                    cartItems: state.cartItems.map((item) =>
                        item.variant_id === variant_id
                            ? { ...item, amount: item.amount + 1 }
                            : item
                    ),
                })),

            decreaseAmount: (variant_id) =>
                set((state) => ({
                    cartItems: state.cartItems.map((item) =>
                        item.variant_id === variant_id && item.amount > 1
                            ? { ...item, amount: item.amount - 1 }
                            : item
                    ),
                })),

            modifyAmount: (variant_id, newValue) =>
                set((state) => ({
                    cartItems: state.cartItems.map((item) =>
                        item.variant_id === variant_id
                            ? { ...item, amount: newValue }
                            : item
                    ),
                })),

            toggleSubscription: (variant_id) =>
                set((state) => {
                    const originalProduct = SHOP_DATA.find(
                        (item) =>
                            item.product_id ===
                            state.cartItems.find(
                                (cartItem) => cartItem.variant_id === variant_id
                            ).product_id
                    );

                    const originalVariantId = state.cartItems.find(
                        (item) => item.variant_id === variant_id
                    )?.variant_id;

                    const originalVariant = originalProduct.variants.find(
                        (item) => item.variant_id === originalVariantId
                    );

                    // Comparison Values
                    const isSubscription = originalVariant.is_subscription;
                    const originalVariantQuantity =
                        originalVariant.variant_quantity;
                    const originalVariantAmount = state.cartItems.find(
                        (item) => item.variant_id === variant_id
                    ).amount;

                    const replacementVariant = originalProduct.variants.find(
                        (item) => {
                            return isSubscription
                                ? item.variant_quantity ===
                                      originalVariantQuantity &&
                                      !item.is_subscription
                                : item.variant_quantity ===
                                      originalVariantQuantity &&
                                      item.is_subscription;
                        }
                    );

                    // Logic for same product but different variants merging when both are present in the cart and one is toggled
                    if (
                        state.cartItems.findIndex(
                            (item) =>
                                item.product_id ===
                                    originalProduct.product_id &&
                                item.variant_id ===
                                    replacementVariant.variant_id
                        ) >= 0
                    ) {
                        const foundExistingVariantAmount =
                            state.cartItems.find(
                                (item) =>
                                    item.product_id ===
                                        originalProduct.product_id &&
                                    item.variant_id ===
                                        replacementVariant.variant_id
                            )?.amount ?? 0;
                        const mergedAmount =
                            foundExistingVariantAmount + originalVariantAmount;

                        return {
                            cartItems: state.cartItems
                                .filter(
                                    (item) => item.variant_id !== variant_id
                                )
                                .map((item) =>
                                    item.product_id ===
                                        originalProduct.product_id &&
                                    item.variant_id ===
                                        replacementVariant.variant_id
                                        ? { ...item, amount: mergedAmount }
                                        : item
                                ),
                        };
                    }

                    let newCartItems = [...state.cartItems];

                    const oldIndex = newCartItems.findIndex(
                        (item) => item.variant_id === variant_id
                    );

                    newCartItems[oldIndex] = {
                        product_id: originalProduct.product_id,
                        variant_id: replacementVariant.variant_id,
                        amount: state.cartItems[oldIndex].amount,
                    };

                    return {
                        cartItems: newCartItems,
                    };
                }),
            clearCart: () => set(() => ({ cartItems: [] })),

            addItemPartial: (item) =>
                set((state) => {
                    const existingItem = state.cartItems.find(
                        (cartItem) => cartItem.variant_id === item.variant_id
                    );

                    const originalProduct = SHOP_DATA.find((shopItem) =>
                        shopItem.variants.some(
                            (variant) => variant.variant_id === item.variant_id
                        )
                    );

                    if (existingItem) {
                        return {
                            cartItems: state.cartItems.map((cartItem) =>
                                cartItem.variant_id === item.variant_id
                                    ? {
                                          ...cartItem,
                                          amount: cartItem.amount + 1,
                                      }
                                    : {
                                          ...cartItem,
                                      }
                            ),
                        };
                    }
                    return {
                        cartItems: [
                            ...state.cartItems,
                            {
                                ...item,
                                product_id: originalProduct.product_id,
                                amount: 1,
                            },
                        ],
                    };
                }),
        }),
        {
            name: COOKIE_NAME,
            storage: cookieStorage,
        }
    )
);

export const useCartState = create((set) => ({
    isCartOpen: false,
    setIsCartOpen: (value) => set({ isCartOpen: value }),
}));
