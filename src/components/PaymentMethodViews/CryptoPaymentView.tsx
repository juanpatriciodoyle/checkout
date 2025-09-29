import React from 'react';
import styled from 'styled-components';
import {Copy} from 'lucide-react';
import {ReactComponent as QrCodeSvg} from '../../assets/icons/qrcode.svg';

const CryptoContainer = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    padding: 2rem 1rem;
    border: 1px solid ${({theme}) => theme.colors.borderColor};
    border-radius: ${({theme}) => theme.sizing.borderRadius.cards};
`;

const QrCodePlaceholder = styled.div`
    box-sizing: border-box;
    width: 150px;
    height: 150px;
    padding: 0.5rem;
    background-color: ${({theme}) => theme.colors.bgWhite};
    border: 1px solid ${({theme}) => theme.colors.borderColor};
    border-radius: ${({theme}) => theme.sizing.borderRadius.cards};
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
        width: 100%;
        height: 100%;
    }
`;

const WalletAddressWrapper = styled.div`
    display: flex;
    width: 100%;
    max-width: 400px;
`;

const AddressInput = styled.input`
    box-sizing: border-box;
    flex-grow: 1;
    border: 1px solid ${({theme}) => theme.colors.borderColor};
    border-radius: ${({theme}) => theme.sizing.borderRadius.buttons} 0 0 ${({theme}) => theme.sizing.borderRadius.buttons};
    padding: 0.75rem;
    font-size: 0.875rem;
    background-color: ${({theme}) => theme.colors.bgSubtle};
    font-family: monospace;
    color: ${({theme}) => theme.colors.textLight};
    border-right: none;
`;

const CopyButton = styled.button`
    box-sizing: border-box;
    background-color: ${({theme}) => theme.colors.primary};
    color: white;
    border: none;
    padding: 0 1rem;
    border-radius: 0 ${({theme}) => theme.sizing.borderRadius.buttons} ${({theme}) => theme.sizing.borderRadius.buttons} 0;
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
            <QrCodePlaceholder>
                <QrCodeSvg/>
            </QrCodePlaceholder>
            <WalletAddressWrapper>
                <AddressInput type="text" readOnly value={walletAddress}/>
                <CopyButton onClick={handleCopy}>
                    <Copy size={16}/> Copy
                </CopyButton>
            </WalletAddressWrapper>
        </CryptoContainer>
    );
};