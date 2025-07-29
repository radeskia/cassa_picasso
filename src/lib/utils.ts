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

export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};
