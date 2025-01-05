import styled from 'styled-components';
import { media } from '../../../styles/media';
import { SEJONG_COLORS } from '../../../constants/colors';

export const Container = styled.div`
  max-width: 1400px;
  width: 95%;
  margin: 0 auto;
  padding: 40px 20px;

  ${media.mobile} {
    padding: 20px 10px;
  }
`;

export const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  margin-top: 20px;

  ${media.mobile} {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

export const NewsCard = styled.div`
  border: 1px solid ${SEJONG_COLORS.COOL_GRAY};
  border-radius: 8px;
  overflow: hidden;
  background-color: white;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

export const NewsImageWrapper = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  background-color: ${SEJONG_COLORS.COOL_GRAY};
  position: relative;
`;

export const NewsImage = styled.div<{ imageUrl: string }>`
  width: 100%;
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
    font-size: 14px;
    &::after {
      content: '이미지를 불러올 수 없습니다';
    }
  }
`;

export const ImageFallback = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${SEJONG_COLORS.COOL_GRAY};
  color: ${SEJONG_COLORS.GRAY};
  font-size: 14px;
`;

export const NewsContent = styled.div`
  padding: 20px;
`;

export const NewsTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: ${SEJONG_COLORS.GRAY};
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  ${media.mobile} {
    font-size: 16px;
  }
`;

export const NewsDate = styled.p`
  margin: 8px 0 0 0;
  font-size: 14px;
  color: ${SEJONG_COLORS.LIGHT_GRAY};
`;

export const NewsDescription = styled.p`
  margin: 12px 0;
  font-size: 14px;
  color: ${SEJONG_COLORS.WARM_GRAY2};
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 4.8em;

  ${media.mobile} {
    font-size: 13px;
  }
`;

export const NewsFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid ${SEJONG_COLORS.COOL_GRAY};
`;

export const NewsViews = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: ${SEJONG_COLORS.LIGHT_GRAY};

  svg {
    width: 16px;
    height: 16px;
    color: ${SEJONG_COLORS.WARM_GRAY1};
  }
`;

export const PaginationButton = styled.button<{
  direction?: 'prev' | 'next';
  disabled?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  min-width: 80px;
  height: 36px;
  border: 1px solid
    ${(props) =>
      props.disabled ? SEJONG_COLORS.COOL_GRAY : SEJONG_COLORS.CRIMSON_RED};
  background-color: white;
  color: ${(props) =>
    props.disabled ? SEJONG_COLORS.LIGHT_GRAY : SEJONG_COLORS.CRIMSON_RED};
  font-size: 14px;
  border-radius: 4px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background-color: ${SEJONG_COLORS.IVORY};
  }

  svg {
    width: 16px;
    height: 16px;
    margin: ${(props) =>
      props.direction === 'prev' ? '0 4px 0 0' : '0 0 0 4px'};
  }

  ${media.mobile} {
    min-width: 60px;
    padding: 6px 8px;
    font-size: 13px;
  }
`;

export const PageEllipsis = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  color: ${SEJONG_COLORS.GRAY};

  ${media.mobile} {
    width: 32px;
    height: 32px;
  }
`;

export const Pagination = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
`;

export const PageList = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  gap: 8px;
`;

export const PageItem = styled.li`
  margin: 0;
  padding: 0;
`;

export const PageButton = styled.button<{ isActive?: boolean }>`
  min-width: 36px;
  height: 36px;
  padding: 0 12px;
  border: 1px solid
    ${(props) =>
      props.isActive ? SEJONG_COLORS.CRIMSON_RED : SEJONG_COLORS.COOL_GRAY};
  background: ${(props) =>
    props.isActive ? SEJONG_COLORS.CRIMSON_RED : 'white'};
  color: ${(props) => (props.isActive ? 'white' : SEJONG_COLORS.GRAY)};
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${(props) =>
      props.isActive ? SEJONG_COLORS.CRIMSON_RED : SEJONG_COLORS.IVORY};
  }

  &:disabled {
    background: ${SEJONG_COLORS.COOL_GRAY};
    border-color: ${SEJONG_COLORS.COOL_GRAY};
    color: ${SEJONG_COLORS.LIGHT_GRAY};
    cursor: not-allowed;
  }

  ${media.mobile} {
    min-width: 32px;
    height: 32px;
    padding: 0 8px;
    font-size: 13px;
  }
`;

export const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  color: ${SEJONG_COLORS.CRIMSON_RED};
`;

export const ErrorMessage = styled.div`
  text-align: center;
  padding: 40px;
  color: ${SEJONG_COLORS.CRIMSON_RED};
  font-size: 16px;
`;

export const NoResults = styled.div`
  text-align: center;
  padding: 40px;
  color: ${SEJONG_COLORS.GRAY};
  font-size: 16px;
`;
