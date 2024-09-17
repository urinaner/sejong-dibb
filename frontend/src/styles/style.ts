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

export const Footer = styled.footer``;

export const FooterContainer = styled.footer`
  display: flex;
`;

export const SightMap = styled.div`
  display: flex;
`;

export const SightMapHeader = styled.footer`
  margin-right: 20px;
`;

export const SightMapContent = styled.footer``;

export const Address = styled.div``;

export const Copyright = styled.div``;
