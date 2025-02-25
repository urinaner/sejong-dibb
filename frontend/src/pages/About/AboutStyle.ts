import styled from 'styled-components';

// 전역 컨테이너 내부에서도 중앙 정렬이 제대로 작동하도록 수정
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box; // 추가: 패딩이 너비 계산에 포함되도록 설정
`;

export const Content = styled.div`
  text-align: center;
  width: 100%;
  display: flex; // 추가: flexbox 사용
  flex-direction: column; // 추가: 세로 방향 정렬
  align-items: center; // 추가: 가로축 중앙 정렬
`;

export const Title = styled.h2`
  font-size: 2.8rem;
  font-weight: 800;
  margin-bottom: 30px;
  width: 100%; // 추가: 전체 너비 사용

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const Description = styled.p`
  font-size: 1.2rem;
  margin-bottom: 50px;
  line-height: 1.6;
  max-width: 800px;
  width: 100%; // 추가: 전체 너비에서 max-width 제한
  margin: 0 auto 50px;
  box-sizing: border-box; // 추가: 패딩이 너비 계산에 포함되도록 설정

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0 10px;
  }
`;

export const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; // 추가: 가로축 중앙 정렬
  gap: 30px;
  width: 100%;
`;

export const InfoCard = styled.div`
  padding: 30px;
  border: none;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.05);
  max-width: 900px;
  width: 100%; // 수정: 80vw에서 100%로 변경
  box-sizing: border-box; // 추가: 패딩이 너비 계산에 포함되도록 설정

  @media (max-width: 768px) {
    padding: 20px;
    margin: 0;
    width: 100%; // 추가: 작은 화면에서 전체 너비 사용
  }
`;

export const InfoTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 20px;
  padding-bottom: 12px;
  width: 100%; // 추가: 전체 너비 사용

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const MarkdownContainer = styled.div`
  line-height: 1.6;
  font-size: 1rem;
  text-align: left;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
  box-sizing: border-box; // 추가: 패딩이 너비 계산에 포함되도록 설정

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 1.5em;
    margin-bottom: 0.5em;
    font-weight: bold;
  }

  p {
    margin: 0.8em 0;
  }

  ul,
  ol {
    margin: 1em 0;
    padding-left: 1.2em;
  }

  li {
    margin-bottom: 0.5em;
  }

  blockquote {
    margin: 1em 0;
    padding-left: 1em;
    border-left: 4px solid #ccc;
    font-style: italic;
    background-color: #f9f9f9;
  }

  code {
    background-color: #f5f5f5;
    padding: 0.2em 0.4em;
    border-radius: 4px;
  }

  pre {
    background-color: #f5f5f5;
    padding: 1em;
    border-radius: 4px;
    overflow-x: auto;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 0 10px;
  }
`;
