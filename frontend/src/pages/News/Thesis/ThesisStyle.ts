import styled from 'styled-components';
import { SEJONG_COLORS } from '../../../constants/colors';

export const media = {
  mobile: '@media(max-width: 768px)',
  tablet: '@media(max-width: 1024px)',
};

// Container & Layout
export const Container = styled.div`
  /* max-width: 1400px;
  width: 95%;
  margin: 0 auto;
  padding: 40px 20px; */

  max-width: 1400px;
  width: 95%;
  margin: 3rem auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  ${media.mobile} {
    width: 100vw;
    margin: 1rem auto;
    padding: 1rem;
    border: none;
    box-shadow: none;
  }
`;

export const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  gap: 16px;

  ${media.mobile} {
    flex-direction: column;
    align-items: stretch;
    margin-bottom: 24px;
  }
`;

export const Title = styled.h1`
  font-size: 2rem;
  color: ${SEJONG_COLORS.CRIMSON_RED};
  margin: 0;
  font-weight: 600;

  ${media.mobile} {
    font-size: 1.75rem;
  }
`;

export const Description = styled.p`
  font-size: 16px;
  color: #4a5568;
  line-height: 1.5;

  ${media.mobile} {
    font-size: 14px;
  }
`;

// Search
export const SearchContainer = styled.form`
  position: relative;
  width: 300px;

  ${media.mobile} {
    width: 100%;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  padding-right: 44px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 15px;
  transition: all 0.2s;
  background-color: #f8fafc;

  &:focus {
    outline: none;
    border-color: #3182ce;
    background-color: white;
    box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
  }

  &::placeholder {
    color: #a0aec0;
  }

  ${media.mobile} {
    font-size: 14px;
    padding: 10px 14px;
    padding-right: 40px;
  }
`;

export const SearchButton = styled.button`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: 8px;
  color: #4a5568;
  cursor: pointer;
  transition: color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #2d3748;
  }

  svg {
    width: 20px;
    height: 20px;
  }

  ${media.mobile} {
    padding: 6px;

    svg {
      width: 18px;
      height: 18px;
    }
  }
`;

// Filter & Sort
export const FilterSection = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;

  ${media.mobile} {
    flex-direction: column;
    gap: 12px;
  }
`;

