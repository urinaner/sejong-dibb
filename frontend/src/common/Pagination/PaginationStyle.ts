import styled from 'styled-components';

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 40px;
  padding: 20px 0;

  @media (max-width: 768px) {
    gap: 4px;
    margin-top: 20px;
    padding: 10px 0;
  }
`;

interface StyledButtonProps {
  isActive?: boolean;
}

export const PageButton = styled.button<StyledButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 36px;
  height: 36px;
  padding: 0.25rem;
  font-size: 0.9rem;
  border: 1px solid ${(props) => (props.isActive ? '#666' : '#ddd')};
  background: ${(props) => (props.isActive ? '#666' : 'white')};
  color: ${(props) => (props.isActive ? 'white' : '#333')};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${(props) => (props.isActive ? '#555' : '#f8f9fa')};
    border-color: #666;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    background-color: #f8f9fa;
    color: #adb5bd;
    border-color: #dee2e6;

    &:hover {
      background-color: #f8f9fa;
      color: #adb5bd;
      border-color: #dee2e6;
    }
  }

  @media (max-width: 768px) {
    min-width: 32px;
    height: 32px;
    font-size: 0.85rem;
  }
`;
