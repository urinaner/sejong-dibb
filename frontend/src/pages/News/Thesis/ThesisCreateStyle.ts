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

// Action Buttons
export const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;

  ${media.mobile} {
    width: 100%;
    margin-top: 1rem;

    button {
      flex: 1;
    }
  }
`;

export const Button = styled(BaseButton)`
  background-color: #3182ce;
  color: white;
  border: 1px solid #2c5282;
  padding: 0 1rem;
  height: 36px;
  gap: 4px;

  svg {
    width: 18px;
    height: 18px;
  }

  &:hover:not(:disabled) {
    background-color: #2c5282;
  }

  ${media.mobile} {
    height: 32px;
    font-size: 0.85rem;

    svg {
      width: 16px;
      height: 16px;
    }
  }
`;

export const ActionButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;

  ${media.mobile} {
    flex-direction: column;
    gap: 0.25rem;
  }
`;

export const ActionButton = styled(BaseButton)`
  background-color: white;
  border: 1px solid #e2e8f0;
  color: #4a5568;
  padding: 0 0.75rem;
  height: 32px;
  font-size: 0.85rem;
  gap: 4px;

  svg {
    width: 16px;
    height: 16px;
  }

  &:hover:not(:disabled) {
    background-color: #f8fafc;
    border-color: #cbd5e0;
  }
`;

export const DeleteButton = styled(BaseButton)`
  background-color: white;
  border: 1px solid #ddd;
  color: #dc3545;

  &:hover:not(:disabled) {
    background-color: #fff5f5;
    border-color: #dc3545;
  }

  &:disabled {
    background-color: #ffe3e3;
    border-color: #ffc9c9;
    color: #fa5252;
  }
`;

// Loading and Empty states
export const LoadingSpinner = styled.div`
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

export const EmptyMessage = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: #4a5568;
  font-size: 1.1rem;
  background-color: #f8fafc;
  border-radius: 8px;
  border: 1px dashed #e2e8f0;
  margin: 2rem 0;

  ${media.mobile} {
    padding: 2rem 1rem;
    font-size: 1rem;
  }
`;

// Thesis Item Styles
export const ThesisList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 2rem;
`;

export const ThesisItem = styled.div`
  display: flex;
  gap: 1.5rem;
  padding: 1.5rem;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  transition: all 0.2s ease-in-out;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  ${media.mobile} {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
`;

export const ThesisThumbnail = styled.div`
  flex-shrink: 0;
  width: 200px;
  height: 280px;
  background: #f8fafc;
  border-radius: 4px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  ${media.mobile} {
    width: 100%;
    height: 200px;
  }
`;

export const ThesisContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ThesisTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0;
  line-height: 1.4;

  ${media.mobile} {
    font-size: 1.1rem;
  }
`;

export const ThesisInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  color: #4a5568;
  font-size: 0.95rem;

  span {
    position: relative;

    &:not(:last-child)::after {
      content: '';
      position: absolute;
      right: -0.5rem;
      top: 50%;
      width: 1px;
      height: 12px;
      background-color: #cbd5e0;
      transform: translateY(-50%);
    }
  }

  ${media.mobile} {
    font-size: 0.9rem;
    gap: 0.75rem;
  }
`;

export const PublicationInfo = styled.div`
  color: #718096;
  font-size: 0.9rem;

  ${media.mobile} {
    font-size: 0.85rem;
  }
`;

export const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0;

  ${media.mobile} {
    font-size: 1.5rem;
  }
`;

export const ImageUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
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

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 1rem;
  transition: all 0.2s ease-in-out;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #3182ce;
    box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
  }

  ${media.mobile} {
    padding: 10px 14px;
    font-size: 0.95rem;
    min-height: 100px;
  }
`;
