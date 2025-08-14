import React, {ReactNode} from 'react';
import styled from 'styled-components';
import {AnimatePresence, AnimatePresenceProps, motion} from 'framer-motion';
import {addDays} from 'date-fns';
import {DayPicker} from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import {ShippingMethodI} from '../../types';
import {appTexts} from '../../constants/text';
import {InfoNotice} from '../InfoNotice/InfoNotice';

type SafeAnimatePresenceProps = AnimatePresenceProps & {
    children: ReactNode;
};
const SafeAnimatePresence = AnimatePresence as React.FC<SafeAnimatePresenceProps>;

const OptionWrapper = styled.div``;

const OptionLabel = styled.label<{ isSelected: boolean }>`
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    border: 2px solid ${({isSelected, theme}) => isSelected ? theme.colors.primary : theme.colors.borderColor};
    border-radius: ${({theme}) => theme.borderRadius};
    cursor: pointer;
    transition: border-color 0.2s ease-in-out;
    position: relative;
    background-color: ${({theme}) => theme.colors.bgWhite};

    &:hover {
        border-color: ${({theme}) => theme.colors.primary};
    }
`;

const HiddenRadio = styled.input`
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
`;

const IconWrapper = styled.div`
    color: ${({theme}) => theme.colors.primary};
`;

const DetailsWrapper = styled.div`
    flex-grow: 1;
`;

const Title = styled.div`
    font-weight: 600;
`;

const Eta = styled.div`
    font-size: 0.875rem;
    color: ${({theme}) => theme.colors.textLight};
`;

const Price = styled.div`
    font-weight: 600;
    font-size: 1.125rem;
`;

const RecommendedChip = styled.div`
    position: absolute;
    top: -10px;
    right: 1rem;
    background-color: ${({theme}) => theme.colors.success};
    color: white;
    font-size: 0.75rem;
    font-weight: bold;
    padding: 0.2rem 0.6rem;
    border-radius: 12px;
`;

const ConditionalContent = styled(motion.div)`
    padding: 0 1rem 1rem;
    background-color: ${({theme}) => theme.colors.bgWhite};
    border: 2px solid ${({theme}) => theme.colors.primary};
    border-top: none;
    border-radius: 0 0 ${({theme}) => theme.borderRadius} ${({theme}) => theme.borderRadius};
    margin-top: -8px;
    z-index: -1;
    position: relative;
`;

interface ShippingOptionProps {
    option: ShippingMethodI;
    isSelected: boolean;
    onSelect: () => void;
    selectedDate?: Date;
    onDateChange: (date: Date) => void;
}

export const ShippingOption: React.FC<ShippingOptionProps> = ({
                                                                  option,
                                                                  isSelected,
                                                                  onSelect,
                                                                  selectedDate,
                                                                  onDateChange,
                                                              }) => {
    const Icon = option.icon;
    const today = new Date();

    return (
        <OptionWrapper>
            <OptionLabel isSelected={isSelected}>
                {option.recommended && <RecommendedChip>{appTexts.recommended}</RecommendedChip>}
                <HiddenRadio
                    type="radio"
                    name="shippingOption"
                    checked={isSelected}
                    onChange={onSelect}
                />
                <IconWrapper>
                    <Icon size={32}/>
                </IconWrapper>
                <DetailsWrapper>
                    <Title>{option.name}</Title>
                    <Eta>{option.eta}</Eta>
                </DetailsWrapper>
                <Price>${option.cost.toFixed(2)}</Price>
            </OptionLabel>
            <SafeAnimatePresence>
                {isSelected && (option.id === 'fast' || option.id === 'scheduled') && (
                    <ConditionalContent
                        initial={{opacity: 0, y: -20}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: -20}}
                        transition={{duration: 0.3}}
                    >
                        {option.id === 'fast' && (
                            <InfoNotice>{appTexts.droneInfo}</InfoNotice>
                        )}
                        {option.id === 'scheduled' && (
                            <DayPicker
                                mode="single"
                                selected={selectedDate}
                                onSelect={(date) => date && onDateChange(date)}
                                fromDate={addDays(today, 8)}
                                toDate={addDays(today, 30)}
                            />
                        )}
                    </ConditionalContent>
                )}
            </SafeAnimatePresence>
        </OptionWrapper>
    );
};