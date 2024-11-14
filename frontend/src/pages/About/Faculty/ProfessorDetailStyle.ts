import styled from 'styled-components';

export const media = {
  mobile: '@media(max-width: 768px)',
  tablet: '@media(max-width: 1024px)',
};

export const Container = styled.div`
  max-width: 1400px;
  width: 95%;
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
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid #e2e8f0;

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
    color: #4a5568;
    font-size: 0.9rem;
    padding: 0.5rem 0.75rem;

    &:hover {
      color: #1a73e8;
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
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 2rem;
  font-weight: 600;
  color: #1a202c;
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
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 1.25rem;
  font-weight: 500;
  color: #4a5568;
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

  ${media.tablet} {
    button {
      padding: 0.5rem 0.875rem;
    }
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  color: #4a5568;
  font-size: 1.1rem;
  font-family: 'Noto Sans KR', sans-serif;

  ${media.mobile} {
    min-height: 200px;
    font-size: 0.9rem;
  }

  ${media.tablet} {
    min-height: 250px;
    font-size: 1rem;
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
  color: #c53030;
  border-radius: 8px;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 1rem;
  border: 1px solid #feb2b2;
  text-align: center;
  justify-content: center;

  svg {
    flex-shrink: 0;
  }

  ${media.mobile} {
    margin: 1rem;
    padding: 0.75rem;
    font-size: 0.875rem;
    gap: 0.375rem;

    svg {
      width: 20px;
      height: 20px;
    }
  }

  ${media.tablet} {
    margin: 1.5rem auto;
    max-width: 500px;
  }
`;

export const DeleteConfirmationModal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  text-align: center;
  max-width: 400px;
  width: 90%;

  ${media.mobile} {
    padding: 1.5rem;
    width: 95%;

    svg {
      width: 40px;
      height: 40px;
    }
  }
`;

export const ModalTitle = styled.h3`
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a202c;
  margin: 1rem 0 0.5rem;

  ${media.mobile} {
    font-size: 1.25rem;
    margin: 0.75rem 0 0.375rem;
  }
`;

export const ModalMessage = styled.p`
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 1rem;
  color: #4a5568;
  margin: 0 0 1.5rem;
  line-height: 1.5;

  ${media.mobile} {
    font-size: 0.875rem;
    margin: 0 0 1.25rem;
  }
`;

export const ModalButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  width: 100%;
  justify-content: center;

  button {
    min-width: 80px;
  }

  ${media.mobile} {
    flex-direction: column;
    gap: 0.375rem;

    button {
      width: 100%;
      min-width: 0;
      padding: 0.5rem;
    }
  }
`;
