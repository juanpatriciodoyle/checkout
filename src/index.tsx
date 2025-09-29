import React from 'react';
import ReactDOM from 'react-dom/client';
import {ThemeProvider} from 'styled-components';
import App from './App';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';
import reportWebVitals from './reportWebVitals';
import {SettingsProvider} from './utils/dx/settingsContext';
import './index.css';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <SettingsProvider>
            <ThemeProvider theme={theme}>
                <GlobalStyle/>
                <App/>
            </ThemeProvider>
        </SettingsProvider>
    </React.StrictMode>
);

reportWebVitals();