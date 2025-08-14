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

export interface VivreDiscount {
    applied: boolean;
    discountPercentage: number;
}

export interface Coupon {
    code: string;
    discountPercentage: number;
}

export interface ContactInfo {
    name: string;
    email: string;
    address: string;
    city: string;
    zip: string;
    phone: string;
}

export interface OrderData {
    items: CartItem[];
    subtotal: number;
    shipping: ShippingMethodI;
    vivreDiscount: VivreDiscount;
    coupon?: Coupon;
    total: number;
    contactInfo?: ContactInfo;
    paymentMethod: string;
    trackingNumber: string;
    estimatedArrival: string;
}