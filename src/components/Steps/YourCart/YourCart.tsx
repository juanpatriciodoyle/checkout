import React, {ReactNode} from 'react';
import styled from 'styled-components';
import {AnimatePresence, AnimatePresenceProps, motion} from 'framer-motion';
import {CheckCircle2} from 'lucide-react';
import {CartItem as CartItemType, Currency} from '../../../types';
import {CartItem} from '../../CartItem/CartItem';
import {appTexts, BUNDLES} from '../../../constants/text';

type SafeAnimatePresenceProps = AnimatePresenceProps & {
    children: ReactNode;
};
const SafeAnimatePresence = AnimatePresence as React.FC<SafeAnimatePresenceProps>;

const StepContent = styled.div`
    display: flex;
    flex-direction: column;
`;

const BundleGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-bottom: 2rem;
`;

const BundleCard = styled.div<{ isSelected: boolean }>`
    position: relative;
    padding: 1.5rem;
    border: 2px solid ${({isSelected, theme}) => isSelected ? theme.colors.primary : theme.colors.borderColor};
    border-radius: ${({theme}) => theme.borderRadius};
    cursor: pointer;
    transition: border-color 0.2s ease-in-out;
    text-align: center;

    &:hover {
        border-color: ${({theme}) => theme.colors.primary};
    }
`;

const BundleIcon = styled.div`
    color: ${({theme}) => theme.colors.primary};
    margin-bottom: 1rem;
`;

const BundleTitle = styled.h3`
    margin: 0 0 0.5rem;
    font-size: 1.125rem;
`;

const BundleDescription = styled.p`
    margin: 0;
    font-size: 0.875rem;
    color: ${({theme}) => theme.colors.textLight};
    min-height: 40px;
`;

const CheckmarkWrapper = styled(motion.div)`
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    color: ${({theme}) => theme.colors.primary};
`;


const ItemListContainer = styled.div`
    margin-bottom: 2rem;
    border-top: 1px solid ${({theme}) => theme.colors.borderColor};
    padding-top: 1rem;
`;

const ItemListWrapper = styled(motion.div)``;

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
    onRemoveItem: (itemId: number) => void;
    onContinue: () => void;
    currency: Currency;
    selectedBundle: 'drive' | 'health';
    onBundleChange: (bundleId: 'drive' | 'health') => void;
}

export const YourCart: React.FC<StepYourCartProps> = ({
                                                          items,
                                                          onRemoveItem,
                                                          onContinue,
                                                          currency,
                                                          selectedBundle,
                                                          onBundleChange,
                                                      }) => {
    return (
        <StepContent>
            <BundleGrid>
                {BUNDLES.map(bundle => {
                    const Icon = bundle.icon;
                    const isSelected = selectedBundle === bundle.id;
                    return (
                        <BundleCard
                            key={bundle.id}
                            isSelected={isSelected}
                            onClick={() => onBundleChange(bundle.id as 'drive' | 'health')}
                        >
                            <SafeAnimatePresence>
                                {isSelected && (
                                    <CheckmarkWrapper
                                        initial={{scale: 0, opacity: 0}}
                                        animate={{scale: 1, opacity: 1}}
                                        exit={{scale: 0, opacity: 0}}
                                    >
                                        <CheckCircle2/>
                                    </CheckmarkWrapper>
                                )}
                            </SafeAnimatePresence>
                            <BundleIcon>
                                <Icon size={40}/>
                            </BundleIcon>
                            <BundleTitle>{bundle.title}</BundleTitle>
                            <BundleDescription>{bundle.description}</BundleDescription>
                        </BundleCard>
                    );
                })}
            </BundleGrid>

            <ItemListContainer>
                <SafeAnimatePresence mode="wait">
                    <ItemListWrapper
                        key={selectedBundle}
                        initial={{opacity: 0, y: 10}}
                        animate={{opacity: 1, y: 0, transition: {duration: 0.18, delay: 0.05}}}
                        exit={{opacity: 0, y: -10, transition: {duration: 0.13}}}
                    >
                        {items.map((item) => (
                            <CartItem
                                key={item.id}
                                item={item}
                                onRemove={onRemoveItem}
                                currency={currency}
                            />
                        ))}
                    </ItemListWrapper>
                </SafeAnimatePresence>
            </ItemListContainer>
            <ContinueButton onClick={onContinue}>
                {appTexts.continueToDelivery}
            </ContinueButton>
        </StepContent>
    );
};