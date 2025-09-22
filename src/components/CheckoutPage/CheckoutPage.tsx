import React, {ReactNode, useEffect, useMemo, useState} from 'react';
import styled from 'styled-components';
import {AnimatePresence, AnimatePresenceProps} from 'framer-motion';
import {addDays, format} from 'date-fns';
import {appTexts, SHIPPING_OPTIONS, VIVRE_MEMBER_DATA} from '../../constants/text';
import {ContactInfo, Coupon, Currency, OrderData, ShippingMethodI} from '../../types';
import AccordionStep from '../Accordion/AccordionStep';
import {OrderSummary} from '../OrderSummary/OrderSummary';
import {YourCart} from '../Steps/YourCart/YourCart';
import {DeliveryInfo} from '../Steps/ShippingInformation/DeliveryInfo';
import {ShippingMethod} from '../Steps/ShippingMethod/ShippingMethod';
import {Payment} from '../Steps/Payment/Payment';
import {ConfirmationModal} from '../ConfirmationModal/ConfirmationModal';
import {LoginModal} from "../LoginModal/LoginModal";

type SafeAnimatePresenceProps = AnimatePresenceProps & {
    children: ReactNode;
};

const SafeAnimatePresence = AnimatePresence as React.FC<SafeAnimatePresenceProps>;

const PageContainer = styled.div`
    background-color: ${({theme}) => theme.colors.bgSubtle};
    min-height: 100vh;
    padding: 2rem;
`;

const CheckoutGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;

    @media (min-width: 1024px) {
        grid-template-columns: 3fr 2fr;
    }
`;

const LeftColumn = styled.div`
    width: 100%;
`;

const RightColumn = styled.div`
    width: 100%;

    @media (min-width: 1024px) {
        position: sticky;
        top: 20px;
        align-self: start;
    }
