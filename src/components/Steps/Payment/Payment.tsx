import React, {useState} from 'react';
import styled from 'styled-components';
import {motion} from 'framer-motion';
import {Loader2} from 'lucide-react';
import {appTexts} from '../../../constants/text';
import {FloatingLabelInput} from '../../FloatingLabelInput/FloatingLabelInput';

const SegmentedControl = styled.div`
    display: flex;
    border: 1px solid ${({theme}) => theme.colors.borderColor};
    border-radius: ${({theme}) => theme.borderRadius};
    overflow: hidden;
    margin-bottom: 2rem;
`;

const SegmentButton = styled.button<{ isActive: boolean }>`
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

const CardFormGrid = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 1rem;
    align-items: center;
`;

const CouponSection = styled.div`
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid ${({theme}) => theme.colors.borderColor};
`;

const CouponInput = styled.input`
    flex-grow: 1;
    border: 1px solid ${({theme}) => theme.colors.borderColor};
    border-radius: ${({theme}) => theme.borderRadius};
    padding: 0.75rem;
    font-size: 1rem;
`;

const ApplyButton = styled.button`
    background-color: transparent;
    color: ${({theme}) => theme.colors.primary};
    border: 1px solid ${({theme}) => theme.colors.primary};
    border-radius: ${({theme}) => theme.borderRadius};
    padding: 0.75rem 1.5rem;
    font-weight: 600;
    cursor: pointer;

    &:hover {
        background-color: ${({theme}) => theme.colors.bgSubtle};
    }
`;

const PayButton = styled(motion.button)`
    background-color: ${({theme}) => theme.colors.primary};
    color: ${({theme}) => theme.colors.bgWhite};
    border: none;
    border-radius: ${({theme}) => theme.borderRadius};
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
    total: number;
    isProcessing: boolean;
    onApplyCoupon: (code: string) => void;
    onPaymentMethodChange: (method: string) => void;
    onComplete: () => void;
    appliedCouponCode?: string;
}

export const Payment: React.FC<PaymentProps> = ({
                                                    total,
                                                    isProcessing,
                                                    onApplyCoupon,
                                                    onPaymentMethodChange,
                                                    onComplete,
                                                    appliedCouponCode,
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

    return (
        <div>
            <SegmentedControl>
                <SegmentButton isActive={selectedMethod === 'gpay'} onClick={() => handleMethodClick('gpay')}>
                    {appTexts.paymentGPay}
                </SegmentButton>
                <SegmentButton isActive={selectedMethod === 'card'} onClick={() => handleMethodClick('card')}>
                    {appTexts.paymentCard}
                </SegmentButton>
                <SegmentButton isActive={selectedMethod === 'crypto'} onClick={() => handleMethodClick('crypto')}>
                    {appTexts.paymentCrypto}
                </SegmentButton>
            </SegmentedControl>

            <ContentContainer>
                {selectedMethod === 'card' && (
                    <CardFormGrid>
                        <FloatingLabelInput label={appTexts.labelCardNumber} name="card" value="" onChange={() => {
                        }}/>
                        <FloatingLabelInput label={appTexts.labelExpiry} name="expiry" value="" onChange={() => {
                        }}/>
                        <FloatingLabelInput label={appTexts.labelCVC} name="cvc" value="" onChange={() => {
                        }}/>
                    </CardFormGrid>
                )}
                {selectedMethod !== 'card' && <p>{appTexts.cardNotImplemented}</p>}
            </ContentContainer>

            <CouponSection>
                <CouponInput
                    placeholder={appTexts.couponLabel}
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                />
                <ApplyButton onClick={handleApplyClick}>
                    {appliedCouponCode ? appTexts.couponApplied : appTexts.couponButton}
                </ApplyButton>
            </CouponSection>

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
                    `${appTexts.payNow} $${total.toFixed(2)}`
                )}
            </PayButton>
        </div>
    );
};