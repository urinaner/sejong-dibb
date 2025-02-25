import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

    @media (max-width: 768px) {
        .GWQod {
            padding: 0 !important;
        }
    }
    
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

    @media (max-width: 768px) {
        .GWQod {
            padding: 0 !important;
        }

        /* 또는 필요한 경우 내부 콘텐츠에 패딩 추가 */
        .your-content-class {
            padding: 10px;
        }
    }

`;
