export interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    createdDateTime: Date;
    categories: Category[];
    variants: Variant[];
}

export interface Category {
    id: number;
    name: string;
    slug: string;
    createdDateTime: Date;
    productsCount: number;
}

export interface Variant {
    id: number;
    name: string;
    slug: string;
    image: string;
    price: number;
    stock: number;
    isPrimary: boolean;
    createdDateTime: Date;
    productId: number;
}
