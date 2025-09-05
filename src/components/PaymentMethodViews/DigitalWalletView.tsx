import React from 'react';
import styled from 'styled-components';
import { Smartphone } from 'lucide-react';
import { GooglePayButton } from './GooglePayButton';
import { OrderData } from '../../types';

const NoticeContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 2rem 1rem;
    border: 1px solid ${({ theme }) => theme.colors.borderColor};
    border-radius: ${({ theme }) => theme.borderRadius};
`;

const IconWrapper = styled.div`
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 1rem;
`;

const NoticeText = styled.p`
    margin: 0;
    color: ${({ theme }) => theme.colors.textLight};
    max-width: 400px;
`;

interface DigitalWalletViewProps {
    orderData: OrderData;
    onPaymentAuthorized: () => void;
}

export const DigitalWalletView: React.FC<DigitalWalletViewProps> = ({ orderData, onPaymentAuthorized }) => {
    return (
        <NoticeContainer>
            <IconWrapper>
                <Smartphone size={40} />
            </IconWrapper>
            <NoticeText>
                You will be prompted on your device to confirm the payment with GPay /
                Apple Pay.
            </NoticeText>
            <GooglePayButton orderData={orderData} onPaymentAuthorized={onPaymentAuthorized} />
        </NoticeContainer>
    );
};