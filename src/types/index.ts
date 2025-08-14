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

export interface ContactInfo {
    name: string;
    email: string;
    address: string;
    city: string;
    zip: string;
}

export interface OrderData {
    items: CartItem[];
    subtotal: number;
    shipping: ShippingMethod;
    discount: Discount;
    total: number;
    contactInfo?: ContactInfo;
    isVivreMember: boolean;
}