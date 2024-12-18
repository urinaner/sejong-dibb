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
  top: 0;
  left: 0;
  right: 0;
  padding: 20px;
  box-sizing: border-box;
  z-index: 10;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  padding: 40px 30px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 30px 20px;
    max-width: 100%;
  }
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin: 0 0 30px 0;
  text-align: center;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 15px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #0056b3;
    box-shadow: 0 0 0 2px rgba(0, 86, 179, 0.1);
  }

  &::placeholder {
    color: #aaa;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #0056b3;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-bottom: 15px;

  &:hover {
    background-color: #004494;
  }

  &:active {
    background-color: #003872;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  width: 100%;

  @media (max-width: 768px) {
    padding: 30px 20px;
    max-width: calc(100% - 40px); // 변경: 양쪽 여백 고려
    margin: 20px; // 추가: 모바일에서 여백 추가
  }
`;

export const LinkButton = styled(Button)`
  flex: 1;
  background-color: #6c757d;
  font-size: 14px;
  margin-bottom: 0;
  padding: 10px;

  &:hover {
    background-color: #5a6268;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const ErrorMessage = styled.div`
  color: #dc3545;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 15px;
  font-size: 14px;
  text-align: center;
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #dee2e6;
  margin: 20px 0;
`;
