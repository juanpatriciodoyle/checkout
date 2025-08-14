import React, { useState, ReactNode } from 'react';
import styled from 'styled-components';
import { AnimatePresence, AnimatePresenceProps } from 'framer-motion';
import { appTexts } from '../../constants/text';
import { OrderData } from '../../types';
import AccordionStep from '../AccordionStep/AccordionStep';
import { OrderSummary } from '../OrderSummary/OrderSummary';

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
        { id: 1, name: 'Vintage T-Shirt', price: 25.0 },
        { id: 2, name: 'Designer Jeans', price: 75.0 },
    ],
    subtotal: 100.0,
    shipping: { name: 'Standard', cost: 10.0 },
    discount: { name: appTexts.discount, amount: 15.0 },
    total: 95.0,
};

export const CheckoutPage = () => {
    const [activeStep, setActiveStep] = useState(1);
    const [orderData] = useState<OrderData>(initialOrderData);

    const handleToggle = (stepId: number) => {
        setActiveStep(activeStep === stepId ? 0 : stepId);
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
                                <p>Content for {step.title}</p>
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