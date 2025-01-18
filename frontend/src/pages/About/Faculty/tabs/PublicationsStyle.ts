import styled from 'styled-components';
import { LoadingWrapper, ErrorMessage } from '../TabSectionStyle';
import { SEJONG_COLORS } from '../../../../constants/colors';

export { LoadingWrapper, ErrorMessage };

export const media = {
  mobile: '@media(max-width: 768px)',
  tablet: '@media(max-width: 1024px)',
};

export const PublicationsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const FilterSection = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;

  ${media.mobile} {
    flex-direction: column;
    gap: 0.75rem;
  }
`;

export const SearchWrapper = styled.div`
  flex: 1;
  position: relative;

  svg {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: ${(props) => props.theme.colors.grey[500]};
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.75rem;
  border: 1px solid ${(props) => props.theme.colors.grey[200]};
  border-radius: 8px;
  font-size: 0.95rem;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: ${SEJONG_COLORS.CRIMSON_RED};
    box-shadow: 0 0 0 3px rgba(163, 20, 50, 0.1);
  }

  &::placeholder {
    color: ${(props) => props.theme.colors.grey[400]};
  }
`;

export const FilterSelect = styled.select`
  min-width: 120px;
  padding: 0.75rem 2rem 0.75rem 1rem;
  border: 1px solid ${(props) => props.theme.colors.grey[200]};
  border-radius: 8px;
  font-size: 0.95rem;
  background-color: white;
  cursor: pointer;
  transition: all 0.2s;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1em;

  &:focus {
    outline: none;
    border-color: ${SEJONG_COLORS.CRIMSON_RED};
    box-shadow: 0 0 0 3px rgba(163, 20, 50, 0.1);
  }

  ${media.mobile} {
    width: 100%;
  }
`;

export const ThesisList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ThesisCard = styled.article`
  padding: 1.5rem;
  border: 1px solid ${(props) => props.theme.colors.grey[200]};
  border-radius: 8px;
  background: white;
  transition: all 0.2s;

  &:hover {
    border-color: ${SEJONG_COLORS.CRIMSON_RED};
    box-shadow: 0 2px 8px rgba(163, 20, 50, 0.1);
  }
`;

export const ThesisHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
`;

export const Content = styled.h3`
  font-size: 1.1rem;
  font-weight: 500;
  color: ${SEJONG_COLORS.CRIMSON_RED};
  margin: 0;
  line-height: 1.4;
`;

export const LinkButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border: none;
  background: none;
  color: ${SEJONG_COLORS.CRIMSON_RED};
  cursor: pointer;
  border-radius: 50%;
  transition: all 0.2s;
  flex-shrink: 0;

  &:hover {
    background: ${(props) => props.theme.colors.grey[100]};
  }

  &:active {
    background: ${(props) => props.theme.colors.grey[200]};
  }
`;

export const ThesisInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 0.75rem;
  font-size: 0.95rem;
  color: ${(props) => props.theme.colors.grey[500]};
`;

export const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    color: ${SEJONG_COLORS.CRIMSON_RED};
    flex-shrink: 0;
  }
`;

export const ThesisDetails = styled.div`
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.grey[500]};
`;

export const EmptyMessage = styled.div`
  padding: 2rem;
  text-align: center;
  color: ${(props) => props.theme.colors.grey[500]};
  background: ${(props) => props.theme.colors.grey[50]};
  border-radius: 8px;
  border: 1px dashed ${(props) => props.theme.colors.grey[200]};
`;

export const THead = styled.thead``;

export const Th = styled.th`
  white-space: nowrap;
  padding: 1rem 0 2rem 0;
  border-bottom: 1px solid ${SEJONG_COLORS.COOL_GRAY};
  color: ${SEJONG_COLORS.CRIMSON_RED};

  &:nth-child(1) {
    width: 2rem;
  }
  &:nth-child(2) {
    width: 23.25rem;
  }
  &:nth-child(3) {
    width: 5rem;
  }
`;

export const Td = styled.td`
  word-wrap: break-word;
  text-align: center;
  padding: 1.5rem 0.75rem;
`;

export const Table = styled.table`
  border-collapse: collapse;

  tr:nth-child(2) {
    padding-top: 2rem !important;
  }
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid ${(props) => props.theme.colors.grey[200]};
`;

export const PageButton = styled.button<{ disabled: boolean }>`
  padding: 0.5rem 1rem;
  border: 1px solid
    ${(props) =>
      props.disabled
        ? props.theme.colors.grey[200]
        : SEJONG_COLORS.CRIMSON_RED};
  border-radius: 6px;
  background: white;
  color: ${(props) =>
    props.disabled ? props.theme.colors.grey[400] : SEJONG_COLORS.CRIMSON_RED};
  font-size: 0.9rem;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.2s;

  &:not(:disabled):hover {
    background: ${SEJONG_COLORS.CRIMSON_RED};
    color: white;
  }
`;

export const PageInfo = styled.span`
  font-size: 0.95rem;
  color: ${(props) => props.theme.colors.grey[500]};
  min-width: 80px;
  text-align: center;
`;
