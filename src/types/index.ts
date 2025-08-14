export interface CartItem {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    color: string;
    availableColors: string[];
}

export interface ShippingMethod {
    name: string;
    cost: number;
}

export interface Discount {
    name: string;
    amount: number;
}

export interface OrderData {
    items: CartItem[];
    subtotal: number;
    shipping: ShippingMethod;
    discount: Discount;
    total: number;
}