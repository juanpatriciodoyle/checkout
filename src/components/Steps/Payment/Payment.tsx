import React, {useState} from 'react';
import styled from 'styled-components';
import {motion} from 'framer-motion';
import {Loader2, Lock} from 'lucide-react';
import {appTexts} from '../../../constants/text';
import {CardPaymentView} from '../../PaymentMethodViews/CardPaymentView';
import {BnplPaymentView} from '../../PaymentMethodViews/BnplPaymentView';
import {DigitalWalletView} from '../../PaymentMethodViews/DigitalWalletView';
import {CryptoPaymentView} from '../../PaymentMethodViews/CryptoPaymentView';
import {Currency, OrderData} from '../../../types';

const SegmentedControl = styled.div`
    box-sizing: border-box;
    display: flex;
    border: 1px solid ${({theme}) => theme.colors.borderColor};
    border-radius: ${({theme}) => theme.sizing.borderRadius.buttons};
    overflow: hidden;
    margin-bottom: 2rem;
    padding: 4px;
`;

const SegmentButton = styled.button<{ isActive: boolean }>`
    box-sizing: border-box;
    flex: 1;
    padding: 0.75rem;
    font-size: 1rem;
    background-color: ${({isActive, theme}) => (isActive ? theme.colors.secondary : 'transparent')};
    color: ${({theme}) => (theme.colors.textMain)};
    font-weight: ${({isActive}) => isActive ? "600" : "normal"};
    border: 1px solid white;
    border-radius: 6px;
    margin: 5px;
    cursor: pointer;
    transition: background-color 0.2s, color 0.2s;
`;

const ContentContainer = styled.div`
    margin-bottom: 2rem;
`;

const CouponSection = styled.div`
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid ${({theme}) => theme.colors.borderColor};
`;

const CouponInput = styled.input`
    box-sizing: border-box;
    flex-grow: 1;
    border: 1px solid ${({theme}) => theme.colors.borderColor};
    border-radius: ${({theme}) => theme.sizing.borderRadius.buttons};
    padding: 0.75rem;
    font-size: 1rem;
`;

const ApplyButton = styled.button`
    box-sizing: border-box;
    background-color: transparent;
    color: ${({theme}) => theme.colors.primary};
    border: 1px solid ${({theme}) => theme.colors.primary};
    border-radius: ${({theme}) => theme.sizing.borderRadius.buttons};
    padding: 0.75rem 1.5rem;
    font-weight: 600;
    cursor: pointer;

    &:hover {
        background-color: ${({theme}) => theme.colors.bgSubtle};
    }
`;

const PayButton = styled(motion.button)`
    box-sizing: border-box;
    background-color: ${({theme}) => theme.colors.primary};
    color: ${({theme}) => theme.colors.bgWhite};
    border: none;
    border-radius: ${({theme}) => theme.sizing.borderRadius.buttons};
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    width: 100%;
    margin-top: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    height: 50px;
`;

const LoaderIcon = styled(Loader2)`
    animation: spin 1s linear infinite;
    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
`;

interface PaymentProps {
    orderData: OrderData;
    isProcessing: boolean;
    onApplyCoupon: (code: string) => void;
    onPaymentMethodChange: (method: string) => void;
    onComplete: () => void;
    appliedCouponCode?: string;
    currency: Currency;
}

const paymentMethods = [
    {id: 'gpay', label: appTexts.paymentGPay},
    {id: 'card', label: appTexts.paymentCard},
    {id: 'bnpl', label: appTexts.paymentBNPL},
    {id: 'crypto', label: appTexts.paymentCrypto},
];

export const Payment: React.FC<PaymentProps> = ({
                                                    orderData,
                                                    isProcessing,
                                                    onApplyCoupon,
                                                    onPaymentMethodChange,
                                                    onComplete,
                                                    appliedCouponCode,
                                                    currency,
                                                }) => {
    const [selectedMethod, setSelectedMethod] = useState('card');
    const [couponCode, setCouponCode] = useState('');

    const handleMethodClick = (method: string) => {
        setSelectedMethod(method);
        onPaymentMethodChange(method);
    };

    const handleApplyClick = () => {
        onApplyCoupon(couponCode);
        setCouponCode('');
    };

    const renderPaymentView = () => {
        switch (selectedMethod) {
            case 'gpay':
                return <DigitalWalletView orderData={orderData} onPaymentAuthorized={onComplete} currency={currency}/>;
            case 'card':
                return <CardPaymentView/>;
            case 'bnpl':
                return <BnplPaymentView/>;
            case 'crypto':
                return <CryptoPaymentView/>;
            default:
                return <CardPaymentView/>;
        }
    };

    return (
        <div>
            <SegmentedControl>
                {paymentMethods.map(method => (
                    <SegmentButton
                        key={method.id}
                        isActive={selectedMethod === method.id}
                        onClick={() => handleMethodClick(method.id)}
                    >
                        {method.label}
                    </SegmentButton>
                ))}
            </SegmentedControl>

            <ContentContainer>
                {renderPaymentView()}
            </ContentContainer>

            <CouponSection>
                <CouponInput
                    placeholder={appTexts.couponLabel}
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    disabled={!!appliedCouponCode}
                />
                <ApplyButton onClick={handleApplyClick} disabled={!!appliedCouponCode}>
                    {appliedCouponCode ? appTexts.couponApplied : appTexts.couponButton}
                </ApplyButton>
            </CouponSection>

            {selectedMethod !== 'gpay' && (
                <PayButton
                    onClick={onComplete}
                    disabled={isProcessing}
                    whileHover={{scale: isProcessing ? 1 : 1.02}}
                    whileTap={{scale: isProcessing ? 1 : 0.98}}
                >
                    {isProcessing ? (
                        <>
                            <LoaderIcon size={20}/>
                            {appTexts.loading}
                        </>
                    ) : (
                        <>
                            <Lock size={18}/>
                            {appTexts.paySecurely}
                        </>
                    )}
                </PayButton>
            )}
        </div>
    );
};