import styled from 'styled-components';
import { SEJONG_COLORS } from '../../constants/colors';

export const media = {
  mobile: '@media(max-width: 768px)',
  tablet: '@media(max-width: 1024px)',
  desktop: '@media(min-width: 1025px)',
};

// Global container style for consistency across pages
export const Container = styled.div`
  max-width: 1400px;
  width: 80vw;
  margin: 0 auto;
  padding: 40px 20px;

  ${media.mobile} {
    width: 100%;
    padding: 20px 16px;
  }

  ${media.tablet} {
    width: 90%;
    padding: 30px 20px;
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid ${SEJONG_COLORS.CRIMSON_RED};

  ${media.mobile} {
    margin-bottom: 1rem;
  }
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: ${SEJONG_COLORS.CRIMSON_RED};
  margin: 0;

  ${media.mobile} {
    font-size: 1.6rem;
  }
`;

export const CenteredTitle = styled(Title)`
  text-align: center;
`;

export const SubtitleContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2.5rem;

  ${media.mobile} {
    margin-bottom: 1.5rem;
  }
`;

export const Subtitle = styled.div`
  text-align: center;
  font-size: 1.2rem;
  margin-bottom: 2rem;
  line-height: 1.6;
  color: ${(props) => props.theme.colors.grey[500]};
  font-weight: 400;

  ${media.mobile} {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  ${media.mobile} {
    gap: 1.5rem;
  }
`;

export const ContentSection = styled.div`
  padding: 2rem 0;
  border-bottom: 1px solid ${(props) => props.theme.colors.grey[200]};

  &:last-child {
    border-bottom: none;
  }

  ${media.mobile} {
    padding: 1.5rem 0;
  }
`;

export const InfoTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${SEJONG_COLORS.CRIMSON_RED};
  margin: 0 0 1.5rem 0;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid ${(props) => props.theme.colors.grey[200]};
  text-align: center;

  ${media.mobile} {
    font-size: 1.3rem;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
  }
`;

export const MarkdownContainer = styled.div`
  line-height: 1.6;
  font-size: 1rem;
  color: ${(props) => props.theme.colors.grey[500]};

  p {
    margin: 0.8rem 0;
  }

  strong {
    color: ${SEJONG_COLORS.CRIMSON_RED};
    font-weight: 600;
  }

  ul,
  ol {
    margin: 1rem 0;
    padding-left: 1.5rem;
  }

  li {
    margin-bottom: 0.5rem;
    position: relative;
  }

  blockquote {
    margin: 1rem 0;
    padding: 0.5rem 1rem;
    border-left: 4px solid ${SEJONG_COLORS.CRIMSON_RED};
    background-color: ${(props) => props.theme.colors.grey[50]};
  }

  ${media.mobile} {
    font-size: 0.9rem;
  }
`;
