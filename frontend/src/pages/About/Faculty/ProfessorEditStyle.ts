// ProfessorEditStyles.ts
import styled from 'styled-components';

export const media = {
  mobile: '@media(max-width: 768px)',
  tablet: '@media(max-width: 1024px)',
};

export const Container = styled.div`
  max-width: 1400px;
  width: 80vw;
  margin: 0 auto;
  padding: 40px 20px;

  ${media.mobile} {
    padding: 20px 16px;
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e2e8f0;

  ${media.mobile} {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

export const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  color: #1a202c;
  margin: 0;

  ${media.mobile} {
    font-size: 1.5rem;
    width: 100%;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const FormSection = styled.div`
  position: relative;
  width: 100%;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.2s ease-in-out;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

export const FormTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 500;
  color: #333333;
  margin: 0;
  padding: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #eaeaea;
`;

export const FormContent = styled.div`
  padding: 1.5rem;
`;

export const InputGroup = styled.div`
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;

  font-weight: 500;
  font-size: 0.875rem;
  color: #4a5568;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;

  font-size: 0.875rem;
  transition: all 0.2s ease-in-out;
  background-color: white;

  &:focus {
    border-color: #1a73e8;
    outline: none;
    box-shadow: 0 0 0 3px rgba(26, 115, 232, 0.1);
  }

  &:disabled {
    background-color: #f8f9fa;
    cursor: not-allowed;
  }

  &::placeholder {
    color: #a0aec0;
  }

  ${media.mobile} {
    padding: 0.625rem;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1.5rem;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e2e8f0;

  ${media.mobile} {
    flex-direction: column;
    gap: 0.5rem;

    button {
      width: 100%;
    }
  }
`;

export const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background-color: #fff5f5;
  color: #c53030;
  border-radius: 12px;

  font-size: 0.875rem;
  border: 1px solid #feb2b2;

  svg {
    flex-shrink: 0;
    min-width: 18px;
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  color: #4a5568;
  font-size: 1.1rem;

  ${media.mobile} {
    min-height: 200px;
    font-size: 1rem;
  }
`;

export const RequiredMark = styled.span`
  color: #e53e3e;
  margin-left: 2px;
`;

export const InputWithIcon = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  svg {
    position: absolute;
    right: 12px;
    color: #1a73e8;
    min-width: 18px;
  }

  input {
    padding-right: 2.5rem;
  }
`;

export const HelperText = styled.p`
  margin-top: 0.25rem;

  font-size: 0.75rem;
  color: #718096;

  ${media.mobile} {
    font-size: 0.7rem;
  }
`;

export const ImageUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  ${media.mobile} {
    gap: 0.75rem;
  }
`;

export const ImagePreviewContainer = styled.div`
  width: 240px;
  height: 320px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
  background-color: #f8fafc;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.2s ease-in-out;
  }

  ${media.mobile} {
    width: 100%;
    height: 280px;
  }
`;

export const FallbackThumbnail = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  color: #94a3b8;

  svg {
    opacity: 0.5;
  }

  span {
    font-size: 0.875rem;
  }
`;

export const ImageUploadButton = styled.label`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #1a73e8;
  background-color: white;
  border: 1px solid #1a73e8;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  width: fit-content;

  &:hover {
    background-color: #f8fafc;
  }

  input[type='file'] {
    display: none;
  }

  ${media.mobile} {
    width: 100%;
    justify-content: center;
  }
`;

export const ImageContainer = styled.div`
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 200px;
  background-color: #f8fafc;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  ${media.mobile} {
    height: 160px;
  }
`;

export const ImageError = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #fff5f5;
  color: #c53030;
  padding: 1rem;
  text-align: center;
  font-size: 0.875rem;
`;
