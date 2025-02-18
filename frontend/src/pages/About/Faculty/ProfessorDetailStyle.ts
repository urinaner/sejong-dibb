import styled from 'styled-components';
import { SEJONG_COLORS } from '../../../constants/colors';

export const media = {
  mobile: '@media(max-width: 768px)',
  tablet: '@media(max-width: 1024px)',
};

export const Container = styled.div`
  max-width: 1400px;
  width: 80vw;
  margin: 0 auto;
  padding: 40px 20px;

  ${media.mobile} {
    width: 90vw;
    padding: 20px 16px;
  }

  ${media.tablet} {
    width: 80vw;
    padding: 30px 20px;
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid ${SEJONG_COLORS.CRIMSON_RED};

  ${media.mobile} {
    gap: 1rem;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
  }
`;

export const NavigationSection = styled.div`
  display: flex;
  align-items: center;

  button {
    color: ${(props) => props.theme.colors.grey[500]};
    font-size: 0.9rem;
    padding: 0.5rem 0.75rem;

    &:hover {
      color: ${SEJONG_COLORS.CRIMSON_RED};
    }

    ${media.mobile} {
      font-size: 0.8rem;
      padding: 0.4rem 0.6rem;

      svg {
        width: 16px;
        height: 16px;
      }
    }
  }
`;

export const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  ${media.mobile} {
    gap: 0.25rem;
  }

  ${media.tablet} {
    gap: 0.4rem;
  }
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  color: ${SEJONG_COLORS.CRIMSON_RED};
  margin: 0;
  line-height: 1.3;

  ${media.mobile} {
    font-size: 1.5rem;
  }

  ${media.tablet} {
    font-size: 1.75rem;
  }
`;

export const Subtitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 500;
  color: ${(props) => props.theme.colors.grey[500]};
  margin: 0;
  line-height: 1.4;

  ${media.mobile} {
    font-size: 1rem;
  }

  ${media.tablet} {
    font-size: 1.1rem;
  }
`;

export const ActionSection = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;

  button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.625rem 1rem;
    background-color: ${SEJONG_COLORS.CRIMSON_RED};
    color: white;

    &:hover {
      background-color: ${(props) => props.theme.colors.primary.crimsonDark};
    }

    svg {
      width: 18px;
      height: 18px;
    }
  }

  ${media.mobile} {
    flex-direction: column;
    width: 100%;
    margin-top: 0.75rem;

    button {
      width: 100%;
      justify-content: center;
      padding: 0.5rem 0.75rem;

      svg {
        width: 16px;
        height: 16px;
      }
    }
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  color: ${(props) => props.theme.colors.grey[500]};
  font-size: 1.1rem;

  ${media.mobile} {
    min-height: 200px;
    font-size: 0.9rem;
  }
`;

export const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 2rem auto;
  padding: 1rem;
  max-width: 600px;
  background-color: #fff5f5;
  color: ${SEJONG_COLORS.CRIMSON_RED};
  border-radius: 8px;

  font-size: 1rem;
  border: 1px solid ${(props) => props.theme.colors.grey[300]};
  text-align: center;
  justify-content: center;

  svg {
    flex-shrink: 0;
    color: ${SEJONG_COLORS.CRIMSON_RED};
  }

  ${media.mobile} {
    margin: 1rem;
    padding: 0.75rem;
    font-size: 0.875rem;
    gap: 0.375rem;
  }
`;

export const PublicationsContainer = styled.div`
  margin-top: 2.5rem;
  padding-top: 2rem;
  border-top: 2px solid ${(props) => props.theme.colors.grey[200]};

  ${media.mobile} {
    margin-top: 2rem;
    padding-top: 1.5rem;
  }
`;

export const PublicationsTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${SEJONG_COLORS.CRIMSON_RED};
  margin: 0 0 1.5rem 0;

  ${media.mobile} {
    font-size: 1.25rem;
    margin: 0 0 1rem 0;
  }
`;
