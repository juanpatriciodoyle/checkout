import React from 'react';
import styled from 'styled-components';
import {Currency, ShippingMethodI as ShippingMethodType} from '../../../types';
import {ShippingOption} from '../../ShippingOption/ShippingOption';
import {appTexts, SHIPPING_OPTIONS} from '../../../constants/text';

const OptionsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const Button = styled.button`
    border: none;
    border-radius: ${({theme}) => theme.borderRadius};
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
`;

const ContinueButton = styled(Button)`
    background-color: ${({theme}) => theme.colors.primary};
    color: ${({theme}) => theme.colors.bgWhite};

    &:hover {
        opacity: 0.9;
    }
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 24px;
`;

interface StepShippingMethodProps {
    selectedShippingId: string;
    onSelectShipping: (option: ShippingMethodType) => void;
    selectedDate?: Date;
    onDateChange: (date: Date) => void;
    onContinue: () => void;
    currency: Currency;
}

export const ShippingMethod: React.FC<StepShippingMethodProps> = ({
                                                                      selectedShippingId,
                                                                      onSelectShipping,
                                                                      selectedDate,
                                                                      onDateChange,
                                                                      onContinue,
                                                                      currency
                                                                  }) => {
    return (
        <>
            <OptionsContainer>
                {SHIPPING_OPTIONS.map((option) => (
                    <ShippingOption
                        key={option.id}
                        option={option}
                        isSelected={selectedShippingId === option.id}
                        onSelect={() => onSelectShipping(option)}
                        selectedDate={selectedDate}
                        onDateChange={onDateChange}
                        currency={currency}
                    />
                ))}
            </OptionsContainer>
            <ButtonWrapper>
                <ContinueButton onClick={onContinue}>
                    {appTexts.continueToPayment}
                </ContinueButton>
            </ButtonWrapper>
        </>
    );
};