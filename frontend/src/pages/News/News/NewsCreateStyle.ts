import styled from 'styled-components';
import { media } from '../../../styles/media';
import { SEJONG_COLORS } from '../../../constants/colors';

export const Container = styled.div`
  max-width: 780px;
  width: 100%;
  margin: 0 auto;
  padding: 3rem 1.5rem;

  ${media.mobile} {
    padding: 2rem 1rem;
  }
`;

export const ContentWrapper = styled.div`
  background: white;
`;

export const Header = styled.div`
  margin-bottom: 2.5rem;

  h1 {
    margin: 0;
    font-size: 2rem;
    font-weight: 800;
    color: ${SEJONG_COLORS.GRAY};
    letter-spacing: -0.02em;
  }
`;

export const FormSection = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${SEJONG_COLORS.GRAY};
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid ${SEJONG_COLORS.COOL_GRAY}30;
  border-radius: 0.5rem;
  font-size: 1rem;
  color: ${SEJONG_COLORS.GRAY};
  transition: all 0.2s;
  background: none;

  &:focus {
    outline: none;
    border-color: ${SEJONG_COLORS.CRIMSON_RED};
    box-shadow: 0 0 0 2px ${SEJONG_COLORS.CRIMSON_RED}10;
  }

  &::placeholder {
    color: ${SEJONG_COLORS.LIGHT_GRAY};
  }
`;

export const QuillWrapper = styled.div`
  .ql-toolbar {
    border-color: ${SEJONG_COLORS.COOL_GRAY}30;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
  }

  .ql-container {
    border-color: ${SEJONG_COLORS.COOL_GRAY}30;
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    font-family: inherit;
  }

  .ql-editor {
    min-height: 360px;
    font-size: 1rem;
    line-height: 1.6;

    &.ql-blank::before {
      color: ${SEJONG_COLORS.LIGHT_GRAY};
      font-style: normal;
    }
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1rem;
`;

export const BaseButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const CancelButton = styled(BaseButton)`
  border: none;
  background: ${SEJONG_COLORS.COOL_GRAY}10;
  color: ${SEJONG_COLORS.GRAY};

  &:hover:not(:disabled) {
    background: ${SEJONG_COLORS.COOL_GRAY}20;
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

export const FileInputLabel = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border: 1px dashed ${SEJONG_COLORS.COOL_GRAY};
  border-radius: 0.5rem;
  color: ${SEJONG_COLORS.GRAY};
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${SEJONG_COLORS.CRIMSON_RED};
    color: ${SEJONG_COLORS.CRIMSON_RED};
    background: ${SEJONG_COLORS.CRIMSON_RED}05;
  }
`;

export const FileInput = styled.input`
  display: none;
`;

export const FileList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0.75rem 0 0 0;
`;

export const FileItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  background: ${SEJONG_COLORS.COOL_GRAY}10;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  color: ${SEJONG_COLORS.GRAY};

  button {
    border: none;
    background: none;
    color: ${SEJONG_COLORS.LIGHT_GRAY};
    cursor: pointer;
    padding: 0.25rem 0.5rem;
    font-size: 1rem;
    transition: all 0.2s;

    &:hover {
      color: ${SEJONG_COLORS.RED};
    }
  }
`;

export const PreviewImage = styled.img`
  max-width: 200px;
  height: auto;
  margin-top: 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid ${SEJONG_COLORS.COOL_GRAY}30;
`;

export const CreateButton = styled(BaseButton)`
  border: none;
  background: ${SEJONG_COLORS.CRIMSON_RED};
  color: white;
  margin-bottom: 1.5rem;

  &:hover:not(:disabled) {
    background: ${SEJONG_COLORS.DARK_RED};
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

export const ErrorText = styled.p`
  color: ${SEJONG_COLORS.RED};
  font-size: 0.875rem;
  margin: 0.25rem 0 0 0;
`;
