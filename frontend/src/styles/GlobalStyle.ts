import { createGlobalStyle, css } from 'styled-components';
const globalOverrides = css`
  [class*='Container'],
  [class*='Wrapper'],
  [class*='Content'],
  [class*='Layout'] {
    &:not(.preserve-style) {
      width: 100% !important;
      margin: 0 !important;
      padding: 0 !important;
    }
  }
`;
export const GlobalStyle = createGlobalStyle`
    ${globalOverrides}
    @import url('https://cdn.rawgit.com/moonspam/NanumSquare/master/nanumsquare.css');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    /* font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; */
    font-family: 'NanumSquare', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  html, body {
      overflow-x: hidden;  // 추가
      width: 100%;        // 추가
      max-width: 100%;    // 추가
  }
`;
