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
