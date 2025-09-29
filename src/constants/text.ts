import {ShippingMethodI} from "../types";
import {ReactComponent as BoxSvg} from '../assets/icons/box.svg';
import {ReactComponent as DroneSvg} from '../assets/icons/drone.svg';
import {ReactComponent as TruckSvg} from '../assets/icons/truck.svg';
import {Car, HeartPulse} from "lucide-react";


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
    continueToShippingMethod: 'Continue to Shipping Method',
    continueToPayment: 'Continue to Payment',
    paySecurely: 'Pay Securely',

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
    labelPhone: 'Phone',

    recommended: 'Recommended',
    droneInfo: 'Please ensure a clear, private green space (e.g., a garden or yard) is available for the drone to land safely.',

    paymentGPay: 'GPay / Apple Pay',
    paymentCard: 'Card',
    paymentBNPL: 'BNPL',
    paymentCrypto: 'Crypto',

    couponLabel: 'Got a coupon? Let us know',
    couponButton: 'Apply',
    couponApplied: 'Coupon Applied!',

    confirmationTitle: 'Congratulations!',
    confirmationSubtitle: 'Your package is on its way.',
    trackingNumber: 'Tracking Number',
    estimatedArrival: 'Estimated Arrival',
    goToHomepage: 'Go to Homepage',
    googlePayNotSupported: 'Google Pay is not supported on this browser.',

    driveSafeBundleTitle: 'Drive Safe Bundle',
    driveSafeBundleDescription: 'Focus on safety and telemetrics for your vehicle.',
    healthBundleTitle: 'Health & Wellness Bundle',
    healthBundleDescription: 'Monitor your well-being on the go.',
};

export const SHIPPING_OPTIONS: ShippingMethodI[] = [
    {id: 'fast', name: 'Fast Delivery', cost: 27.99, eta: 'Tomorrow', icon: DroneSvg, recommended: true},
    {id: 'standard', name: 'Standard Delivery', cost: 9.99, eta: 'Next Week', icon: TruckSvg},
    {id: 'scheduled', name: 'Scheduled Delivery', cost: 5.99, eta: 'Pick a date', icon: BoxSvg},
];

export const VIVRE_MEMBER_DATA = {
    name: "Kate Crestwell",
    email: "kchrestwell@gmail.com",
    address: "10 Downing Street, London",
    city: "London",
    zip: "SW1A 2AA",
    phone: "(020) 1234 4321"
};

export const CURRENCIES = {
    GBP: '£',
    EUR: '€'
};

export const EXCHANGE_RATE_EUR = 1.18;

export const DRIVE_SAFE_BUNDLE_ITEMS = [
    {
        id: 1,
        name: appTexts.item1Name,
        description: appTexts.item1Description,
        price: 59.99,
        image: `${process.env.PUBLIC_URL}/cart-images/Telemetry.jpg`,
        color: '#000000',
        availableImages: {
            '#000000': `${process.env.PUBLIC_URL}/cart-images/Telemetry.jpg`,
            '#FFFFFF': `${process.env.PUBLIC_URL}/cart-images/Telemetry-white.jpg`
        }
    },
    {
        id: 2,
        name: appTexts.item2Name,
        description: appTexts.item2Description,
        price: 119.99,
        image: `${process.env.PUBLIC_URL}/cart-images/Dashcam.jpg`,
        color: '#000000',
        availableImages: {
            '#000000': `${process.env.PUBLIC_URL}/cart-images/Dashcam.jpg`,
            '#FFFFFF': `${process.env.PUBLIC_URL}/cart-images/Dashcam-white.jpg`
        }
    },
];

export const HEALTH_BUNDLE_ITEMS = [
    {
        id: 3,
        name: 'Blood Pressure Monitor',
        description: 'A home health monitoring system. Tracks blood pressure and stress levels.',
        price: 89.99,
        image: `./cart-images/blood-pressure.jpg`,
        color: '#FFFFFF',
        availableImages: {
            '#FFFFFF': `./cart-images/blood-pressure.jpg`,
            '#000000': `./cart-images/Telemetry.jpg`
        }
    },
    {
        id: 4,
        name: 'Blood Oxygen Sensor',
        description: 'Measures and monitors your blood oxygen levels to ensure a healthy lifestyle.',
        price: 79.99,
        image: `./cart-images/blood-oxygen.jpeg`,
        color: '#FFFFFF',
        availableImages: {
            '#FFFFFF': `./cart-images/blood-oxygen.jpeg`,
            '#000000': `./cart-images/Dashcam.jpg`
        }
    },
];

export const BUNDLES = [
    {
        id: 'drive',
        title: appTexts.driveSafeBundleTitle,
        description: appTexts.driveSafeBundleDescription,
        icon: Car,
        items: DRIVE_SAFE_BUNDLE_ITEMS
    },
    {
        id: 'health',
        title: appTexts.healthBundleTitle,
        description: appTexts.healthBundleDescription,
        icon: HeartPulse,
        items: HEALTH_BUNDLE_ITEMS
    }
];