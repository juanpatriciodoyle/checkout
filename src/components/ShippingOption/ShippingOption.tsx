import React from 'react';
import styled from 'styled-components';
import { ShippingMethod } from '../../types';
import { appTexts } from '../../constants/text';

const OptionLabel = styled.label<{ isSelected: boolean }>`
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    border: 2px solid ${({ isSelected, theme }) => isSelected ? theme.colors.primary : theme.colors.borderColor};
    border-radius: ${({ theme }) => theme.borderRadius};
    cursor: pointer;
    transition: border-color 0.2s ease-in-out;
    position: relative;

    &:hover {
        border-color: ${({ theme }) => theme.colors.primary};
    }
`;

const HiddenRadio = styled.input`
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
`;

const IconWrapper = styled.div`
    color: ${({ theme }) => theme.colors.primary};
`;

const DetailsWrapper = styled.div`
    flex-grow: 1;
`;

const Title = styled.div`
    font-weight: 600;
`;

const Eta = styled.div`
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.textLight};
`;

const Price = styled.div`
    font-weight: 600;
    font-size: 1.125rem;
`;

const RecommendedChip = styled.div`
    position: absolute;
    top: -10px;
    right: 1rem;
    background-color: ${({ theme }) => theme.colors.success};
    color: white;
    font-size: 0.75rem;
    font-weight: bold;
    padding: 0.2rem 0.6rem;
    border-radius: 12px;
`;


interface ShippingOptionProps {
    option: ShippingMethod;
    isSelected: boolean;
    onSelect: () => void;
}

export const ShippingOption: React.FC<ShippingOptionProps> = ({
                                                                  option,
                                                                  isSelected,
                                                                  onSelect,
                                                              }) => {
    const Icon = option.icon;
    return (
        <OptionLabel isSelected={isSelected}>
            {option.recommended && <RecommendedChip>{appTexts.recommended}</RecommendedChip>}
            <HiddenRadio
                type="radio"
                name="shippingOption"
                checked={isSelected}
                onChange={onSelect}
            />
            <IconWrapper>
                <Icon size={32} />
            </IconWrapper>
            <DetailsWrapper>
                <Title>{option.name}</Title>
                <Eta>{option.eta}</Eta>
            </DetailsWrapper>
            <Price>${option.cost.toFixed(2)}</Price>
        </OptionLabel>
    );
};