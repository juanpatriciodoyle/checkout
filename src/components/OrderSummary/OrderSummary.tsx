import React from 'react';
import styled from 'styled-components';
import {appTexts} from '../../constants/text';
import {OrderData} from '../../types';

const SummaryContainer = styled.div`
    background-color: ${({theme}) => theme.colors.bgWhite};
    border: 1px solid ${({theme}) => theme.colors.borderColor};
    border-radius: ${({theme}) => theme.borderRadius};
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

const TotalRow = styled(SummaryRow)`
    font-weight: bold;
    font-size: 1.25rem;
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid ${({theme}) => theme.colors.borderColor};
`;

interface OrderSummaryProps {
    orderData: OrderData;
}

const formatCurrency = (amount: number) => {
    return `$${amount.toFixed(2)}`;
};

export const OrderSummary: React.FC<OrderSummaryProps> = ({orderData}) => {
    const {items, subtotal, shipping, discount, coupon, total} = orderData;

    const couponDiscountAmount = coupon ? subtotal * coupon.discountPercentage : 0;

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
            {discount.amount > 0 && (
                <SummaryRow>
                    <span>{discount.name}</span>
                    <span>-{formatCurrency(discount.amount)}</span>
                </SummaryRow>
            )}
            {coupon && (
                <SummaryRow>
                    <span>Coupon ({coupon.code})</span>
                    <span>-{formatCurrency(couponDiscountAmount)}</span>
                </SummaryRow>
            )}
            <TotalRow>
                <span>{appTexts.total}</span>
                <span>{formatCurrency(total)}</span>
            </TotalRow>
        </SummaryContainer>
    );
};