import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    @import url('https://cdn.rawgit.com/moonspam/NanumSquare/master/nanumsquare.css');

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        font-family: 'NanumSquare', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    html, body {
        overflow-x: hidden;
        width: 100%;
        max-width: 100%;
    }
`;
