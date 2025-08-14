import { ContactInfo, ShippingMethod } from "../types";
import { Rocket, Truck, PackageCheck } from 'lucide-react';

export const appTexts = {
    title: 'Checkout Process',
    accordionPlaceholder: 'Accordion Steps Will Go Here',
    step1Title: 'Your Cart',
    step2Title: 'Shipping Information',
    step3Title: 'Shipping Method',
    step4Title: 'Payment Method',

    orderSummaryTitle: 'Order Summary',
    subtotal: 'Subtotal',
    shipping: 'Shipping',
    discount: 'Vivre Member Discount',
    total: 'Total',

    continueToDelivery: 'Continue to Delivery',
    continueToPayment: 'Continue to Payment',

    item1Name: "Drive Safe",
    item1Description: 'Telemetric device. GPS, Speed, Break Time, and more metrics are being captured by Drive Safe.',
    item2Name: "Smart Dashcam with AI Assistant",
    item2Description: 'Record your journeys in 2k and get real-time safety alerts on the road. Uses information of other drivers to let you be careful upfront.',

    loginWithVivre: 'Log in with Vivre',
    loading: 'Loading...',

    labelName: 'Full Name',
    labelEmail: 'Email',
    labelAddress: 'Address',
    labelCity: 'City',
    labelZip: 'ZIP Code',

    recommended: 'Recommended',
};

export const SHIPPING_OPTIONS: ShippingMethod[] = [
    { id: 'fast', name: 'Fast Delivery', cost: 25.00, eta: 'Tomorrow', icon: Rocket, recommended: true },
    { id: 'standard', name: 'Standard Delivery', cost: 10.00, eta: 'Next Week', icon: Truck },
    { id: 'scheduled', name: 'Scheduled Delivery', cost: 0.00, eta: 'Pick a date', icon: PackageCheck },
];

export const KATE_CRESTWELL_DATA: ContactInfo = {
    name: 'Kate Crestwell',
    email: 'kate.c@vivre.com',
    address: '123 Wellness Lane',
    city: 'San Francisco',
    zip: '94105',
};