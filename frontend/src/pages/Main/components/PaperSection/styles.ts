import styled from 'styled-components';
import { media } from '../../../../styles/media';

export const Container = styled.section`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;

  ${media.tablet} {
    padding: 32px 16px;
  }

  ${media.mobile} {
    padding: 24px 12px;
  }
`;

export const Title = styled.h2`
  margin-bottom: 2rem;
  font-size: 30px;
  font-weight: 800;
  color: #5d5a88;
  text-align: center;

  ${media.tablet} {
    font-size: 24px;
    margin-bottom: 1.5rem;
  }

  ${media.mobile} {
    font-size: 22px;
    margin-bottom: 1.25rem;
  }
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  width: 100%;

  ${media.desktop} {
    grid-template-columns: repeat(4, 1fr);
  }

  ${media.tablet} {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  ${media.mobile} {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

export const PaperCard = styled.article`
  background: white;
  border-radius: 16px;
  border: 1px solid #d4d2e3;
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition:
    transform ${({ theme }) => theme.transitions.fast},
    box-shadow ${({ theme }) => theme.transitions.fast};

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 16px;

    ${media.tablet} {
      height: 180px;
    }

    ${media.mobile} {
      height: 160px;
    }
  }
`;

export const PaperTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 700;
  color: #5d5a88;
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 3em;

  ${media.mobile} {
    font-size: ${({ theme }) => theme.fontSizes.base};
  }
`;

export const PaperAuthor = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: #5d5a88;
  margin-bottom: 4px;

  ${media.mobile} {
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;

export const PaperInfo = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: #9e9e9e;
  margin-top: auto;

  ${media.mobile} {
    font-size: ${({ theme }) => theme.fontSizes.xs};
  }
`;
