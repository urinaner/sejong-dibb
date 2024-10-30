// styles/NoticeBoard.styles.ts
import styled from 'styled-components';

interface StyledButtonProps {
  isActive?: boolean;
}

// Container
export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

// Navigation
export const Navigation = styled.nav`
  display: flex;
  border-bottom: 1px solid #e2e8f0;
  margin-bottom: 20px;
`;

export const NavButton = styled.button<StyledButtonProps>`
  padding: 10px 24px;
  border: none;
  background: ${(props) => (props.isActive ? '#1a202c' : 'transparent')};
  color: ${(props) => (props.isActive ? 'white' : 'inherit')};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) => (props.isActive ? '#1a202c' : '#f7fafc')};
  }
`;

// Table
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const Th = styled.th`
  padding: 12px 16px;
  text-align: left;
  border-bottom: 2px solid #e2e8f0;
`;

export const Td = styled.td`
  padding: 12px 16px;
  border-bottom: 1px solid #e2e8f0;
`;

export const Tr = styled.tr`
  &:hover {
    background-color: #f8fafc;
  }
`;

export const ViewCount = styled.td`
  text-align: right;
  padding: 12px 16px;
  border-bottom: 1px solid #e2e8f0;
`;

// Tags
export const NoticeTag = styled.span`
  display: inline-block;
  padding: 4px 8px;
  background-color: #e53e3e;
  color: white;
  border-radius: 9999px;
  font-size: 0.875rem;
`;

export const NewTag = styled.span`
  display: inline-block;
  margin-left: 8px;
  padding: 4px 8px;
  background-color: #3182ce;
  color: white;
  border-radius: 4px;
  font-size: 0.75rem;
`;

export const TitleLink = styled.span`
  cursor: pointer;
  &:hover {
    color: #3182ce;
  }
`;

// Pagination
export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 20px;
`;

export const PageButton = styled.button<StyledButtonProps>`
  padding: 8px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  background: ${(props) => (props.isActive ? '#1a202c' : 'white')};
  color: ${(props) => (props.isActive ? 'white' : 'inherit')};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) => (props.isActive ? '#1a202c' : '#f7fafc')};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;
