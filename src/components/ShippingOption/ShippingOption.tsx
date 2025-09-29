import React, {ReactNode} from 'react';
import styled from 'styled-components';
import {AnimatePresence, AnimatePresenceProps, motion} from 'framer-motion';
import {addDays, format} from 'date-fns';
import {DayPicker} from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import {Currency, ShippingMethodI} from '../../types';
import {appTexts} from '../../constants/text';
import {InfoNotice} from '../InfoNotice/InfoNotice';
import {formatCurrency} from '../../utils/formatters';

type SafeAnimatePresenceProps = AnimatePresenceProps & {
    children: ReactNode;
};
const SafeAnimatePresence = AnimatePresence as React.FC<SafeAnimatePresenceProps>;

const OptionWrapper = styled.div``;

const OptionLabel = styled.label<{ isSelected: boolean }>`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    border: 2px solid ${({isSelected, theme}) => isSelected ? theme.colors.primary : theme.colors.borderColor};
    border-radius: ${({theme}) => theme.borderRadius};
    cursor: pointer;
    transition: border-color 0.2s ease-in-out;
    background-color: ${({theme}) => theme.colors.bgWhite};

    &:hover {
        border-color: ${({theme}) => theme.colors.primary};
    }
`;

const RadioButton = styled.input`
    box-sizing: border-box;
    accent-color: ${({theme}) => theme.colors.primary};
    width: 20px;
    height: 20px;
    margin: 0;
`;

const MainContent = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
`;

const TitleRow = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.25rem;
`;

const Title = styled.div`
    font-weight: 600;
`;

const Price = styled.span`
    font-weight: 600;
`;

const DotSeparator = styled.span`
    color: ${({theme}) => theme.colors.textLight};
`;

const RecommendedChip = styled.div`
    box-sizing: border-box;
    background-color: ${({theme}) => theme.colors.successLight};
    color: ${({theme}) => theme.colors.success};
    font-size: 0.75rem;
    font-weight: bold;
    padding: 0.2rem 0.6rem;
    border-radius: 12px;
`;

const Description = styled.div`
    font-size: 0.875rem;
    color: ${({theme}) => theme.colors.textLight};
`;

const IconWrapper = styled.div`
    color: ${({theme}) => theme.colors.primary};
    border-radius: 4px;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 42px;

    svg {
        width: 28px;
        height: 28px;
    }
`;

const ConditionalContentWrapper = styled(motion.div)`
`;

interface ShippingOptionProps {
    option: ShippingMethodI;
    isSelected: boolean;
    onSelect: () => void;
    selectedDate?: Date;
    onDateChange: (date: Date) => void;
    currency: Currency;
}

export const ShippingOption: React.FC<ShippingOptionProps> = ({
                                                                  option,
                                                                  isSelected,
                                                                  onSelect,
                                                                  selectedDate,
                                                                  onDateChange,
                                                                  currency,
                                                              }) => {
    const Icon = option.icon;
    const today = new Date();

    const getDeliveryDate = () => {
        if (option.id === 'fast') {
            return `Get it by Tomorrow, ${format(addDays(today, 1), 'dd MMM')}`;
        }
        if (option.id === 'standard') {
            const startDate = format(addDays(today, 5), 'dd');
            const endDate = format(addDays(today, 6), 'dd MMM');
            return `Get it by ${startDate} - ${endDate}`;
        }
        if (option.id === 'scheduled') {
            return selectedDate ? `Get it on ${format(selectedDate, 'dd MMM')}` : 'Pick a delivery date';
        }
        return option.eta;
    };

    const disabledDays = [{from: new Date(0), to: addDays(today, 7)}];
    const showConditionalContent = isSelected && (option.id === 'fast' || option.id === 'scheduled');

    return (
        <OptionWrapper>
            <OptionLabel isSelected={isSelected}>
                <RadioButton
                    type="radio"
                    name="shippingOption"
                    checked={isSelected}
                    onChange={onSelect}
                />
                <MainContent>
                    <TitleRow>
                        <Price>{formatCurrency(option.cost, currency)}</Price>
                        <DotSeparator>•</DotSeparator>
                        <Title>{option.name}</Title>
                        {option.recommended && <RecommendedChip>{appTexts.recommended}</RecommendedChip>}
                    </TitleRow>
                    <Description>{getDeliveryDate()}</Description>
                </MainContent>
                <IconWrapper>
                    <Icon/>
                </IconWrapper>
            </OptionLabel>
            <SafeAnimatePresence>
                {showConditionalContent && (
                    <ConditionalContentWrapper
                        initial={{opacity: 0, height: 0, paddingTop: 0, paddingBottom: 0}}
                        animate={{opacity: 1, height: 'auto', paddingBottom: '0'}}
                        exit={{opacity: 0, height: 0, paddingTop: 0, paddingBottom: '0rem'}}
                        transition={{duration: 0.3}}
                    >
                        {option.id === 'fast' && <InfoNotice>{appTexts.droneInfo}</InfoNotice>}
                        {option.id === 'scheduled' && (
                            <DayPicker
                                mode="single"
                                selected={selectedDate}
                                onSelect={(date) => date && onDateChange(date)}
                                disabled={disabledDays}
                                fromDate={addDays(today, 8)}
                                toDate={addDays(today, 30)}
                            />
                        )}
                    </ConditionalContentWrapper>
                )}
            </SafeAnimatePresence>
        </OptionWrapper>
    );
};