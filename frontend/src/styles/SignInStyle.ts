import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f4f5f7;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 400px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  padding: 40px;
  background-color: white;
  border-radius: 10px;
`;

export const Title = styled.h2`
  font-size: 24px;
  color: #333;
  text-align: center;
  margin-bottom: 30px;
`;

export const Input = styled.input`
  padding: 15px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

export const Button = styled.button`
  background-color: #0056b3;
  color: white;
  padding: 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #004494;
  }
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export const CheckboxLabel = styled.label`
  margin-left: 10px;
  font-size: 14px;
`;

export const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const LinkButton = styled(Button)`
  background-color: #666;
  &:hover {
    background-color: #555;
  }
`;
