// styles.ts
import styled from 'styled-components';

// 테스트용 버튼 스타일 정의
export const Button = styled.button<{ primary?: boolean }>`
  background-color: ${({ primary }) => (primary ? '#007BFF' : '#FFF')};
  color: ${({ primary }) => (primary ? '#FFF' : '#007BFF')};
  border: 2px solid #007bff;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: ${({ primary }) => (primary ? '#0056b3' : '#e6e6e6')};
  }
`;

export const Footer = styled.footer`
  width: 100%;
  padding: 40px;
  background-color: #d7e8ff;

  /* 1180px 미만일 때 */
  @media (max-width: 1180px) {
    width: 1180px;
  }

  /* 휴대폰 */
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const FooterContainer = styled.div`
  display: flex;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;

export const Address = styled.div`
  flex: 1 0 0;
  font-size: 16px;
  font-weight: 500;
  font-family: 'Plus Jakarta Sans';

  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

export const SightMap = styled.div`
  display: flex;
  flex: 2 0 0;
  cursor: pointer;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const SightMapHeader = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-right: 20px;
  font-size: 20px;
  font-family: 'Noto Serif KR', serif;
  font-weight: 600;

  @media (max-width: 768px) {
    flex-direction: row;
  }
`;

export const SightMapContent = styled.a`
  font-size: 16px;
  font-weight: 300;
  margin-top: 16px;
  font-family: 'Noto Sans';
`;

export const Copyright = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid grey;
  margin-top: 36px;
  padding-top: 36px;
  font-weight: 600;
`;
