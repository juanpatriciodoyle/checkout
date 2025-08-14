import React from 'react';
import styled from 'styled-components';
import { Copy } from 'lucide-react';

const CryptoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    padding: 2rem 1rem;
    border: 1px solid ${({ theme }) => theme.colors.borderColor};
    border-radius: ${({ theme }) => theme.borderRadius};
`;

const QrCodePlaceholder = styled.div`
    width: 150px;
    height: 150px;
    background-color: #f0f0f0;
    border: 1px solid ${({ theme }) => theme.colors.borderColor};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.textLight};
`;

const WalletAddressWrapper = styled.div`
    display: flex;
    width: 100%;
    max-width: 400px;
`;

const AddressInput = styled.input`
    flex-grow: 1;
    border: 1px solid ${({ theme }) => theme.colors.borderColor};
    border-radius: ${({ theme }) => theme.borderRadius} 0 0 ${({ theme }) => theme.borderRadius};
    padding: 0.75rem;
    font-size: 0.875rem;
    background-color: ${({ theme }) => theme.colors.bgSubtle};
    font-family: monospace;
    color: ${({ theme }) => theme.colors.textLight};
    border-right: none;
`;

const CopyButton = styled.button`
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
    border: none;
    padding: 0 1rem;
    border-radius: 0 ${({ theme }) => theme.borderRadius} ${({ theme }) => theme.borderRadius} 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &:hover {
        opacity: 0.9;
    }
`;

export const CryptoPaymentView = () => {
    const walletAddress = "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B";

    const handleCopy = () => {
        navigator.clipboard.writeText(walletAddress);
    };

    return (
        <CryptoContainer>
            <QrCodePlaceholder>QR Code</QrCodePlaceholder>
            <WalletAddressWrapper>
                <AddressInput type="text" readOnly value={walletAddress} />
                <CopyButton onClick={handleCopy}>
                    <Copy size={16} /> Copy
                </CopyButton>
            </WalletAddressWrapper>
        </CryptoContainer>
    );
};