import styled from 'styled-components';

export interface ButtonProps {
  variant?: 'primary' | 'secondary';
}
export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

export const Header = styled.div`
  margin-bottom: 30px;
  h1 {
    font-size: 1.8rem;
    font-weight: 600;
    color: #1a202c;
    margin-bottom: 8px;
  }
`;

export const FormContainer = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 24px;
`;

export const InputGroup = styled.div`
  margin-bottom: 20px;

  label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: #4a5568;
  }
`;

export const TitleInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 1rem;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #3182ce;
    box-shadow: 0 0 0 1px #3182ce;
  }
`;

export const CategorySelect = styled.select`
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 1rem;
  min-width: 150px;
  cursor: pointer;
  background-color: white;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #3182ce;
    box-shadow: 0 0 0 1px #3182ce;
  }
`;

export const EditorContainer = styled.div`
  .ql-container {
    min-height: 400px;
    font-size: 1rem;
  }

  .ql-editor {
    min-height: 400px;
    font-family: inherit;
  }

  .ql-toolbar {
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }

  .ql-container {
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
`;

export const Button = styled.button<ButtonProps>`
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  background-color: ${(props) =>
    props.variant === 'primary' ? '#3182ce' : '#e2e8f0'};
  color: ${(props) => (props.variant === 'primary' ? 'white' : '#4a5568')};

  &:hover {
    background-color: ${(props) =>
      props.variant === 'primary' ? '#2c5282' : '#cbd5e0'};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.div`
  color: #e53e3e;
  font-size: 0.875rem;
  margin-top: 4px;
`;
