export interface Product {
    category: string;
    price: string;
    stocked: boolean;
    name: string;
}

export type Products = Array<Product>;
