// NewsCreateStyle.ts
import styled from 'styled-components';
import { media } from '../../../styles/media';
import { SEJONG_COLORS } from '../../../constants/colors';

export const Container = styled.div`
  max-width: 1200px;
  width: 95%;
  margin: 0 auto;
  padding: 40px 20px;

  ${media.mobile} {
    padding: 20px 10px;
  }
`;

export const ContentWrapper = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const Header = styled.div`
  padding: 24px;
  border-bottom: 1px solid ${SEJONG_COLORS.COOL_GRAY};

  h1 {
    margin: 0;
    font-size: 24px;
    color: ${SEJONG_COLORS.GRAY};
  }
`;

export const FormSection = styled.form`
  padding: 24px;
`;

export const FormGroup = styled.div`
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 16px;
  font-weight: 500;
  color: ${SEJONG_COLORS.GRAY};
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid ${SEJONG_COLORS.COOL_GRAY};
  border-radius: 4px;
  font-size: 14px;
  color: ${SEJONG_COLORS.GRAY};
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: ${SEJONG_COLORS.CRIMSON_RED};
  }

  &::placeholder {
    color: ${SEJONG_COLORS.LIGHT_GRAY};
  }
`;

export const QuillWrapper = styled.div`
  .ql-container {
    min-height: 300px;
    font-size: 16px;
  }

  .ql-editor {
    min-height: 300px;
    font-family: inherit;
  }

  .ql-toolbar {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }

  .ql-container {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
`;

export const BaseButton = styled.button`
  padding: 12px 24px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const CancelButton = styled(BaseButton)`
  border: 1px solid ${SEJONG_COLORS.COOL_GRAY};
  background: white;
  color: ${SEJONG_COLORS.GRAY};

  &:hover:not(:disabled) {
    background: ${SEJONG_COLORS.IVORY};
  }
`;

export const SubmitButton = styled(BaseButton)`
  border: none;
  background: ${SEJONG_COLORS.CRIMSON_RED};
  color: white;

  &:hover:not(:disabled) {
    background: ${SEJONG_COLORS.DARK_RED};
  }
`;

export const DeleteButton = styled(BaseButton)`
  border: 1px solid ${SEJONG_COLORS.RED};
  background: white;
  color: ${SEJONG_COLORS.RED};

  &:hover:not(:disabled) {
    background: ${SEJONG_COLORS.RED};
    color: white;
  }
`;

export const FileInputLabel = styled.label`
  display: inline-flex;
  align-items: center;
  padding: 8px 16px;
  border: 1px solid ${SEJONG_COLORS.CRIMSON_RED};
  border-radius: 4px;
  color: ${SEJONG_COLORS.CRIMSON_RED};
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${SEJONG_COLORS.IVORY};
  }
`;

export const FileInput = styled.input`
  display: none;
`;

export const FileList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 12px 0 0 0;
`;

export const FileItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: ${SEJONG_COLORS.IVORY};
  border-radius: 4px;
  font-size: 14px;
  color: ${SEJONG_COLORS.GRAY};

  button {
    border: none;
    background: none;
    color: ${SEJONG_COLORS.LIGHT_GRAY};
    cursor: pointer;
    padding: 4px 8px;
    font-size: 16px;
    transition: color 0.2s;

    &:hover {
      color: ${SEJONG_COLORS.RED};
    }
  }
`;

export const CreateButton = styled(BaseButton)`
  border: none;
  background: ${SEJONG_COLORS.CRIMSON_RED};
  color: white;
  margin-bottom: 20px;

  &:hover:not(:disabled) {
    background: ${SEJONG_COLORS.DARK_RED};
  }
`;

export const PreviewImage = styled.img`
  max-width: 200px;
  height: auto;
  margin-top: 8px;
  border-radius: 4px;
  border: 1px solid ${SEJONG_COLORS.COOL_GRAY};
`;

export const ErrorText = styled.p`
  color: ${SEJONG_COLORS.RED};
  font-size: 14px;
  margin-top: 4px;
  margin-bottom: 0;
`;
