import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';

const StepperContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    background-color: ${({ theme }) => theme.colors.bgSubtle};
    border: 1px solid ${({ theme }) => theme.colors.borderColor};
    border-radius: 999px;
    padding: 0.25rem;
`;

const StepperButton = styled(motion.button)`
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.bgWhite};
    border: 1px solid ${({ theme }) => theme.colors.borderColor};
    color: ${({ theme }) => theme.colors.textLight};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover {
        border-color: ${({ theme }) => theme.colors.primary};
        color: ${({ theme }) => theme.colors.primary};
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

const QuantityDisplay = styled.span`
    font-weight: 600;
    min-width: 20px;
    text-align: center;
    color: ${({ theme }) => theme.colors.textMain};
`;

interface QuantityStepperProps {
    quantity: number;
    onIncrease: () => void;
    onDecrease: () => void;
}

export const QuantityStepper: React.FC<QuantityStepperProps> = ({ quantity, onIncrease, onDecrease }) => {
    return (
        <StepperContainer>
            <StepperButton
                onClick={onDecrease}
                disabled={quantity <= 1}
                whileTap={{ scale: 0.9 }}
            >
                <Minus size={16} />
            </StepperButton>
            <QuantityDisplay>{quantity}</QuantityDisplay>
            <StepperButton
                onClick={onIncrease}
                whileTap={{ scale: 0.9 }}
            >
                <Plus size={16} />
            </StepperButton>
        </StepperContainer>
    );
};