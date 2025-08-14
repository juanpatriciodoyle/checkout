import React from 'react';
import styled from 'styled-components';
import { ShippingMethod as ShippingMethodType } from '../../../types';
import { ShippingOption } from '../../ShippingOption/ShippingOption';
import { SHIPPING_OPTIONS } from '../../../constants/text';

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

interface StepShippingMethodProps {
    selectedShippingId: string;
    onSelectShipping: (option: ShippingMethodType) => void;
}

export const ShippingMethod: React.FC<StepShippingMethodProps> = ({
                                                                          selectedShippingId,
                                                                          onSelectShipping,
                                                                      }) => {
    return (
        <OptionsContainer>
            {SHIPPING_OPTIONS.map((option) => (
                <ShippingOption
                    key={option.id}
                    option={option}
                    isSelected={selectedShippingId === option.id}
                    onSelect={() => onSelectShipping(option)}
                />
            ))}
        </OptionsContainer>
    );
};