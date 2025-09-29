import React from 'react';
import styled from 'styled-components';
import {CheckoutPage} from './components/CheckoutPage/CheckoutPage';

const AppWrapper = styled.div`
`;

function App() {

    const isLocalhost = Boolean(
        window.location.hostname === 'localhost' ||
        window.location.hostname === '[::1]' ||
        window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
    );

    return (
        <AppWrapper>
            <CheckoutPage isLocalhost={isLocalhost}/>
        </AppWrapper>
    );
}

export default App;