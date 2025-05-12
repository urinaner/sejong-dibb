import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  /* 파일명에 맞게 수정된 폰트 선언 */
  @font-face {
    font-family: 'NanumSquare';
    font-style: normal;
    font-weight: 400;
    src: local('NanumSquare Regular'),
    url('/fonts/NanumSquareR.otf') format('opentype'),
    url('/fonts/NanumSquareR.ttf') format('truetype');
    font-display: block;
  }

  @font-face {
    font-family: 'NanumSquare';
    font-style: normal;
    font-weight: 700;
    src: local('NanumSquare Bold'),
    url('/fonts/NanumSquareB.otf') format('opentype'),
    url('/fonts/NanumSquareB.ttf') format('truetype');
    font-display: block;
  }

  @font-face {
    font-family: 'NanumSquare';
    font-style: normal;
    font-weight: 800;
    src: local('NanumSquare ExtraBold'),
    url('/fonts/NanumSquareEB.otf') format('opentype'),
    url('/fonts/NanumSquareEB.ttf') format('truetype');
    font-display: block;
  }

  @font-face {
    font-family: 'NanumSquare';
    font-style: normal;
    font-weight: 300;
    src: local('NanumSquare Light'),
    url('/fonts/NanumSquareL.otf') format('opentype'),
    url('/fonts/NanumSquareL.ttf') format('truetype');
    font-display: block;
  }

  /* 원래 CDN import 제거 (FOUT 문제 방지를 위해) */
  /* @import url('https://cdn.rawgit.com/moonspam/NanumSquare/master/nanumsquare.css'); */

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'NanumSquare', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif !important;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }

  html, body {
    overflow-x: hidden;
    width: 100%;
    max-width: 100%;
  }

  /* Windows 환경 폰트 최적화 */
  @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none), (min--moz-device-pixel-ratio:0) {
    body {
      letter-spacing: -0.02em;
    }

    strong, b, h1, h2, h3, h4, h5, h6 {
      font-weight: 800 !important; /* 윈도우에서는 더 굵게 표시 */
    }
  }

  /* Chrome, Safari, Edge에서의 폰트 렌더링 개선 */
  @media screen and (-webkit-min-device-pixel-ratio:0) {
    body {
      -webkit-text-stroke: 0.001px rgba(0, 0, 0, 0.1);
    }
  }

  /* 모바일 최적화 */
  @media (max-width: 768px) {
    .GWQod {
      padding: 0 !important;
    }
  }

  /* 강조 텍스트 및 헤딩에 대한 추가 스타일 */
  strong, b {
    font-weight: 700;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    letter-spacing: -0.01em;
  }
`;
