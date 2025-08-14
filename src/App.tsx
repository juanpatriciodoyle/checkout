import React from 'react';
import styled from 'styled-components';
import { appTexts } from './constatns/text';

const AppContainer = styled.div`
  text-align: center;
  padding: 2rem;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
`;

function App() {
    return (
        <AppContainer>
            <Title>{appTexts.title}</Title>
        </AppContainer>
    );
}

export default App;