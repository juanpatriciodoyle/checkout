import React from 'react';
import styled from 'styled-components';

const BnplContainer = styled.div`
    box-sizing: border-box;
    text-align: center;
    padding: 2rem 1rem;
    border: 1px solid ${({theme}) => theme.colors.borderColor};
    border-radius: ${({theme}) => theme.sizing.borderRadius.cards};
`;

const ProviderLogo = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;

    &::before {
        content: 'KLARNA.';
        font-family: 'Georgia', serif;
        background-color: #FFB3C7;
        color: black;
        padding: 0.5rem 1rem;
        border-radius: 4px;
    }
`;

const Headline = styled.h4`
    font-size: 1.125rem;
    margin: 0 0 0.5rem;
`;

const BodyText = styled.p`
    margin: 0 0 1.5rem;
    color: ${({theme}) => theme.colors.textLight};
`;

const LearnMoreLink = styled.a`
    color: ${({theme}) => theme.colors.primary};
    text-decoration: none;
    font-weight: 600;

    &:hover {
        text-decoration: underline;
    }
`;

export const BnplPaymentView = () => {
    return (
        <BnplContainer>
            <ProviderLogo/>
            <Headline>Pay in 3 interest-free installments.</Headline>
            <BodyText>You will be redirected to Klarna to securely complete your purchase.</BodyText>
            <LearnMoreLink href="#" target="_blank" rel="noopener noreferrer">Learn More</LearnMoreLink>
        </BnplContainer>
    );
};