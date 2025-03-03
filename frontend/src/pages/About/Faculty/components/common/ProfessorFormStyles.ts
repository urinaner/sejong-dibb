import styled from 'styled-components';
import { SEJONG_COLORS } from '../../../../../constants/colors';

export const media = {
  mobile: '@media(max-width: 768px)',
  tablet: '@media(max-width: 1024px)',
};

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const FormSection = styled.div`
  position: relative;
  width: 100%;
  background: white;
  border: 1px solid ${(props) => props.theme.colors.grey[200]};
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

export const FormTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${SEJONG_COLORS.CRIMSON_RED};
  margin: 0;
  padding: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid ${(props) => props.theme.colors.grey[100]};
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    color: ${SEJONG_COLORS.CRIMSON_RED};
  }
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
  font-size: 0.95rem;
  color: ${(props) => props.theme.colors.grey[500]};
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid ${(props) => props.theme.colors.grey[200]};
  border-radius: 8px;
  font-size: 0.95rem;
  transition: all 0.2s ease-in-out;
  background-color: white;

  &:focus {
    border-color: ${SEJONG_COLORS.CRIMSON_RED};
    outline: none;
    box-shadow: 0 0 0 3px ${SEJONG_COLORS.CRIMSON_RED}15;
  }

  &:disabled {
    background-color: ${(props) => props.theme.colors.grey[50]};
    cursor: not-allowed;
  }

  &::placeholder {
    color: ${(props) => props.theme.colors.grey[400]};
  }

  ${media.mobile} {
    padding: 0.625rem 0.875rem;
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid ${(props) => props.theme.colors.grey[200]};
  border-radius: 8px;
  font-size: 0.95rem;
  transition: all 0.2s ease-in-out;
  background-color: white;
  resize: vertical;
  min-height: 100px;

  &:focus {
    border-color: ${SEJONG_COLORS.CRIMSON_RED};
    outline: none;
    box-shadow: 0 0 0 3px ${SEJONG_COLORS.CRIMSON_RED}15;
  }

  &:disabled {
    background-color: ${(props) => props.theme.colors.grey[50]};
    cursor: not-allowed;
  }

  &::placeholder {
    color: ${(props) => props.theme.colors.grey[400]};
  }

  ${media.mobile} {
    padding: 0.625rem 0.875rem;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1.5rem;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid ${(props) => props.theme.colors.grey[200]};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

  ${media.mobile} {
    flex-direction: column;
    gap: 0.5rem;

    button {
      width: 100%;
    }
  }
`;

export const RequiredMark = styled.span`
  color: ${SEJONG_COLORS.CRIMSON_RED};
  margin-left: 2px;
`;

export const InputWithIcon = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  svg {
    position: absolute;
    right: 12px;
    // 복잡한 조건부 스타일링 대신 단순화
    top: 50%;
    transform: translateY(-50%);
    color: ${SEJONG_COLORS.CRIMSON_RED};
    opacity: 0.7;
  }

  textarea + svg {
    top: 12px;
    transform: none;
  }

  input,
  textarea {
    padding-right: 2.5rem;
  }
`;

export const HelperText = styled.p`
  margin-top: 0.5rem;
  font-size: 0.8rem;
  color: ${(props) => props.theme.colors.grey[500]};

  ${media.mobile} {
    font-size: 0.75rem;
  }
`;
export const ImageUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-start;

  /* 태블릿 환경을 위한 미디어 쿼리 추가 */
  ${media.tablet} {
    gap: 0.85rem;
    align-items: center;
  }

  ${media.mobile} {
    gap: 0.75rem;
    align-items: center;
  }
`;
export const ImagePreviewContainer = styled.div`
  width: 240px;
  height: 320px;
  border: 1px solid ${(props) => props.theme.colors.grey[200]};
  border-radius: 8px;
  overflow: hidden;
  background-color: ${(props) => props.theme.colors.grey[50]};
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: contain; /* cover에서 contain으로 변경 */
    transition: transform 0.2s ease-in-out;
  }

  /* 태블릿 환경을 위한 미디어 쿼리 추가 */
  ${media.tablet} {
    width: 220px;
    height: 300px;
    align-self: center;
  }

  ${media.mobile} {
    width: 200px;
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
  color: ${(props) => props.theme.colors.grey[400]};

  svg {
    opacity: 0.5;
  }

  span {
    font-size: 0.875rem;
    text-align: center;
    padding: 0 1rem;
  }
`;
export const ImageUploadButton = styled.label`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: white;
  background-color: ${SEJONG_COLORS.CRIMSON_RED};
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  width: fit-content;
  box-shadow: 0 1px 3px rgba(163, 20, 50, 0.2);

  &:hover {
    background-color: ${(props) => props.theme.colors.primary.crimsonDark};
  }

  input[type='file'] {
    display: none;
  }

  /* 태블릿 환경을 위한 미디어 쿼리 추가 */
  ${media.tablet} {
    width: 80%;
    justify-content: center;
  }

  ${media.mobile} {
    width: 100%;
    justify-content: center;
  }
`;
// 학력 정보 관련 스타일 추가
export const AcademicDegreesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const AcademicDegreeRow = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
  position: relative;

  ${media.mobile} {
    flex-direction: column;
    align-items: stretch;
    gap: 0.5rem;
  }
`;

export const AcademicDegreeTypeInput = styled(Input)`
  flex: 1;
  min-width: 150px;

  ${media.mobile} {
    width: 100%;
  }
`;

export const AcademicDegreeSchoolInput = styled(Input)`
  flex: 3;

  ${media.mobile} {
    width: 100%;
  }
`;

export const RemoveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  color: ${(props) => props.theme.colors.grey[400]};
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: all 0.2s;

  &:hover {
    color: ${SEJONG_COLORS.CRIMSON_RED};
    background: ${(props) => props.theme.colors.grey[100]};
  }

  &:active {
    background: ${(props) => props.theme.colors.grey[200]};
  }
`;

export const AddDegreeButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  font-size: 0.85rem;
  font-weight: 500;
  color: ${SEJONG_COLORS.CRIMSON_RED};
  background-color: white;
  border: 1px dashed ${SEJONG_COLORS.CRIMSON_RED};
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 0.5rem;

  &:hover {
    background-color: ${SEJONG_COLORS.CRIMSON_RED}10;
  }

  ${media.mobile} {
    width: 100%;
    justify-content: center;
  }
`;
