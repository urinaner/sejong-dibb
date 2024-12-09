import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
`;

export const LogoContainer = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;

  img {
    width: 120px;
    height: auto;
    margin-bottom: 1rem;
  }
`;

export const DepartmentText = styled.p`
  color: #1a1a1a;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  text-align: center;
`;

export const Form = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 420px;
`;

export const Tabs = styled.div`
  display: flex;
  margin: -2rem -2rem 2rem -2rem;
  border-bottom: 1px solid #e2e8f0;
`;

export const Tab = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 1rem;
  background: ${(props) => (props.active ? 'white' : '#f8fafc')};
  border: none;
  border-radius: 12px 12px 0 0;
  color: ${(props) => (props.active ? '#1a1a1a' : '#666666')};
  font-weight: ${(props) => (props.active ? '600' : '400')};
  font-size: 0.95rem;
  cursor: pointer;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.875rem 1rem;
  margin-bottom: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.95rem;

  &:focus {
    outline: none;
    border-color: #3182ce;
    box-shadow: 0 0 0 2px rgba(49, 130, 206, 0.1);
  }

  &::placeholder {
    color: #a0aec0;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 0.875rem;
  background-color: #3182ce;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 0.5rem;

  &:disabled {
    background-color: #cbd5e0;
    cursor: not-allowed;
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.25rem;
`;

export const LinkButton = styled.button`
  background: none;
  border: none;
  color: #4a5568;
  font-size: 0.875rem;
  cursor: pointer;
  padding: 0.5rem 0.75rem;
  text-decoration: underline;

  &:hover {
    color: #2d3748;
  }
`;

export const ErrorMessage = styled.div`
  color: #e53e3e;
  background-color: #fff5f5;
  border: 1px solid #fed7d7;
  border-radius: 8px;
  padding: 0.875rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  text-align: center;
`;

export const NoticeContainer = styled.div`
  background-color: #f8fafc;
  padding: 1rem;
  margin-bottom: 1.25rem;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
`;

export const NoticeTitle = styled.p`
  color: #1a1a1a;
  font-weight: 600;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
`;

export const NoticeList = styled.ul`
  margin: 0;
  padding-left: 1.25rem;
`;

export const NoticeItem = styled.li`
  color: #4a5568;
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: 0.375rem;

  &:last-child {
    margin-bottom: 0;
  }
`;
