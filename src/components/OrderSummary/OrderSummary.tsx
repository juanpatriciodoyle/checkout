import React, {ReactNode, useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {AnimatePresence, AnimatePresenceProps, motion} from 'framer-motion';
import {Gift} from 'lucide-react';
import {appTexts, CURRENCIES, EXCHANGE_RATE_EUR} from '../../constants/text';
import {Currency, OrderData} from '../../types';
import {AnimatedNumber} from '../AnimatedNumber/AnimatedNumber';

type SafeAnimatePresenceProps = AnimatePresenceProps & {
    children: ReactNode;
};

const SafeAnimatePresence = AnimatePresence as React.FC<SafeAnimatePresenceProps>;

const SummaryContainer = styled.div`
    background-color: ${({theme}) => theme.colors.bgWhite};
    border: 1px solid ${({theme}) => theme.colors.borderColor};
    border-radius: ${({theme}) => theme.borderRadius};
    padding: 1.5rem;
`;

const Title = styled.h2`
    font-size: 1.25rem;
    margin: 0;
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
    color: ${({theme}) => theme.colors.success};
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
    border-top: 1px solid ${({theme}) => theme.colors.borderColor};
    line-height: 20px;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
`;

const CurrencyControlContainer = styled.div`
    position: relative;
    display: flex;
    background-color: #F1F3F4;
    border-radius: 6px;
    padding: 4px;
`;

const CurrencyOption = styled.button`
    position: relative;
    z-index: 1;
    padding: 0.25rem 1rem;
    font-size: 0.875rem;
    font-weight: 600;
    background-color: transparent;
    color: ${({theme}) => theme.colors.textMain};
    border: none;
    cursor: pointer;
    transition: color 0.3s ease;
    border-radius: 4px;

    &.active {
        color: ${({theme}) => theme.colors.bgWhite};
    }
`;

const ActiveSlider = styled(motion.div)`
    position: absolute;
    top: 4px;
    bottom: 4px;
    background-color: ${({theme}) => theme.colors.primary};
    border-radius: 4px;
    z-index: 0;
`;


interface OrderSummaryProps {
    orderData: OrderData;
    onCurrencyChange: (currency: Currency) => void;
}

const formatCurrency = (amount: number, currency: Currency) => {
    const finalAmount = currency === 'EUR' ? amount * EXCHANGE_RATE_EUR : amount;
    return `${CURRENCIES[currency]}${finalAmount.toFixed(2)}`;
};

export const OrderSummary: React.FC<OrderSummaryProps> = ({orderData, onCurrencyChange}) => {
    const {items, subtotal, shipping, vivreDiscount, coupon, total, currency} = orderData;

    const gbpRef = useRef<HTMLButtonElement>(null);
    const eurRef = useRef<HTMLButtonElement>(null);
    const [sliderStyle, setSliderStyle] = useState({});

    useEffect(() => {
        const targetRef = currency === 'GBP' ? gbpRef.current : eurRef.current;
        if (targetRef) {
            setSliderStyle({
                left: targetRef.offsetLeft,
                width: targetRef.offsetWidth,
            });
        }
    }, [currency]);

    const discountAmount = vivreDiscount.applied ? subtotal * vivreDiscount.discountPercentage : 0;
    const couponDiscountAmount = coupon ? vivreDiscount.applied ? ((subtotal - discountAmount) * coupon.discountPercentage) : subtotal * coupon.discountPercentage : 0;

    return (
        <SummaryContainer>
            <Header>
                <Title>{appTexts.orderSummaryTitle}</Title>
                <CurrencyControlContainer>
                    <ActiveSlider
                        animate={sliderStyle}
                        transition={{type: "spring", stiffness: 500, damping: 40}}
                    />
                    <CurrencyOption ref={gbpRef} className={currency === 'GBP' ? 'active' : ''}
                                    onClick={() => onCurrencyChange('GBP')}>
                        GBP
                    </CurrencyOption>
                    <CurrencyOption ref={eurRef} className={currency === 'EUR' ? 'active' : ''}
                                    onClick={() => onCurrencyChange('EUR')}>
                        EUR
                    </CurrencyOption>
                </CurrencyControlContainer>
            </Header>
            <ItemList>
                {items.map((item) => (
                    <Item key={item.id}>
                        <span>{item.name}</span>
                        <span>{formatCurrency(item.price, currency)}</span>
                    </Item>
                ))}
            </ItemList>
            <SummaryRow>
                <span>{appTexts.subtotal}</span>
                <span>{formatCurrency(subtotal, currency)}</span>
            </SummaryRow>
            <SummaryRow>
                <span>{appTexts.shipping}</span>
                <span>{formatCurrency(shipping.cost, currency)}</span>
            </SummaryRow>

            <SafeAnimatePresence>
                {vivreDiscount.applied && (
                    <DiscountRow
                        initial={{opacity: 0, x: -20}}
                        animate={{opacity: 1, x: 0}}
                        exit={{opacity: 0, x: 20}}
                        layout
                    >
                        <span><Gift size={18}/> {appTexts.discount}</span>
                        <span>-{formatCurrency(discountAmount, currency)}</span>
                    </DiscountRow>
                )}
            </SafeAnimatePresence>

            {coupon && (
                <SummaryRow>
                    <span>Coupon ({coupon.code})</span>
                    <span>-{formatCurrency(couponDiscountAmount, currency)}</span>
                </SummaryRow>
            )}

            <TotalRow>
                <span>{appTexts.total}</span>
                <AnimatedNumber value={total} currency={currency}/>
            </TotalRow>
        </SummaryContainer>
    );
};