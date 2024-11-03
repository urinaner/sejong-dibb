import styled from 'styled-components';

interface StyledButtonProps {
  isActive?: boolean;
}

const media = {
  mobile: '@media(max-width: 768px)',
  tablet: '@media(max-width: 1024px)',
};

export const Container = styled.div`
  max-width: 1400px;
  width: 95%;
  margin: 0 auto;
  padding: 40px 20px;
`;

export const Navigation = styled.nav`
  display: flex;
  border-bottom: 2px solid #e2e8f0;
  margin-bottom: 30px;
`;

export const NavButton = styled.button<StyledButtonProps>`
  padding: 12px 32px;
  font-size: 1.1rem;
  border: none;
  background: ${(props) => (props.isActive ? '#1a202c' : 'transparent')};
  color: ${(props) => (props.isActive ? 'white' : 'inherit')};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) => (props.isActive ? '#1a202c' : '#f7fafc')};
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 1.1rem;
`;

export const Th = styled.th`
  padding: 16px 24px;
  text-align: left;
  border-bottom: 2px solid #e2e8f0;
  font-weight: 600;
`;

export const Td = styled.td`
  padding: 16px 24px;
  border-bottom: 1px solid #e2e8f0;
  line-height: 1.5;
`;

export const Tr = styled.tr`
  &:hover {
    background-color: #f8fafc;
  }
`;

export const ViewCount = styled.td`
  text-align: right;
  padding: 16px 24px;
  border-bottom: 1px solid #e2e8f0;
`;

export const NoticeTag = styled.span`
  display: inline-block;
  padding: 6px 12px;
  background-color: #e53e3e;
  color: white;
  border-radius: 9999px;
  font-size: 0.95rem;
`;

export const NewTag = styled.span`
  display: inline-block;
  margin-left: 12px;
  padding: 4px 10px;
  background-color: #3182ce;
  color: white;
  border-radius: 4px;
  font-size: 0.85rem;
`;

export const TitleLink = styled.span`
  cursor: pointer;
  font-weight: 500;
  &:hover {
    color: #3182ce;
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 40px;
  padding: 20px 0;
`;

export const PageButton = styled.button<StyledButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  height: 40px;
  padding: 8px;
  font-size: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background: ${(props) => (props.isActive ? '#2D3748' : 'white')};
  color: ${(props) => (props.isActive ? 'white' : '#4A5568')};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${(props) => (props.isActive ? '#2D3748' : '#EDF2F7')};
    border-color: ${(props) => (props.isActive ? '#2D3748' : '#CBD5E0')};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    background-color: #edf2f7;
    color: #a0aec0;
    border-color: #e2e8f0;
  }

  // 처음, 마지막 버튼 스타일
  &:first-child,
  &:last-child {
    font-weight: bold;
  }

  // 이전, 다음 버튼 스타일
  &:nth-child(2),
  &:nth-last-child(2) {
    font-weight: bold;
  }

  // 활성화된 페이지 버튼에 그림자 효과 추가
  ${(props) =>
    props.isActive &&
    `
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  `}

  ${media.mobile} {
    min-width: 36px;
    height: 36px;
    font-size: 0.9rem;
    padding: 6px;
  }
`;

export const ResponsiveTable = styled(Table)`
  ${media.mobile} {
    font-size: 0.9rem;

    ${Td}, ${Th} {
      padding: 12px 16px;
    }
  }
`;

export const ErrorMessage = styled.div`
  color: #ff4444;
  text-align: center;
  padding: 1rem;
  margin: 1rem 0;
  background-color: #ffeeee;
  border-radius: 4px;
`;

export const LoadingSpinner = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;
  font-size: 1.1rem;
`;
