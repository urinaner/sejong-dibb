import styled from 'styled-components';

export const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: #f8f9fa;
  padding: 2rem 0;
`;

export const ContentContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
`;

export const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;

  h1 {
    font-size: 1.8rem;
    color: #2c3e50;
    margin: 0;
  }
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  color: #666;
  font-size: 1rem;
  cursor: pointer;
  padding: 0.5rem 1rem;

  &:hover {
    color: #333;
  }
`;

export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  font-size: 1rem;
  font-weight: 500;
  color: #2c3e50;
`;

export const TitleInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #e1e1e1;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
  }
`;

export const CategorySelect = styled.select`
  width: 200px;
  padding: 0.75rem 1rem;
  border: 1px solid #e1e1e1;
  border-radius: 8px;
  font-size: 1rem;
  background-color: white;
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
  }
`;

export const QuillWrapper = styled.div`
  .ql-container {
    min-height: 400px;
    font-size: 1rem;
    border-radius: 0 0 8px 8px;
    border-color: #e1e1e1;
  }

  .ql-editor {
    min-height: 400px;
    padding: 1rem;
  }

  .ql-toolbar {
    border-radius: 8px 8px 0 0;
    border-color: #e1e1e1;
    background-color: #f8f9fa;
  }

  .ql-editor.ql-blank::before {
    color: #999;
    font-style: normal;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
`;

export const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
`;

export const CancelButton = styled(Button)`
  background-color: white;
  border: 1px solid #e1e1e1;
  color: #666;

  &:hover {
    background-color: #f8f9fa;
  }
`;

export const SubmitButton = styled(Button)`
  background-color: #4a90e2;
  border: none;
  color: white;

  &:hover {
    background-color: #357abd;
  }

  &:disabled {
    background-color: #a0c6e9;
    cursor: not-allowed;
  }
`;
