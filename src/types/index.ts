import { LucideProps } from 'lucide-react';
import React from 'react';

export interface CartItem {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    color: string;
    availableColors: string[];
}

export interface ShippingMethodI {
    id: string;
    name: string;
    cost: number;
    eta: string;
    icon: React.FC<LucideProps>;
    recommended?: boolean;
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
    shipping: ShippingMethodI;
    discount: Discount;
    total: number;
    contactInfo?: ContactInfo;
    isVivreMember: boolean;
}