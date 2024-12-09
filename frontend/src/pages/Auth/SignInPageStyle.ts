import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: calc(100vh - 64px);
  margin-top: 64px;
  position: relative;
  padding: 40px 20px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 20px;
    margin-top: 32px;
  }
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  padding: 60px 50px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background: #ffffff;

  @media (max-width: 768px) {
    padding: 40px 30px;
    max-width: 100%;
  }

  @media (max-width: 480px) {
    padding: 30px 20px;
  }
`;

export const LogoContainer = styled.div`
  margin-bottom: 40px;
  text-align: center;

  img {
    width: 140px;
    height: auto;
    margin-bottom: 16px;

    @media (max-width: 768px) {
      width: 120px;
    }

    @media (max-width: 480px) {
      width: 100px;
    }
  }
`;
export const DepartmentText = styled.p`
  text-align: center;
  color: #1a1a1a;
  font-size: 28px;
  margin: 0 0 20px 0;
  font-weight: 700;
  letter-spacing: -0.5px;

  @media (max-width: 768px) {
    font-size: 24px;
  }

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 16px 20px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 18px;
  box-sizing: border-box;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #0056b3;
    box-shadow: 0 0 0 2px rgba(0, 86, 179, 0.1);
  }

  &::placeholder {
    color: #aaa;
  }

  @media (max-width: 768px) {
    padding: 14px 16px;
    font-size: 16px;
    margin-bottom: 16px;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 16px;
  background-color: #0056b3;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-bottom: 20px;

  &:hover {
    background-color: #004494;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    padding: 14px;
    font-size: 16px;
    margin-bottom: 16px;
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  width: 100%;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 12px;
  }
`;

export const LinkButton = styled(Button)`
  flex: 1;
  background-color: #6c757d;
  font-size: 16px;
  margin-bottom: 0;
  padding: 14px;

  &:hover {
    background-color: #5a6268;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 12px;
  }
`;

export const ErrorMessage = styled.div`
  color: #dc3545;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
  font-size: 16px;
  text-align: center;

  @media (max-width: 768px) {
    padding: 12px;
    font-size: 14px;
    margin-bottom: 16px;
  }
`;

export const Tabs = styled.div`
  display: flex;
  margin-bottom: 30px;
  border-bottom: 1px solid #dee2e6;

  @media (max-width: 768px) {
    margin-bottom: 24px;
  }
`;

export const Tab = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 16px;
  background: none;
  border: none;
  border-bottom: 2px solid
    ${(props) => (props.active ? '#0056b3' : 'transparent')};
  color: ${(props) => (props.active ? '#0056b3' : '#666')};
  font-weight: ${(props) => (props.active ? '600' : '400')};
  font-size: 18px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: #0056b3;
  }

  @media (max-width: 768px) {
    padding: 14px;
    font-size: 16px;
  }

  @media (max-width: 480px) {
    padding: 12px;
    font-size: 14px;
  }
`;
