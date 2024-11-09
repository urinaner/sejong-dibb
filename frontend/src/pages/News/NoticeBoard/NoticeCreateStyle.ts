import styled from 'styled-components';

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

export const ContentWrapper = styled.div`
  background-color: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  background-color: #f8fafc;
  border-bottom: 1px solid #e2e8f0;

  h1 {
    font-size: 1.5rem;
    color: #1a202c;
    margin: 0;
    font-weight: 600;
  }

  ${media.mobile} {
    padding: 16px;
    h1 {
      font-size: 1.25rem;
    }
  }
`;

export const FormSection = styled.form`
  padding: 32px 24px;

  ${media.mobile} {
    padding: 24px 16px;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const Label = styled.label`
  font-size: 1rem;
  font-weight: 600;
  color: #2d3748;

  ${media.mobile} {
    font-size: 0.95rem;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 1rem;
  transition: all 0.2s ease-in-out;

  &:focus {
    outline: none;
    border-color: #3182ce;
    box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
  }

  ${media.mobile} {
    padding: 10px 14px;
    font-size: 0.95rem;
  }
`;

export const Select = styled.select`
  width: 200px;
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 1rem;
  background-color: white;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:focus {
    outline: none;
    border-color: #3182ce;
    box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
  }

  ${media.mobile} {
    width: 100%;
    padding: 10px 14px;
    font-size: 0.95rem;
  }
`;

export const QuillWrapper = styled.div`
  .ql-container {
    min-height: 400px;
    font-size: 1rem;
    border: 1px solid #e2e8f0;
    border-top: none;
    border-radius: 0 0 6px 6px;
  }

  .ql-toolbar {
    border: 1px solid #e2e8f0;
    border-radius: 6px 6px 0 0;
    background-color: #f8fafc;
  }

  .ql-editor {
    min-height: 400px;
    font-size: 1rem;
    line-height: 1.8;
    padding: 16px;

    &.ql-blank::before {
      color: #a0aec0;
      font-style: normal;
    }
  }

  ${media.mobile} {
    .ql-container {
      min-height: 300px;
    }
    .ql-editor {
      min-height: 300px;
      font-size: 0.95rem;
    }
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #e2e8f0;

  ${media.mobile} {
    padding-top: 20px;
  }
`;

export const Button = styled.button`
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  ${media.mobile} {
    padding: 10px 20px;
    font-size: 0.95rem;
  }
`;

export const CancelButton = styled(Button)`
  background-color: white;
  border: 1px solid #e2e8f0;
  color: #4a5568;

  &:hover {
    background-color: #f7fafc;
    border-color: #cbd5e0;
  }
`;

export const SubmitButton = styled(Button)`
  background-color: #3182ce;
  border: none;
  color: white;

  &:hover {
    background-color: #2c5282;
  }

  &:disabled {
    background-color: #a0aec0;
    cursor: not-allowed;
  }
`;

export const FileInput = styled.input`
  display: none;
`;

export const FileInputLabel = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background-color: white;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  color: #4a5568;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #f7fafc;
    border-color: #cbd5e0;
  }

  ${media.mobile} {
    padding: 10px 14px;
    font-size: 0.9rem;
  }
`;

export const FileList = styled.div`
  margin-top: 12px;
`;

export const FileItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  font-size: 0.9rem;
  color: #4a5568;

  button {
    background: none;
    border: none;
    color: #e53e3e;
    cursor: pointer;
    padding: 4px;

    &:hover {
      color: #c53030;
    }
  }
`;
