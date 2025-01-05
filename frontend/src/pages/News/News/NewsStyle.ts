import styled from 'styled-components';
import { media } from '../../../styles/media';
import { SEJONG_COLORS } from '../../../constants/colors';

export const Container = styled.div`
  max-width: 90%;
  width: 90%;
  margin: 0 auto;
  padding: 2.5rem 1rem;

  ${media.mobile} {
    width: 95%;
    padding: 2rem 0.5rem;
  }
`;

export const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(600px, 1fr));
  gap: 1.75rem;
  margin-top: 1.75rem;

  ${media.mobile} {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
`;

export const NewsCard = styled.div`
  display: flex;
  border: 1px solid ${SEJONG_COLORS.COOL_GRAY};
  border-radius: 8px;
  overflow: hidden;
  background-color: white;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
`;

export const NewsImage = styled.div<{ imageUrl: string }>`
  width: 280px;
  min-width: 280px;
  height: 200px;
  background-image: url(${(props) => props.imageUrl});
  background-size: cover;
  background-position: center;
  background-color: ${SEJONG_COLORS.COOL_GRAY};
  transition: transform 0.3s ease;

  ${NewsCard}:hover & {
    transform: scale(1.05);
  }

  &.error {
    background-image: none;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${SEJONG_COLORS.GRAY};
    font-size: 0.875rem;
    &::after {
      content: '이미지를 불러올 수 없습니다';
    }
  }

  ${media.mobile} {
    width: 120px;
    min-width: 120px;
    height: 120px;
  }
`;

export const NewsContent = styled.div`
  flex: 1;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
`;

export const NewsTitle = styled.h3`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: ${SEJONG_COLORS.GRAY};
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 2.8rem;

  ${media.mobile} {
    font-size: 1.25rem;
  }
`;

export const NewsDate = styled.p`
  margin: 1rem 0 0 0;
  font-size: 0.95rem;
  color: ${SEJONG_COLORS.LIGHT_GRAY};
`;

export const NewsDescription = styled.p`
  margin: 0.875rem 0;
  font-size: 1rem;
  color: ${SEJONG_COLORS.WARM_GRAY2};
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 3.2em;

  ${media.mobile} {
    font-size: 0.95rem;
  }
`;

export const NewsFooter = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1.5rem;
  padding-top: 1.25rem;
  border-top: 1px solid ${SEJONG_COLORS.COOL_GRAY}20;

  ${media.mobile} {
    margin-top: 1.25rem;
    padding-top: 1.25rem;
  }
`;

export const NewsViews = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
  color: ${SEJONG_COLORS.LIGHT_GRAY};

  svg {
    width: 1.25rem;
    height: 1.25rem;
    color: ${SEJONG_COLORS.WARM_GRAY1};
  }
`;

export const AdminButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 2rem;

  ${media.mobile} {
    margin-bottom: 1.5rem;
  }
`;

export const CreateButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  background-color: ${SEJONG_COLORS.CRIMSON_RED};
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${SEJONG_COLORS.DARK_RED};
    box-shadow: 0 2px 4px rgba(139, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: none;
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }

  ${media.mobile} {
    padding: 0.625rem 1.25rem;
    font-size: 0.95rem;
  }
`;

export const AdminActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-left: auto;

  ${media.mobile} {
    gap: 0.375rem;
  }
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border: 1px solid ${SEJONG_COLORS.COOL_GRAY};
  border-radius: 6px;
  background: white;
  color: ${SEJONG_COLORS.GRAY};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${SEJONG_COLORS.IVORY};
    border-color: ${SEJONG_COLORS.CRIMSON_RED};
    color: ${SEJONG_COLORS.CRIMSON_RED};
  }

  &:last-child:hover {
    border-color: ${SEJONG_COLORS.RED};
    color: ${SEJONG_COLORS.RED};
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }

  ${media.mobile} {
    padding: 0.375rem;

    svg {
      width: 1.125rem;
      height: 1.125rem;
    }
  }
`;

export const Pagination = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid ${SEJONG_COLORS.COOL_GRAY}20;
`;

export const PageList = styled.ul`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const PageItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PageButton = styled.button<{ isActive?: boolean }>`
  min-width: 2.5rem;
  height: 2.5rem;
  padding: 0 0.75rem;
  border: 1px solid
    ${(props) =>
      props.isActive ? SEJONG_COLORS.CRIMSON_RED : SEJONG_COLORS.COOL_GRAY};
  background: ${(props) =>
    props.isActive ? SEJONG_COLORS.CRIMSON_RED : 'white'};
  color: ${(props) => (props.isActive ? 'white' : SEJONG_COLORS.GRAY)};
  font-size: 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover:not(:disabled) {
    background: ${(props) =>
      props.isActive ? '#8b0000' : SEJONG_COLORS.COOL_GRAY}10;
    border-color: ${(props) =>
      props.isActive ? '#8b0000' : SEJONG_COLORS.CRIMSON_RED};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:active:not(:disabled) {
    transform: translateY(1px);
  }

  ${media.mobile} {
    min-width: 2.25rem;
    height: 2.25rem;
    padding: 0 0.5rem;
    font-size: 0.95rem;
  }
`;

export const PaginationButton = styled.button<{
  direction?: 'prev' | 'next';
  disabled?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  min-width: 6rem;
  border: 1px solid
    ${(props) =>
      props.disabled ? SEJONG_COLORS.COOL_GRAY : SEJONG_COLORS.CRIMSON_RED};
  background-color: white;
  color: ${(props) =>
    props.disabled ? SEJONG_COLORS.LIGHT_GRAY : SEJONG_COLORS.CRIMSON_RED};
  font-size: 1rem;
  border-radius: 6px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.2s ease-in-out;

  &:hover:not(:disabled) {
    background: ${SEJONG_COLORS.COOL_GRAY}10;
    border-color: ${(props) =>
      props.disabled ? SEJONG_COLORS.COOL_GRAY : '#8b0000'};
  }

  &:active:not(:disabled) {
    transform: translateY(1px);
  }

  ${media.mobile} {
    padding: 0.625rem 1rem;
    min-width: 5rem;
    font-size: 0.95rem;
  }
`;

export const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  color: ${SEJONG_COLORS.CRIMSON_RED};
  font-size: 1.125rem;
`;

export const ErrorMessage = styled.div`
  text-align: center;
  padding: 2.5rem;
  margin: 2rem 0;
  color: ${SEJONG_COLORS.CRIMSON_RED};
  font-size: 1.125rem;
  background-color: #fff5f5;
  border-radius: 8px;
  border: 1px solid ${SEJONG_COLORS.CRIMSON_RED}20;
`;

export const NoResults = styled.div`
  text-align: center;
  padding: 3rem;
  color: ${SEJONG_COLORS.GRAY};
  background-color: ${SEJONG_COLORS.COOL_GRAY}10;
  border: 1px solid ${SEJONG_COLORS.COOL_GRAY};
  border-radius: 8px;
  margin-top: 2rem;
  font-size: 1.125rem;
`;
