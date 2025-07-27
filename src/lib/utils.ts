import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

// Simulate slow loading times & suspense tests
export const sleep = async (time) => {
    await new Promise((resolve) => {
        setTimeout(() => resolve(""), time);
    });
};
