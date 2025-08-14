import React, { useState } from 'react';
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
    padding: 1rem;
    font-size: 1rem;
    height: 50px;

    &:focus {
        outline: none;
        border-color: ${({ theme }) => theme.colors.primary};
    }
`;

const IconStyledInput = styled(StyledInput)`
    padding-left: 2.5rem;
`;

const CardDetailsRow = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 1rem;
`;

export const CardPaymentView = () => {
    const [expiryDate, setExpiryDate] = useState('');

    const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;

        // Remove all non-digit characters
        value = value.replace(/\D/g, '');

        // Add a slash after the month (MM)
        if (value.length > 2) {
            value = value.slice(0, 2) + ' / ' + value.slice(2, 4);
        }

        setExpiryDate(value);
    };

    return (
        <FormContainer>
            <CardDetailsRow>
                <InputWrapper>
                    <IconWrapper><CreditCard size={20} /></IconWrapper>
                    <IconStyledInput placeholder="Card Number" />
                </InputWrapper>
                <StyledInput
                    placeholder="MM / YY"
                    value={expiryDate}
                    onChange={handleExpiryChange}
                />
                <StyledInput placeholder="CVC" maxLength={4} />
            </CardDetailsRow>
            <InputWrapper>
                <IconWrapper><User size={20} /></IconWrapper>
                <IconStyledInput placeholder="Cardholder Name" />
            </InputWrapper>
            <InputWrapper>
                <IconWrapper><MapPin size={20} /></IconWrapper>
                <IconStyledInput placeholder="Billing Postal Code" />
            </InputWrapper>
        </FormContainer>
    );
};