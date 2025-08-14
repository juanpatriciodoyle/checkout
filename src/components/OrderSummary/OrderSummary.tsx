import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion, AnimatePresenceProps } from 'framer-motion';
import { Gift } from 'lucide-react';
import { appTexts } from '../../constants/text';
import { OrderData } from '../../types';
import { AnimatedNumber } from '../AnimatedNumber/AnimatedNumber';

type SafeAnimatePresenceProps = AnimatePresenceProps & {
    children: ReactNode;
};

const SafeAnimatePresence = AnimatePresence as React.FC<SafeAnimatePresenceProps>;

const SummaryContainer = styled.div`
    background-color: ${({ theme }) => theme.colors.bgWhite};
    border: 1px solid ${({ theme }) => theme.colors.borderColor};
    border-radius: ${({ theme }) => theme.borderRadius};
    padding: 1.5rem;
`;

const Title = styled.h2`
    font-size: 1.25rem;
    margin-top: 0;
    margin-bottom: 1.5rem;
`;

const ItemList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

const Item = styled.li`
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
`;

const SummaryRow = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
`;

const DiscountRow = styled(motion.div)`
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
    color: ${({ theme }) => theme.colors.success};
    font-weight: 600;

    span:first-child {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
`;

const TotalRow = styled(SummaryRow)`
    font-weight: bold;
    font-size: 20px;
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid ${({ theme }) => theme.colors.borderColor};
    line-height: 20px;
`;

interface OrderSummaryProps {
    orderData: OrderData;
}

const formatCurrency = (amount: number) => {
    return `£${amount.toFixed(2)}`;
};

export const OrderSummary: React.FC<OrderSummaryProps> = ({ orderData }) => {
    const { items, subtotal, shipping, vivreDiscount, coupon, total } = orderData;

    const couponDiscountAmount = coupon ? subtotal * coupon.discountPercentage : 0;
    const discountAmount = vivreDiscount.applied ? subtotal * vivreDiscount.discountPercentage : 0;

    return (
        <SummaryContainer>
            <Title>{appTexts.orderSummaryTitle}</Title>
            <ItemList>
                {items.map((item) => (
                    <Item key={item.id}>
                        <span>{item.name}</span>
                        <span>{formatCurrency(item.price)}</span>
                    </Item>
                ))}
            </ItemList>
            <SummaryRow>
                <span>{appTexts.subtotal}</span>
                <span>{formatCurrency(subtotal)}</span>
            </SummaryRow>
            <SummaryRow>
                <span>{appTexts.shipping}</span>
                <span>{formatCurrency(shipping.cost)}</span>
            </SummaryRow>

            <SafeAnimatePresence>
                {vivreDiscount.applied && (
                    <DiscountRow
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        layout
                    >
                        <span><Gift size={18} /> {appTexts.discount}</span>
                        <span>-{formatCurrency(discountAmount)}</span>
                    </DiscountRow>
                )}
            </SafeAnimatePresence>

            {coupon && (
                <SummaryRow>
                    <span>Coupon ({coupon.code})</span>
                    <span>-{formatCurrency(couponDiscountAmount)}</span>
                </SummaryRow>
            )}

            <TotalRow>
                <span>{appTexts.total}</span>
                <AnimatedNumber value={total} />
            </TotalRow>
        </SummaryContainer>
    );
};