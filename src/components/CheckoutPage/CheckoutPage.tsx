import React, { useState, ReactNode } from 'react';
import styled from 'styled-components';
import { AnimatePresence, AnimatePresenceProps } from 'framer-motion';
import { appTexts, KATE_CRESTWELL_DATA } from '../../constants/text';
import { OrderData } from '../../types';
import AccordionStep from '../Accordion/AccordionStep';
import { OrderSummary } from '../OrderSummary/OrderSummary';
import { StepYourCart } from '../Steps/YourCart/StepYourCart';
import { StepDeliveryInfo } from '../Steps/ShippingInformation/StepDeliveryInfo';

type SafeAnimatePresenceProps = AnimatePresenceProps & {
    children: ReactNode;
};

const SafeAnimatePresence = AnimatePresence as React.FC<SafeAnimatePresenceProps>;

const PageContainer = styled.div`
    background-color: ${({ theme }) => theme.colors.bgSubtle};
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
        grid-template-columns: 3fr 2fr; /* 60/40 split */
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
    { id: 1, title: appTexts.step1Title },
    { id: 2, title: appTexts.step2Title },
    { id: 3, title: appTexts.step3Title },
];

const initialOrderData: OrderData = {
    items: [
        {
            id: 1,
            name: appTexts.item1Name,
            description: appTexts.item1Description,
            price: 0.0,
            image: 'https://via.placeholder.com/80',
            color: '#000000',
            availableColors: ['#000000', '#FFFFFF'],
        },
        {
            id: 2,
            name: appTexts.item2Name,
            description: appTexts.item2Description,
            price: 120.0,
            image: 'https://via.placeholder.com/80',
            color: '#808080',
            availableColors: ['#808080', '#000000'],
        },
    ],
    subtotal: 120.0,
    shipping: { name: 'Standard', cost: 0.0 },
    discount: { name: appTexts.discount, amount: 20.0 },
    total: 100.0,
    contactInfo: { name: '', email: '', address: '', city: '', zip: '' },
    isVivreMember: false,
};

export const CheckoutPage = () => {
    const [activeStep, setActiveStep] = useState(1);
    const [orderData, setOrderData] = useState<OrderData>(initialOrderData);
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const handleToggle = (stepId: number) => {
        setActiveStep(activeStep === stepId ? 0 : stepId);
    };

    const handleContinue = (nextStep: number) => {
        setActiveStep(nextStep);
    };

    const handleColorChange = (itemId: number, newColor: string) => {
        setOrderData((prev) => ({
            ...prev,
            items: prev.items.map((item) =>
                item.id === itemId ? { ...item, color: newColor } : item
            ),
        }));
    };

    const handleContactInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setOrderData((prev) => ({
            ...prev,
            contactInfo: {
                ...prev.contactInfo!,
                [name]: value,
            }
        }));
    };

    const handleVivreLogin = () => {
        setIsLoggingIn(true);
        setTimeout(() => {
            setOrderData(prev => ({
                ...prev,
                contactInfo: KATE_CRESTWELL_DATA,
                isVivreMember: true,
            }));
            setIsLoggingIn(false);
            handleContinue(3);
        }, 1500);
    }

    const getStepContent = (stepId: number) => {
        switch (stepId) {
            case 1:
                return (
                    <StepYourCart
                        items={orderData.items}
                        onColorChange={handleColorChange}
                        onContinue={() => handleContinue(2)}
                    />
                );
            case 2:
                return (
                    <StepDeliveryInfo
                        contactInfo={orderData.contactInfo!}
                        loading={isLoggingIn}
                        onInfoChange={handleContactInfoChange}
                        onVivreLogin={handleVivreLogin}
                        onContinue={() => handleContinue(3)}
                    />
                );
            case 3:
                return <p>Content for {appTexts.step3Title}</p>;
            default:
                return null;
        }
    };

    return (
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
                                isCompleted={activeStep > step.id}
                                onToggle={() => handleToggle(step.id)}
                            >
                                {getStepContent(step.id)}
                            </AccordionStep>
                        ))}
                    </SafeAnimatePresence>
                </LeftColumn>
                <RightColumn>
                    <OrderSummary orderData={orderData} />
                </RightColumn>
            </CheckoutGrid>
        </PageContainer>
    );
};