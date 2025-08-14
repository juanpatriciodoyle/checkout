import React from 'react';
import styled from 'styled-components';
import { CartItem as CartItemType } from '../../types';

const ItemContainer = styled.div`
  display: flex;
  gap: 1rem;
  padding-bottom: 1.5rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }
`;

const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: #eee;
`;

const ItemDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const ItemName = styled.h4`
  margin: 0;
  font-weight: 600;
`;

const ItemPrice = styled.span`
  font-weight: 600;
`;

const ItemDescription = styled.p`
  margin: 0.25rem 0 0;
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 0.875rem;
`;

const ColorSelector = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: auto;
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
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

const ColorSwatchVisual = styled.div<{ color: string }>`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
`;


interface CartItemProps {
    item: CartItemType;
    onColorChange: (itemId: number, newColor: string) => void;
}

export const CartItem: React.FC<CartItemProps> = ({ item, onColorChange }) => {
    return (
        <ItemContainer>
            <ItemImage src={item.image} alt={item.name} />
            <ItemDetails>
                <ItemHeader>
                    <ItemName>{item.name}</ItemName>
                    <ItemPrice>${item.price.toFixed(2)}</ItemPrice>
                </ItemHeader>
                <ItemDescription>{item.description}</ItemDescription>
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
                            <ColorSwatchVisual color={color} />
                        </ColorSwatchLabel>
                    ))}
                </ColorSelector>
            </ItemDetails>
        </ItemContainer>
    );
};