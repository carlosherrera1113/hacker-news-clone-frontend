import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
* {
    outline: none;
    box-sizing: inherit;
}
html {
    font-size: 62.5%;
    box-sizing: border-box;
    @media ${({ theme }) => theme.mediaQueries.largest} {
        font-size: 60%;
    }
    @media ${({ theme }) => theme.mediaQueries.large} {
        font-size: 57.5%;
    }
    @media ${({ theme }) => theme.mediaQueries.small} {
        font-size: 55%;
    }
    @media ${({ theme }) => theme.mediaQueries.smallest} {
        font-size: 50%;
    }
}
body {
    background-color: white;
    height: 100%;
    margin: 0;
    width: 100%;
    overflow: visible;
}
`;

export default GlobalStyle;
