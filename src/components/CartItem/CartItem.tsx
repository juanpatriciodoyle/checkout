import React from 'react';
import styled from 'styled-components';
import {motion} from 'framer-motion';
import {Trash2} from 'lucide-react';
import {CartItem as CartItemType, Currency} from '../../types';
import {formatCurrency} from '../../utils/formatters';

const ItemContainer = styled(motion.div)`
    box-sizing: border-box;
    display: grid;
    grid-template-columns: 120px 1fr auto;
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
    box-sizing: border-box;
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

interface CartItemProps {
    item: CartItemType;
    onRemove: (itemId: number) => void;
    currency: Currency;
}

export const CartItem: React.FC<CartItemProps> = ({item, onRemove, currency}) => {
    return (
        <ItemContainer>
            <ItemImage src={item.image} alt={item.name}/>
            <ItemDetails>
                <ItemName>{item.name}</ItemName>
                <ItemDescription>{item.description}</ItemDescription>
            </ItemDetails>
            <PriceAndActions>
                <ItemPrice>{formatCurrency(item.price, currency)}</ItemPrice>
                <RemoveButton onClick={() => onRemove(item.id)}>
                    <Trash2 size={18}/>
                </RemoveButton>
            </PriceAndActions>
        </ItemContainer>
    );
};