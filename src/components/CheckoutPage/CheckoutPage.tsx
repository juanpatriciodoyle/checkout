import React from 'react';
import styled from 'styled-components';
import { appTexts } from '../../constants/text';

const PageContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.bgSubtle};
  min-height: 100vh;
  padding: 2rem;
`;

const CheckoutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (min-width: 1024px) {
    grid-template-columns: 3fr 2fr; /* 60/40 split */
  }
`;

const LeftColumn = styled.div`
  width: 100%;
`;

const RightColumn = styled.div`
  width: 100%;

  @media (min-width: 1024px) {
    position: sticky;
    top: 20px;
    align-self: start;
  }
`;

const Placeholder = styled.div`
  background-color: ${({ theme }) => theme.colors.bgWhite};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 2rem;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CheckoutPage = () => {
    return (
        <PageContainer>
            <CheckoutGrid>
                <LeftColumn>
                    <Placeholder>{appTexts.accordionPlaceholder}</Placeholder>
                </LeftColumn>
                <RightColumn>
                    <Placeholder>{appTexts.orderSummaryPlaceholder}</Placeholder>
                </RightColumn>
            </CheckoutGrid>
        </PageContainer>
    );
};

export default CheckoutPage;