import React, {useEffect, useRef} from 'react';
import {animate} from 'framer-motion';

interface AnimatedNumberProps {
    value: number;
}

const formatCurrency = (value: number) => `£${value.toFixed(2)}`;

export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({value}) => {
    const nodeRef = useRef<HTMLSpanElement>(null);
    const isInitialRender = useRef(true);

    useEffect(() => {
        const node = nodeRef.current;
        if (!node) return;

        if (isInitialRender.current) {
            node.textContent = formatCurrency(value);
            isInitialRender.current = false;
            return;
        }

        const fromValue = parseFloat(node.textContent?.replace('£', '') || '0');

        const controls = animate(fromValue, value, {
            duration: 1.5,
            ease: 'easeOut',
            onUpdate(latest) {
                node.textContent = formatCurrency(latest);
            },
        });

        return () => controls.stop();
    }, [value]);

    return <span ref={nodeRef}/>;
};