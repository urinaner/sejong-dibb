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
  align-items: center;
  width: 90%;
  max-width: 500px; // 최대 폼 너비 제한
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  box-sizing: border-box; // 패딩이 너비에 포함되도록 설정
`;

export const Title = styled.h2`
  font-size: 24px;
  color: #333;
  text-align: center;
`;

export const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: calc(100% - 20px); // 모든 패딩 공간을 뺀 순수 너비
  font-size: 16px;
`;

export const Button = styled.button`
  background-color: #0056b3;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  margin: 0;
  margin-bottom: 2%;

  transition: background-color 0.3s;

  &:hover {
    background-color: #004494;
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0;
  margin: 0;
`;

export const LinkButton = styled(Button)`
  background-color: #666;
  &:hover {
    background-color: #555;
  }
  width: 49%;
  margin: 0;
`;
