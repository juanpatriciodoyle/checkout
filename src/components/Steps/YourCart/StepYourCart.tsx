import React from 'react';
import styled from 'styled-components';
import {CartItem as CartItemType} from '../../../types';
import {CartItem} from '../../CartItem/CartItem';
import {appTexts} from '../../../constants/text';

const StepContent = styled.div`
    display: flex;
    flex-direction: column;
`;

const ItemListContainer = styled.div`
    margin-bottom: 2rem;
`;

const ContinueButton = styled.button`
    background-color: ${({theme}) => theme.colors.primary};
    color: ${({theme}) => theme.colors.bgWhite};
    border: none;
    border-radius: ${({theme}) => theme.borderRadius};
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    align-self: flex-end;

    &:hover {
        opacity: 0.9;
    }
`;

interface StepYourCartProps {
    items: CartItemType[];
    onColorChange: (itemId: number, newColor: string) => void;
    onContinue: () => void;
}

export const StepYourCart: React.FC<StepYourCartProps> = ({
                                                              items,
                                                              onColorChange,
                                                              onContinue,
                                                          }) => {
    return (
        <StepContent>
            <ItemListContainer>
                {items.map((item) => (
                    <CartItem key={item.id} item={item} onColorChange={onColorChange}/>
                ))}
            </ItemListContainer>
            <ContinueButton onClick={onContinue}>
                {appTexts.continueToDelivery}
            </ContinueButton>
        </StepContent>
    );
};