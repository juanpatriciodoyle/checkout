import { createGlobalStyle } from 'styled-components';
import theme from './theme';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: ${theme.fonts.body};
    background-color: ${theme.colors.bgWhite};
    color: ${theme.colors.textMain};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }
`;

export default GlobalStyle;