import React from 'react';
import styled from 'styled-components';
import { ShippingMethodI as ShippingMethodType } from '../../../types';
import { ShippingOption } from '../../ShippingOption/ShippingOption';
import { SHIPPING_OPTIONS } from '../../../constants/text';

const OptionsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

interface StepShippingMethodProps {
    selectedShippingId: string;
    onSelectShipping: (option: ShippingMethodType) => void;
    selectedDate?: Date;
    onDateChange: (date: Date) => void;
}

export const ShippingMethod: React.FC<StepShippingMethodProps> = ({
                                                                      selectedShippingId,
                                                                      onSelectShipping,
                                                                      selectedDate,
                                                                      onDateChange
                                                                  }) => {
    return (
        <OptionsContainer>
            {SHIPPING_OPTIONS.map((option) => (
                <ShippingOption
                    key={option.id}
                    option={option}
                    isSelected={selectedShippingId === option.id}
                    onSelect={() => onSelectShipping(option)}
                    selectedDate={selectedDate}
                    onDateChange={onDateChange}
                />
            ))}
        </OptionsContainer>
    );
};