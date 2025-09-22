import React from 'react';
import styled from 'styled-components';
import {motion} from 'framer-motion';
import {Trash2} from 'lucide-react';
import {CartItem as CartItemType, Currency} from '../../types';
import {CURRENCIES, EXCHANGE_RATE_EUR} from '../../constants/text';

const ItemContainer = styled(motion.div)`
    display: grid;
    grid-template-columns: 120px 1fr auto auto;
    align-items: center;
    gap: 16px;
    padding: 16px 0;
    border-bottom: 1px solid ${({theme}) => theme.colors.borderColor};

    &:last-child {
        border-bottom: none;
    }
`;

const ItemImage = styled.img`
    width: 120px;
    height: 120px;
    object-fit: cover;
    border-radius: 8px;
    background-color: #eee;
`;

const ItemDetails = styled.div``;

const ItemName = styled.h4`
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    color: ${({theme}) => theme.colors.textMain};
`;

const ItemDescription = styled.p`
    margin: 0.25rem 0 0;
    font-size: 14px;
    font-weight: 400;
    color: ${({theme}) => theme.colors.textLight};
`;

const ColorSelector = styled.div`
    display: flex;
    gap: 0.5rem;
    justify-content: center;
`;

const ColorSwatchLabel = styled.label`
    position: relative;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    cursor: pointer;
`;

const ColorSwatchInput = styled.input`
    position: absolute;
    opacity: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;

    &:checked + div {
        outline: 3px solid ${({theme}) => theme.colors.primary};
        outline-offset: 2px;
        transition: outline-offset 0.1s ease-in-out, outline 0.1s ease-in-out;
    }
`;

const ColorSwatchVisual = styled.div<{ color: string }>`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: ${({color}) => color};
    border: 1px solid ${({theme}) => theme.colors.borderColor};
    transition: transform 0.2s ease-in-out;

    &:hover {
        transform: scale(1.1);
    }
`;

const PriceAndActions = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 16px;
`;

const ItemPrice = styled.span`
    font-size: 16px;
    font-weight: 600;
    color: ${({theme}) => theme.colors.textMain};
`;

const RemoveButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    color: ${({theme}) => theme.colors.textLight};
    transition: color 0.2s;
    display: inline-flex;

    &:hover {
        color: #E53E3E;
    }
`;

const itemVariants = {
    exit: {opacity: 0, x: -50, transition: {duration: 0.3}},
};

interface CartItemProps {
    item: CartItemType;
    onColorChange: (itemId: number, newColor: string) => void;
    onRemove: (itemId: number) => void;
    currency: Currency;
}

const formatCurrency = (amount: number, currency: Currency) => {
    const finalAmount = currency === 'EUR' ? amount * EXCHANGE_RATE_EUR : amount;
    return `${CURRENCIES[currency]}${finalAmount.toFixed(2)}`;
};

export const CartItem: React.FC<CartItemProps> = ({item, onColorChange, onRemove, currency}) => {
    return (
        <ItemContainer
            variants={itemVariants}
            exit="exit"
            layout
        >
            <ItemImage src={item.image} alt={item.name}/>
            <ItemDetails>
                <ItemName>{item.name}</ItemName>
                <ItemDescription>{item.description}</ItemDescription>
            </ItemDetails>
            <ColorSelector>
                {item.availableColors.map((color) => (
                    <ColorSwatchLabel key={color}>
                        <ColorSwatchInput
                            type="radio"
                            name={`color-${item.id}`}
                            value={color}
                            checked={item.color === color}
                            onChange={() => onColorChange(item.id, color)}
                        />
                        <ColorSwatchVisual color={color}/>
                    </ColorSwatchLabel>
                ))}
            </ColorSelector>
            <PriceAndActions>
                <ItemPrice>{formatCurrency(item.price, currency)}</ItemPrice>
                <RemoveButton onClick={() => onRemove(item.id)}>
                    <Trash2 size={18}/>
                </RemoveButton>
            </PriceAndActions>
        </ItemContainer>
    );
};