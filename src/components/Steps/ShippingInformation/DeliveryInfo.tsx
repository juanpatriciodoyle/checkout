import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ContactInfo } from '../../../types';
import { appTexts } from '../../../constants/text';
import { FloatingLabelInput } from '../../FloatingLabelInput/FloatingLabelInput';

const FlipContainer = styled.div`
    width: 100%;
    height: 52px;
    perspective: 1000px;
    margin-bottom: 2rem;
`;

const Card = styled(motion.div)`
    width: 100%;
    height: 100%;
    position: relative;
    transform-style: preserve-3d;
`;

const CardFace = styled(motion.div)`
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: ${({ theme }) => theme.sizing.borderRadius.cards};
`;

const CardFront = styled(CardFace)``;

const CardBack = styled(CardFace)`
    background-color: ${({ theme }) => theme.colors.bgSubtle};
    border: 1px solid ${({ theme }) => theme.colors.borderColor};
    transform: rotateY(180deg);
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 1rem;
    padding: 0 1rem;
    box-sizing: border-box;
`;

const Avatar = styled.div`
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.bgSubtle};
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const UserInfo = styled.div`
    text-align: left;
    line-height: 1.2;
`;

const UserName = styled.div`
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textMain};
`;

const UserEmail = styled.div`
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.textLight};
`;

const ChangeLink = styled.button`
    background: none;
    border: none;
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 600;
    cursor: pointer;
    font-size: 0.875rem;
    text-decoration: underline;
`;


const Button = styled.button`
    border: none;
    border-radius: ${({ theme }) => theme.sizing.borderRadius.buttons};
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    transition: opacity 0.2s;

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

const LoginButton = styled(Button)`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.primary};
    border: 1px solid ${({ theme }) => theme.colors.primary};
    width: 100%;
    height: 100%;
    box-sizing: border-box;

    &:hover:not(:disabled) {
        background-color: ${({ theme }) => theme.colors.bgSubtle};
    }
`;

const ContinueButton = styled(Button)`
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.bgWhite};

    &:hover:not(:disabled) {
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

const LoginIcon = styled.img`
    width: 20px;
    height: 20px;
`;

interface StepDeliveryInfoProps {
    contactInfo: ContactInfo;
    isLoggedIn: boolean;
    onInfoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onVivreLogin: () => void;
    onLogout: () => void;
    onContinue: () => void;
    isFormValid: boolean;
}

export const DeliveryInfo: React.FC<StepDeliveryInfoProps> = ({
                                                                  contactInfo,
                                                                  isLoggedIn,
                                                                  onInfoChange,
                                                                  onVivreLogin,
                                                                  onLogout,
                                                                  onContinue,
                                                                  isFormValid,
                                                              }) => {

    return (
        <div>
            <FlipContainer>
                <Card
                    animate={{ rotateY: isLoggedIn ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    <CardFront>
                        <LoginButton onClick={onVivreLogin} disabled={isLoggedIn}>
                            <LoginIcon src={`${process.env.PUBLIC_URL}/vivre/Logo.png`} alt="Vivre Logo" />
                            {appTexts.loginWithVivre}
                        </LoginButton>
                    </CardFront>
                    <CardBack>
                        <Avatar>
                            <img src={`${process.env.PUBLIC_URL}/vivre/Kate.png`} alt="Kate's Profile" />
                        </Avatar>
                        <UserInfo>
                            <UserName>{contactInfo.name}</UserName>
                            <UserEmail>{contactInfo.email}</UserEmail>
                        </UserInfo>
                        <ChangeLink onClick={onLogout}>Change</ChangeLink>
                    </CardBack>
                </Card>
            </FlipContainer>

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
                <ContinueButton onClick={onContinue} disabled={!isFormValid}>
                    {appTexts.continueToShippingMethod}
                </ContinueButton>
            </ButtonWrapper>
        </div>
    );
};