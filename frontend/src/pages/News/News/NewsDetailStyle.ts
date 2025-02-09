import styled from 'styled-components';
import { media } from '../../../styles/media';
import { SEJONG_COLORS } from '../../../constants/colors';

export const Container = styled.div`
  max-width: 900px;
  width: 80vw;
  margin: 0 auto;
  padding: 3rem 1.5rem;

  ${media.mobile} {
    padding: 2rem 1rem;
  }
`;

export const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border: none;
  background: none;
  color: ${SEJONG_COLORS.GRAY};
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: ${SEJONG_COLORS.CRIMSON_RED};
    transform: translateX(-4px);
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

export const NewsWrapper = styled.article`
  margin-top: 2rem;
  background: white;
`;

export const NewsHeader = styled.header`
  margin-bottom: 2rem;
`;

export const NewsTitle = styled.h1`
  margin: 0;
  font-size: 2rem;
  font-weight: 800;
  color: ${SEJONG_COLORS.GRAY};
  line-height: 1.4;
  letter-spacing: -0.02em;

  ${media.mobile} {
    font-size: 1.5rem;
  }
`;

export const NewsMetadata = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${SEJONG_COLORS.COOL_GRAY}15;
`;

export const NewsDate = styled.span`
  font-size: 0.875rem;
  color: ${SEJONG_COLORS.LIGHT_GRAY};
`;

export const NewsViews = styled.span`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  color: ${SEJONG_COLORS.LIGHT_GRAY};

  svg {
    width: 1rem;
    height: 1rem;
    color: ${SEJONG_COLORS.WARM_GRAY1};
  }
`;

export const NewsDivider = styled.hr`
  display: none;
`;

export const NewsImage = styled.img`
  display: block;
  width: 100%;
  max-height: 480px;
  object-fit: cover;
  margin: 2rem 0;
  border-radius: 0.5rem;
`;

export const NewsContent = styled.div`
  font-size: 1rem;
  line-height: 1.8;
  color: ${SEJONG_COLORS.GRAY};
  white-space: pre-wrap;
  letter-spacing: -0.01em;

  ${media.mobile} {
    font-size: 0.9375rem;
  }
`;

export const NewsLink = styled.a`
  display: inline-flex;
  align-items: center;
  margin-top: 2rem;
  padding: 0.75rem 1.25rem;
  border: none;
  border-radius: 0.375rem;
  background-color: ${SEJONG_COLORS.CRIMSON_RED}10;
  color: ${SEJONG_COLORS.CRIMSON_RED};
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    background-color: ${SEJONG_COLORS.CRIMSON_RED}20;
    transform: translateY(-2px);
  }
`;

export const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
  color: ${SEJONG_COLORS.CRIMSON_RED};
  font-size: 0.875rem;
`;

export const ErrorMessage = styled.div`
  text-align: center;
  padding: 3rem 2rem;
  color: ${SEJONG_COLORS.CRIMSON_RED};
  font-size: 0.875rem;
  background-color: ${SEJONG_COLORS.CRIMSON_RED}10;
  border-radius: 0.5rem;
`;
