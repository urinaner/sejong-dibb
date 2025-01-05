// NewsDetailStyle.ts
import styled from 'styled-components';
import { media } from '../../../styles/media';
import { SEJONG_COLORS } from '../../../constants/colors';

export const Container = styled.div`
  max-width: 1000px;
  width: 95%;
  margin: 0 auto;
  padding: 40px 20px;

  ${media.mobile} {
    padding: 20px 10px;
  }
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border: 1px solid ${SEJONG_COLORS.COOL_GRAY};
  border-radius: 4px;
  background: white;
  color: ${SEJONG_COLORS.GRAY};
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${SEJONG_COLORS.IVORY};
    color: ${SEJONG_COLORS.CRIMSON_RED};
  }
`;

export const NewsWrapper = styled.article`
  margin-top: 24px;
  background: white;
  border: 1px solid ${SEJONG_COLORS.COOL_GRAY};
  border-radius: 8px;
  overflow: hidden;
`;

export const NewsHeader = styled.header`
  padding: 24px;
`;

export const NewsTitle = styled.h1`
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  color: ${SEJONG_COLORS.GRAY};
  line-height: 1.4;

  ${media.mobile} {
    font-size: 20px;
  }
`;

export const NewsMetadata = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 16px;
`;

export const NewsDate = styled.span`
  font-size: 14px;
  color: ${SEJONG_COLORS.LIGHT_GRAY};
`;

export const NewsViews = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: ${SEJONG_COLORS.LIGHT_GRAY};

  svg {
    color: ${SEJONG_COLORS.WARM_GRAY1};
  }
`;

export const NewsDivider = styled.hr`
  margin: 0;
  border: none;
  border-top: 1px solid ${SEJONG_COLORS.COOL_GRAY};
`;

export const NewsImage = styled.img`
  display: block;
  width: 100%;
  max-height: 500px;
  object-fit: cover;
  margin: 0 auto;
`;

export const NewsContent = styled.div`
  padding: 24px;
  font-size: 16px;
  line-height: 1.8;
  color: ${SEJONG_COLORS.GRAY};
  white-space: pre-wrap;

  ${media.mobile} {
    font-size: 15px;
  }
`;

export const NewsLink = styled.a`
  display: inline-block;
  margin: 0 24px 24px;
  padding: 8px 16px;
  border: 1px solid ${SEJONG_COLORS.CRIMSON_RED};
  border-radius: 4px;
  color: ${SEJONG_COLORS.CRIMSON_RED};
  text-decoration: none;
  font-size: 14px;
  transition: all 0.2s;

  &:hover {
    background: ${SEJONG_COLORS.CRIMSON_RED};
    color: white;
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