`;

const steps = [
    {id: 1, title: appTexts.step1Title},
    {id: 2, title: appTexts.step2Title},
    {id: 3, title: appTexts.step3Title},
    {id: 4, title: appTexts.step4Title},
];

const standardShippingDefault = SHIPPING_OPTIONS.find(option => option.id === 'standard') || SHIPPING_OPTIONS[0];

const initialOrderData: OrderData = {
    items: [
        {
            id: 1,
            name: appTexts.item1Name,
            description: appTexts.item1Description,
            price: 59.99,
            image: `${process.env.PUBLIC_URL}/cart-images/Telemetry.jpg`,
            color: '#000000',
            availableColors: ['#000000', '#FFFFFF'],
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
            availableColors: ['#000000', '#FFFFFF'],
            availableImages: {
                '#000000': `${process.env.PUBLIC_URL}/cart-images/Dashcam.jpg`,
                '#FFFFFF': `${process.env.PUBLIC_URL}/cart-images/Dashcam-white.jpg`
            }
        },
    ],
    subtotal: 179.98,
    shipping: standardShippingDefault,
    vivreDiscount: {applied: false, discountPercentage: 0.30},
    total: 179.98 + standardShippingDefault.cost,
    contactInfo: {name: '', email: '', address: '', city: '', zip: '', phone: ''},
    paymentMethod: 'card',
    trackingNumber: 'VIV-123-XYZ',
    estimatedArrival: 'August 15, 2025',
    scheduledDate: undefined,
    currency: 'GBP',
};

const isContactInfoValid = (contactInfo: ContactInfo): boolean => {
    return Object.values(contactInfo).every(value => value.trim() !== '');
};

const getEstimatedArrivalText = (shippingOption: ShippingMethodI, scheduledDate?: Date): string => {
    const today = new Date();
    switch (shippingOption.id) {
        case 'fast':
            return `Tomorrow, ${format(addDays(today, 1), 'dd MMM')}`;
        case 'standard':
            const startDate = format(addDays(today, 5), 'dd');
            const endDate = format(addDays(today, 6), 'dd MMM');
            return `${startDate} - ${endDate}`;
        case 'scheduled':
            return scheduledDate ? format(scheduledDate, 'dd MMM yyyy') : 'A future date';
        default:
            return shippingOption.eta;
    }
};

export const CheckoutPage = () => {
    const [activeStep, setActiveStep] = useState(1);
    const [highestCompletedStep, setHighestCompletedStep] = useState(0);
    const [orderData, setOrderData] = useState<OrderData>(initialOrderData);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [currency, setCurrency] = useState<Currency>('GBP');


    const isDeliveryFormValid = useMemo(() => isContactInfoValid(orderData.contactInfo!), [orderData.contactInfo]);

    useEffect(() => {
        const subtotal = orderData.items.reduce((acc, item) => acc + item.price, 0);
        const memberDiscount = orderData.vivreDiscount.applied ? subtotal * orderData.vivreDiscount.discountPercentage : 0;
        const couponDiscount = orderData.coupon ? (subtotal - memberDiscount) * orderData.coupon.discountPercentage : 0;
        const total = subtotal + orderData.shipping.cost - memberDiscount - couponDiscount;

        setOrderData(prev => ({
            ...prev,
            subtotal,
            total,
            currency
        }));
    }, [orderData.items, orderData.shipping.cost, orderData.vivreDiscount, orderData.coupon, currency]);

    const handleToggle = (stepId: number) => {
        if (stepId > highestCompletedStep + 1) {
            return;
        }
        setActiveStep(activeStep === stepId ? 0 : stepId);
    };

    const handleContinueFromCart = () => {
        setHighestCompletedStep(prev => Math.max(prev, 1));
        setActiveStep(2);
    };

    const handleContinueFromDelivery = () => {
        if (!isDeliveryFormValid) return;
        setHighestCompletedStep(prev => Math.max(prev, 2));
        setActiveStep(3);
    };

    const handleContinueFromShipping = () => {
        setHighestCompletedStep(prev => Math.max(prev, 3));
        setActiveStep(4);
    };

    const handleColorChange = (itemId: number, newColor: string) => {
        setOrderData((prev) => ({
            ...prev,
            items: prev.items.map((item) => {
                if (item.id === itemId) {
                    return {
                        ...item,
                        color: newColor,
                        image: item.availableImages[newColor] || item.image,
                    };
                }
                return item;
            }),
        }));
    };

    const handleRemoveItem = (itemId: number) => {
        setOrderData(prev => ({
            ...prev,
            items: prev.items.filter(item => item.id !== itemId)
        }));
    };

    const handleContactInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setOrderData((prev) => ({
            ...prev,
            contactInfo: {
                ...prev.contactInfo!,
                [name]: value,
            }
        }));
    };

    const handleVivreLoginSuccess = () => {
        setOrderData(prev => ({
            ...prev,
            contactInfo: VIVRE_MEMBER_DATA,
            vivreDiscount: {...prev.vivreDiscount, applied: true},
        }));
        setHighestCompletedStep(prev => Math.max(prev, 2));
        setIsLoginModalOpen(false);
    };

    const handleLogout = () => {
        setOrderData(prev => ({
            ...prev,
            contactInfo: initialOrderData.contactInfo,
            vivreDiscount: {...prev.vivreDiscount, applied: false},
        }));
        setHighestCompletedStep(1);
    };

    const handleShippingChange = (shippingMethod: ShippingMethodI) => {
        setOrderData(prev => ({...prev, shipping: shippingMethod}));
    }

    const handleDateChange = (date: Date) => {
        setOrderData(prev => ({...prev, scheduledDate: date}));
    }

    const handlePaymentMethodChange = (method: string) => {
        setOrderData(prev => ({...prev, paymentMethod: method}));
    }

    const handleApplyCoupon = (code: string) => {
        if (code.toUpperCase() === 'VIVRE50') {
            const newCoupon: Coupon = {code: 'Vivre50', discountPercentage: 0.50};
            setOrderData(prev => ({...prev, coupon: newCoupon}));
        }
    }

    const handleCompleteOrder = () => {
        const estimatedArrival = getEstimatedArrivalText(orderData.shipping, orderData.scheduledDate);
        setOrderData(prev => ({...prev, estimatedArrival}));

        setIsProcessingPayment(true);
        setTimeout(() => {
            setIsProcessingPayment(false);
            setShowConfirmation(true);
        }, 1500);
    }

    const handleCloseConfirmation = () => {
        setShowConfirmation(false);
    }

    const handleCurrencyChange = (newCurrency: Currency) => {
        setCurrency(newCurrency);
    };


    const getStepContent = (stepId: number) => {
        switch (stepId) {
            case 1:
                return (
                    <YourCart
                        items={orderData.items}
                        onColorChange={handleColorChange}
                        onRemoveItem={handleRemoveItem}
                        onContinue={handleContinueFromCart}
                        currency={currency}
                    />
                );
            case 2:
                return (
                    <DeliveryInfo
                        contactInfo={orderData.contactInfo!}
                        isLoggedIn={orderData.vivreDiscount.applied}
                        onInfoChange={handleContactInfoChange}
                        onVivreLogin={() => setIsLoginModalOpen(true)}
                        onLogout={handleLogout}
                        onContinue={handleContinueFromDelivery}
                        isFormValid={isDeliveryFormValid}
                    />
                );
            case 3:
                return <ShippingMethod
                    selectedShippingId={orderData.shipping.id}
                    onSelectShipping={handleShippingChange}
                    selectedDate={orderData.scheduledDate}
                    onDateChange={handleDateChange}
                    onContinue={handleContinueFromShipping}
                    currency={currency}
                />;
            case 4:
                return <Payment
                    orderData={orderData}
                    isProcessing={isProcessingPayment}
                    onPaymentMethodChange={handlePaymentMethodChange}
                    onApplyCoupon={handleApplyCoupon}
                    appliedCouponCode={orderData.coupon?.code}
                    onComplete={handleCompleteOrder}
                    currency={currency}
                />;
            default:
                return null;
        }
    };

    return (
        <>
            <PageContainer>
                <CheckoutGrid>
                    <LeftColumn>
                        <SafeAnimatePresence initial={false}>
                            {steps.map((step) => (
                                <AccordionStep
                                    key={step.id}
                                    title={step.title}
                                    stepNumber={step.id}
                                    isActive={activeStep === step.id}
                                    isCompleted={step.id <= highestCompletedStep}
                                    isLocked={step.id > highestCompletedStep + 1}
                                    onToggle={() => handleToggle(step.id)}
                                >
                                    {getStepContent(step.id)}
                                </AccordionStep>
                            ))}
                        </SafeAnimatePresence>
                    </LeftColumn>
                    <RightColumn>
                        <OrderSummary
                            orderData={orderData}
                            onCurrencyChange={handleCurrencyChange}
                        />
                    </RightColumn>
                </CheckoutGrid>
            </PageContainer>

            <SafeAnimatePresence>
                {isLoginModalOpen && (
                    <LoginModal
                        onLoginSuccess={handleVivreLoginSuccess}
                        onClose={() => setIsLoginModalOpen(false)}
                    />
                )}
            </SafeAnimatePresence>

            <SafeAnimatePresence>
                {showConfirmation && (
                    <ConfirmationModal
                        trackingNumber={orderData.trackingNumber}
                        estimatedArrival={orderData.estimatedArrival}
                        onClose={handleCloseConfirmation}
                    />
                )}
            </SafeAnimatePresence>
        </>
    );
};