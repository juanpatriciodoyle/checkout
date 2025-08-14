import React from 'react';
import styled from 'styled-components';
import { Sparkles, Loader } from 'lucide-react';
import { ContactInfo } from '../../../types';
import { appTexts } from '../../../constants/text';
import { FloatingLabelInput } from '../../FloatingLabelInput/FloatingLabelInput';

const Button = styled.button`
    border: none;
    border-radius: ${({ theme }) => theme.borderRadius};
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
`;

const LoginButton = styled(Button)`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.primary};
    border: 1px solid ${({ theme }) => theme.colors.primary};
    width: 100%;
    margin-bottom: 2rem;

    &:hover {
        background-color: ${({ theme }) => theme.colors.bgSubtle};
    }
`;

const ContinueButton = styled(Button)`
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.bgWhite};

    &:hover {
        opacity: 0.9;
    }
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;
`;

const FormGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0 1rem;
`;

const FullWidthField = styled.div`
    grid-column: 1 / -1;
`;

const LoaderIcon = styled(Loader)`
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

interface StepDeliveryInfoProps {
    contactInfo: ContactInfo;
    loading: boolean;
    onInfoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onVivreLogin: () => void;
    onContinue: () => void;
}

export const DeliveryInfo: React.FC<StepDeliveryInfoProps> = ({
                                                                  contactInfo,
                                                                  loading,
                                                                  onInfoChange,
                                                                  onVivreLogin,
                                                                  onContinue,
                                                              }) => {
    return (
        <div>
            <LoginButton onClick={onVivreLogin} disabled={loading}>
                {loading ? (
                    <>
                        <LoaderIcon size={20} />
                        {appTexts.loading}
                    </>
                ) : (
                    <>
                        <Sparkles size={20} />
                        {appTexts.loginWithVivre}
                    </>
                )}
            </LoginButton>
            <form>
                <FullWidthField>
                    <FloatingLabelInput
                        name="name"
                        label={appTexts.labelName}
                        value={contactInfo.name}
                        onChange={onInfoChange}
                    />
                </FullWidthField>
                <FullWidthField>
                    <FloatingLabelInput
                        name="email"
                        label={appTexts.labelEmail}
                        value={contactInfo.email}
                        onChange={onInfoChange}
                        type="email"
                    />
                </FullWidthField>
                <FullWidthField>
                    <FloatingLabelInput
                        name="address"
                        label={appTexts.labelAddress}
                        value={contactInfo.address}
                        onChange={onInfoChange}
                    />
                </FullWidthField>
                <FullWidthField>
                    <FloatingLabelInput
                        name="phone"
                        label={appTexts.labelPhone}
                        value={contactInfo.phone}
                        onChange={onInfoChange}
                        type="tel"
                    />
                </FullWidthField>
                <FormGrid>
                    <FloatingLabelInput
                        name="city"
                        label={appTexts.labelCity}
                        value={contactInfo.city}
                        onChange={onInfoChange}
                    />
                    <FloatingLabelInput
                        name="zip"
                        label={appTexts.labelZip}
                        value={contactInfo.zip}
                        onChange={onInfoChange}
                    />
                </FormGrid>
            </form>
            <ButtonWrapper>
                <ContinueButton onClick={onContinue}>
                    {appTexts.continueToPayment}
                </ContinueButton>
            </ButtonWrapper>
        </div>
    );
};