export const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  ${media.mobile} {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const FilterLabel = styled.label`
  font-size: 14px;
  color: #4a5568;
  font-weight: 500;
  min-width: 60px;
`;

export const Select = styled.select`
  padding: 8px 32px 8px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background-color: white;
  color: #4a5568;
  font-size: 14px;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 8px center;
  background-size: 16px;
  min-width: 120px;

  &:focus {
    outline: none;
    border-color: #3182ce;
    box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
  }

  ${media.mobile} {
    width: 100%;
    min-width: unset;
  }
`;

export const ListContainer = styled.div``;

export const Thesis = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background-color: ${SEJONG_COLORS.COOL_GRAY}30;
  border: 1px solid ${SEJONG_COLORS.COOL_GRAY};
  border-radius: 20px;
  color: #333;

  div {
    margin-bottom: 0.2rem;
  }
  .thesis-content {
    margin-bottom: 0.75rem;
    color: ${SEJONG_COLORS.CRIMSON_RED};
    font-weight: 600;
  }
  span {
    font-weight: 500;
    color: ${SEJONG_COLORS.GRAY};
  }

  &:active {
    background-color: ${SEJONG_COLORS.COOL_GRAY}60;
  }

  @media (max-width: 374px) {
    img {
      display: none;
    }
  }
`;

export const ThesisContainer = styled.div`
  display: flex;
`;

export const ThesisDetail = styled.div``;

// Thesis List
export const ThesisList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const ThesisTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-size: 1rem;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  table-layout: fixed;
`;

export const Th = styled.th`
  padding: 1.25rem 1rem;
  background-color: ${SEJONG_COLORS.COOL_GRAY}20;
  color: ${SEJONG_COLORS.GRAY};
  font-weight: 600;
  text-align: center;
  border-bottom: 2px solid ${SEJONG_COLORS.COOL_GRAY};
  white-space: nowrap;

  &:first-child {
    border-top-left-radius: 8px;
    width: 5rem;
  }

  &:nth-child(2) {
    width: 7rem;
  }

  &:nth-child(3) {
    width: 27rem;
  }

  &:nth-child(4) {
    width: 5rem;
  }

  &:nth-child(5) {
    width: 10rem;
  }

  &:nth-child(6) {
    width: 9rem;
  }

  &:last-child {
    border-top-right-radius: 8px;
    width: 10rem;
  }
`;

export const Tr = styled.tr`
  /* cursor: pointer; */
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${SEJONG_COLORS.COOL_GRAY}10;
  }
`;

export const Td = styled.td`
  padding: 1.25rem 1rem;
  text-align: center;
  border-bottom: 1px solid ${SEJONG_COLORS.COOL_GRAY}20;
  color: ${SEJONG_COLORS.GRAY};
  word-wrap: break-word;
`;

export const TitleTd = styled(Td)`
  text-align: left;
  font-weight: 500;
  color: ${SEJONG_COLORS.CRIMSON_RED};
  word-wrap: break-word;

  &:hover {
    text-decoration: underline;
    text-underline-offset: 2px;
    cursor: pointer;
  }
`;

export const ThesisItem = styled.div`
  display: flex;
  gap: 24px;
  padding: 24px;
  border-radius: 12px;
  background-color: white;
  border: 1px solid #e2e8f0;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  position: relative;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    border-color: #cbd5e0;
  }

  ${media.mobile} {
    flex-direction: column;
    gap: 16px;
    padding: 16px;
  }
`;

export const ThesisThumbnail = styled.img`
  /* width: 140px;
  height: 180px;
  background-color: #f7fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #718096;
  font-size: 15px;
  flex-shrink: 0;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  ${media.mobile} {
    width: 100%;
    height: 200px;
  } */

  width: 5rem;
  height: auto;
`;

export const ThesisContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 8px 0;

  ${media.mobile} {
    padding: 0;
  }
`;

export const ThesisTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #1a202c;
  margin: 0;
  line-height: 1.4;

  &:hover {
    color: #2b6cb0;
  }

  ${media.mobile} {
    font-size: 16px;
  }
`;

export const ThesisInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;

  ${media.mobile} {
    font-size: 14px;
  }
`;

export const Label = styled.span`
  color: #4a5568;
  font-weight: 500;
  margin-right: 4px;
  min-width: 60px;

  ${media.mobile} {
    min-width: 50px;
  }
`;

export const Value = styled.span`
  color: #718096;
  font-weight: 400;
`;

// Action Buttons
export const ActionPanel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  ${media.mobile} {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;

  ${media.mobile} {
    width: 100%;
  }
`;

export const BaseButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background-color: white;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  color: #4a5568;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }

  svg {
    width: 16px;
    height: 16px;
  }

  ${media.mobile} {
    width: 100%;
    justify-content: center;
  }
`;

export const ActionButton = styled(BaseButton)`
  &:hover:not(:disabled) {
    background-color: #f8fafc;
    border-color: #cbd5e0;
  }
`;

export const CreateButton = styled(BaseButton)`
  background-color: #3182ce;
  border-color: #2c5282;
  color: white;

  &:hover:not(:disabled) {
    background-color: #2c5282;
  }
`;

export const DeleteButton = styled(BaseButton)`
  color: #e53e3e;
  border-color: #feb2b2;

  &:hover:not(:disabled) {
    background-color: #fff5f5;
    border-color: #e53e3e;
  }
`;

export const EditButton = styled(BaseButton)`
  color: #3182ce;
  border-color: #90cdf4;

  &:hover:not(:disabled) {
    background-color: #ebf8ff;
    border-color: #3182ce;
  }
`;

// Pagination
export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin-top: 48px;

  ${media.mobile} {
    margin-top: 32px;
  }
`;

export const PageButton = styled.button<{ $isActive?: boolean }>`
  padding: 8px 12px;
  min-width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${(props) => (props.$isActive ? '#3182ce' : '#e2e8f0')};
  border-radius: 6px;
  background-color: ${(props) => (props.$isActive ? '#3182ce' : 'white')};
  color: ${(props) => (props.$isActive ? 'white' : '#4a5568')};
  font-weight: ${(props) => (props.$isActive ? '600' : '400')};
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background-color: ${(props) => (props.$isActive ? '#2c5282' : '#f7fafc')};
    border-color: ${(props) => (props.$isActive ? '#2c5282' : '#cbd5e0')};
  }

  &:disabled {
    background-color: #f7fafc;
    border-color: #e2e8f0;
    color: #a0aec0;
    cursor: not-allowed;
  }

  ${media.mobile} {
    min-width: 32px;
    height: 32px;
    padding: 6px 10px;
  }
`;

// Status Messages
export const ErrorMessage = styled.div`
  text-align: center;
  padding: 48px;
  background-color: #fff5f5;
  color: #c53030;
  border-radius: 8px;
  font-size: 15px;
  border: 1px solid #feb2b2;
  margin-bottom: 24px;

  ${media.mobile} {
    padding: 24px;
  }
`;

export const LoadingMessage = styled.div`
  text-align: center;
  padding: 48px;
  color: #4a5568;
  font-size: 15px;
  margin-bottom: 24px;

  ${media.mobile} {
    padding: 24px;
  }
`;

export const NoResultsMessage = styled.div`
  text-align: center;
  padding: 48px;
  color: #4a5568;
  font-size: 15px;
  background-color: #f7fafc;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  margin-bottom: 24px;

  ${media.mobile} {
    padding: 24px;
  }
`;

export const LoadingSpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: #4a5568;
`;

export const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid #e2e8f0;
  border-top-color: #3182ce;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

// Additional Thesis Info
export const ThesisMetaInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  color: #718096;
  font-size: 14px;

  span {
    display: flex;
    align-items: center;
    gap: 6px;

    svg {
      width: 16px;
      height: 16px;
      color: #4a5568;
    }
  }

  ${media.mobile} {
    gap: 12px;
    font-size: 13px;
  }
`;

// Header Components
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e2e8f0;

  ${media.mobile} {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

// Button Components
export const Button = styled.button`
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  font-weight: 500;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background-color: white;
  color: #4a5568;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover:not(:disabled) {
    background-color: #f8fafc;
    border-color: #cbd5e0;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }

  svg {
    width: 18px;
    height: 18px;
  }

  ${media.mobile} {
    width: 100%;
    justify-content: center;
  }
`;

// Loading Components
export const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  color: #4a5568;

  svg {
    animation: spin 1s linear infinite;
    width: 24px;
    height: 24px;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

// Publication Info Components
export const PublicationInfo = styled.div`
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: #718096;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    width: 16px;
    height: 16px;
    color: #4a5568;
  }

  ${media.mobile} {
    font-size: 0.85rem;
  }
`;

// Action Buttons Group
export const ActionButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  position: absolute;
  top: 1rem;
  right: 1rem;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;

  ${ThesisItem}:hover & {
    opacity: 1;
  }

  button {
    padding: 0.25rem 0.75rem;
    font-size: 0.85rem;

    svg {
      width: 16px;
      height: 16px;
    }
  }

  ${media.mobile} {
    position: static;
    opacity: 1;
    margin-top: 1rem;
    justify-content: flex-end;
  }
`;

// Empty Message
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

// Additional Button Variants
export const PrimaryButton = styled(Button)`
  background-color: #3182ce;
  border-color: #2c5282;
  color: white;

  &:hover:not(:disabled) {
    background-color: #2c5282;
    border-color: #2a4365;
  }
`;

export const DangerButton = styled(Button)`
  color: #e53e3e;
  border-color: #feb2b2;

  &:hover:not(:disabled) {
    background-color: #fff5f5;
    border-color: #e53e3e;
  }
`;

export const GhostButton = styled(Button)`
  border-color: transparent;
  background-color: transparent;

  &:hover:not(:disabled) {
    background-color: #f8fafc;
    border-color: transparent;
  }
`;
