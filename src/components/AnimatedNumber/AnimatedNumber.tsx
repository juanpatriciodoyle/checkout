import React, {useEffect, useRef} from 'react';
import {animate} from 'framer-motion';
import {Currency} from '../../types';
import {CURRENCIES, EXCHANGE_RATE_EUR} from '../../constants/text';

interface AnimatedNumberProps {
    value: number;
    currency: Currency;
}

const formatCurrency = (value: number, currency: Currency) => {
    const finalAmount = currency === 'EUR' ? value * EXCHANGE_RATE_EUR : value;
    return `${CURRENCIES[currency]}${finalAmount.toFixed(2)}`;
};

export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({value, currency}) => {
    const nodeRef = useRef<HTMLSpanElement>(null);
    const isInitialRender = useRef(true);

    useEffect(() => {
        const node = nodeRef.current;
        if (!node) return;

        if (isInitialRender.current) {
            node.textContent = formatCurrency(value, currency);
            isInitialRender.current = false;
            return;
        }

        const fromValueText = node.textContent?.replace(CURRENCIES.GBP, '').replace(CURRENCIES.EUR, '') || '0';
        const fromValue = parseFloat(fromValueText)
        const fromValueInGBP = currency === 'EUR' ? fromValue / EXCHANGE_RATE_EUR : fromValue

        const controls = animate(fromValueInGBP, value, {
            duration: 1.5,
            ease: 'easeOut',
            onUpdate(latest) {
                node.textContent = formatCurrency(latest, currency);
            },
        });

        return () => controls.stop();
    }, [value, currency]);

    return <span ref={nodeRef}/>;
};