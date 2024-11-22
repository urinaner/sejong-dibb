// ThesisCreateStyle.ts
import styled from 'styled-components';

export const media = {
  mobile: '@media(max-width: 768px)',
  tablet: '@media(max-width: 1024px)',
};

export const Container = styled.div`
  max-width: 1400px;
  width: 95%;
  margin: 0 auto;
  padding: 40px 20px;

  ${media.mobile} {
    padding: 20px 16px;
  }
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

export const RequiredMark = styled.span`
  color: #e53e3e;
  margin-left: 2px;
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

export const HelperText = styled.p`
  margin: 4px 0 0;
  font-size: 0.875rem;
  color: #718096;
`;

export const PublicationInfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  ${media.mobile} {
    gap: 8px;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #e2e8f0;

  ${media.mobile} {
    flex-direction: column;
    gap: 8px;
  }
`;

const BaseButton = styled.button`
  padding: 0 24px;
  height: 40px;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 6px;
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }

  ${media.mobile} {
    width: 100%;
  }
`;

export const CancelButton = styled(BaseButton)`
  background-color: white;
  border: 1px solid #e2e8f0;
  color: #4a5568;

  &:hover:not(:disabled) {
    background-color: #f8fafc;
  }
`;

export const SubmitButton = styled(BaseButton)`
  background-color: #3182ce;
  border: 1px solid #2c5282;
  color: white;

  &:hover:not(:disabled) {
    background-color: #2c5282;
  }
`;

export const ErrorMessage = styled.div`
  padding: 16px;
  background-color: #fff5f5;
  color: #c53030;
  border-radius: 6px;
  margin-bottom: 16px;
  font-size: 0.875rem;
  border: 1px solid #feb2b2;
  display: flex;
  align-items: center;
  gap: 8px;

  svg {
    flex-shrink: 0;
  }
`;
