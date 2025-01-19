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
  padding: 1rem;
  background: white;
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.colors.grey[200]};

  ${media.mobile} {
    flex-direction: column;
    gap: 0.75rem;
    padding: 0.75rem;
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
    pointer-events: none;
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
    box-shadow: 0 0 0 3px ${SEJONG_COLORS.CRIMSON_RED}15;
  }

  &::placeholder {
    color: ${(props) => props.theme.colors.grey[400]};
  }
`;

export const FilterSelect = styled.select`
  min-width: 140px;
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
    box-shadow: 0 0 0 3px ${SEJONG_COLORS.CRIMSON_RED}15;
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
    transform: translateY(-1px);
  }

  ${media.mobile} {
    padding: 1rem;
  }
`;

export const ThesisTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 500;
  color: ${SEJONG_COLORS.CRIMSON_RED};
  margin: 0 0 1rem 0;
  line-height: 1.4;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;

  ${media.mobile} {
    font-size: 1rem;
  }
`;

export const MetaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 1rem;
  background: ${(props) => props.theme.colors.grey[50]};
  border-radius: 6px;

  ${media.mobile} {
    grid-template-columns: 1fr;
    gap: 0.75rem;
    padding: 0.75rem;
  }
`;

export const MetaItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-size: 0.95rem;
  color: ${(props) => props.theme.colors.grey[500]};

  svg {
    margin-top: 0.25rem;
    color: ${SEJONG_COLORS.CRIMSON_RED};
    opacity: 0.8;
    flex-shrink: 0;
  }

  ${media.mobile} {
    font-size: 0.9rem;
    gap: 0.5rem;
  }
`;

export const MetaLabel = styled.span`
  font-weight: 500;
  color: ${(props) => props.theme.colors.grey[500]};
`;

export const MetaValue = styled.span`
  color: ${(props) => props.theme.colors.grey[300]};
`;

export const LinkButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid ${SEJONG_COLORS.CRIMSON_RED};
  border-radius: 6px;
  background: white;
  color: ${SEJONG_COLORS.CRIMSON_RED};
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;

  &:hover {
    background: ${SEJONG_COLORS.CRIMSON_RED};
    color: white;
  }

  svg {
    flex-shrink: 0;
  }

  ${media.mobile} {
    padding: 0.4rem 0.75rem;
    font-size: 0.85rem;
  }
`;

export const EmptyMessage = styled.div`
  padding: 3rem 2rem;
  text-align: center;
  color: ${(props) => props.theme.colors.grey[500]};
  background: ${(props) => props.theme.colors.grey[50]};
  border-radius: 8px;
  border: 1px dashed ${(props) => props.theme.colors.grey[300]};
  font-size: 1rem;

  ${media.mobile} {
    padding: 2rem 1rem;
    font-size: 0.9rem;
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

  ${media.mobile} {
    margin-top: 1.5rem;
    gap: 0.75rem;
  }
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

  ${media.mobile} {
    padding: 0.4rem 0.75rem;
    font-size: 0.85rem;
  }
`;

export const PageInfo = styled.span`
  font-size: 0.95rem;
  color: ${(props) => props.theme.colors.grey[500]};
  min-width: 80px;
  text-align: center;

  ${media.mobile} {
    font-size: 0.9rem;
    min-width: 60px;
  }
`;
