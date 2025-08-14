import {ContactInfo, ShippingMethodI} from "../types";
import {PackageCheck, Rocket, Truck} from 'lucide-react';

export const appTexts = {
    title: 'Checkout Process',
    accordionPlaceholder: 'Accordion Steps Will Go Here',
    step1Title: 'Your Cart',
    step2Title: 'Shipping Information',
    step3Title: 'Shipping Method',
    step4Title: 'Payment Method',
    step5Title: 'Review & Confirm',

    orderSummaryTitle: 'Order Summary',
    subtotal: 'Subtotal',
    shipping: 'Shipping',
    discount: 'Vivre Member Discount',
    total: 'Total',

    continueToDelivery: 'Continue to Delivery',
    continueToPayment: 'Continue to Payment',
    payNow: 'Pay',

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

    paymentGPay: 'GPay / Apple Pay',
    paymentCard: 'Card',
    paymentCrypto: 'Crypto',

    couponLabel: 'Got a coupon? Let us know',
    couponButton: 'Apply',
    couponApplied: 'Coupon Applied!',

    cardNotImplemented: 'This payment method is not yet available.',
    labelCardNumber: 'Card Number',
    labelExpiry: 'MM/YY',
    labelCVC: 'CVC',
};

export const SHIPPING_OPTIONS: ShippingMethodI[] = [
    {id: 'fast', name: 'Fast Delivery', cost: 25.00, eta: 'Tomorrow', icon: Rocket, recommended: true},
    {id: 'standard', name: 'Standard Delivery', cost: 10.00, eta: 'Next Week', icon: Truck},
    {id: 'scheduled', name: 'Scheduled Delivery', cost: 0.00, eta: 'Pick a date', icon: PackageCheck},
];

export const KATE_CRESTWELL_DATA: ContactInfo = {
    name: 'Kate Crestwell',
    email: 'kate.c@vivre.com',
    address: '123 Wellness Lane',
    city: 'San Francisco',
    zip: '94105',
};