import React, {ReactNode} from 'react';
import styled from 'styled-components';
import {AnimatePresence, AnimatePresenceProps, motion} from 'framer-motion';
import {CartItem as CartItemType, Currency} from '../../../types';
import {CartItem} from '../../CartItem/CartItem';
import {appTexts} from '../../../constants/text';

type SafeAnimatePresenceProps = AnimatePresenceProps & {
    children: ReactNode;
};
const SafeAnimatePresence = AnimatePresence as React.FC<SafeAnimatePresenceProps>;

const StepContent = styled.div`
    display: flex;
    flex-direction: column;
`;

const ItemListContainer = styled(motion.div)`
    margin-bottom: 2rem;
`;

const ContinueButton = styled.button`
    background-color: ${({theme}) => theme.colors.primary};
    color: ${({theme}) => theme.colors.bgWhite};
    border: none;
    border-radius: ${({theme}) => theme.sizing.borderRadius.buttons};
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
    onRemoveItem: (itemId: number) => void;
    onContinue: () => void;
    currency: Currency;
}

export const YourCart: React.FC<StepYourCartProps> = ({
                                                          items,
                                                          onRemoveItem,
                                                          onContinue,
                                                          currency,
                                                      }) => {
    return (
        <StepContent>
            <ItemListContainer>
                <SafeAnimatePresence>
                    {items.map((item) => (
                        <CartItem
                            key={item.id}
                            item={item}
                            onRemove={onRemoveItem}
                            currency={currency}
                        />
                    ))}
                </SafeAnimatePresence>
            </ItemListContainer>
            <ContinueButton onClick={onContinue}>
                {appTexts.continueToDelivery}
            </ContinueButton>
        </StepContent>
    );
};