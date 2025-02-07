// AboutStyle.ts
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

export const Content = styled.div`
  text-align: center;
  padding: 20px;
  width: 100%;
`;

export const Title = styled.h2`
  font-size: 2.8rem;
  font-weight: 800;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    font-size: 2rem; /* 작은 화면에서 폰트 크기 조정 */
  }
`;

export const Description = styled.p`
  font-size: 1.2rem;
  margin-bottom: 50px;
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto 50px;

  @media (max-width: 768px) {
    font-size: 1rem; /* 작은 화면에서 폰트 크기 조정 */
    padding: 0 10px;
  }
`;

export const InfoSection = styled.div`
  display: flex;
  flex-direction: column; /* 세로 방향으로 정렬 */
  gap: 30px;
  width: 100%;
`;

export const InfoCard = styled.div`
  padding: 30px;
  border: none;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.05);
  transition:
    box-shadow 0.3s ease,
    transform 0.3s ease;
  max-width: 900px;
  width: 80vw;
  margin: 0 auto;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-4px);
  }

  @media (max-width: 768px) {
    padding: 20px; /* 작은 화면에서 패딩 조정 */
    margin: 0 10px;
  }
`;

export const InfoTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 20px;
  border-bottom: 3px solid currentColor;
  padding-bottom: 12px;

  @media (max-width: 768px) {
    font-size: 1.5rem; /* 작은 화면에서 폰트 크기 조정 */
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
    font-size: 0.9rem; /* 작은 화면에서 폰트 크기 조정 */
    padding: 0 10px; /* 패딩 조정 */
  }
`;
