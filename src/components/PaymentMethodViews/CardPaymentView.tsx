import React from 'react';
import styled from 'styled-components';
import { CreditCard, User, MapPin } from 'lucide-react';

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const InputWrapper = styled.div`
    position: relative;
`;

const IconWrapper = styled.div`
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.colors.textLight};
`;

const StyledInput = styled.input`
    width: 100%;
    border: 1px solid ${({ theme }) => theme.colors.borderColor};
    border-radius: ${({ theme }) => theme.borderRadius};
    padding: 1rem 1rem 1rem 2.5rem; /* Make space for icon */
    font-size: 1rem;
    height: 50px;

    &:focus {
        outline: none;
        border-color: ${({ theme }) => theme.colors.primary};
    }
`;

const CardInputPlaceholder = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    border: 1px solid ${({ theme }) => theme.colors.borderColor};
    border-radius: ${({ theme }) => theme.borderRadius};
    padding-left: 2.5rem;
    font-size: 1rem;
    height: 50px;
    color: ${({ theme }) => theme.colors.textLight};
`;


export const CardPaymentView = () => {
    return (
        <FormContainer>
            <InputWrapper>
                <IconWrapper><CreditCard size={20} /></IconWrapper>
                <CardInputPlaceholder>Card Number&nbsp;&nbsp;&nbsp;&nbsp;MM/YY&nbsp;&nbsp;&nbsp;&nbsp;CVC</CardInputPlaceholder>
            </InputWrapper>
            <InputWrapper>
                <IconWrapper><User size={20} /></IconWrapper>
                <StyledInput placeholder="Cardholder Name" />
            </InputWrapper>
            <InputWrapper>
                <IconWrapper><MapPin size={20} /></IconWrapper>
                <StyledInput placeholder="Billing Postal Code" />
            </InputWrapper>
        </FormContainer>
    );
};