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
    padding: 20px 16px;
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid #e2e8f0;
`;

export const NavigationSection = styled.div`
  display: flex;
  align-items: center;

  button {
    color: #4a5568;

    &:hover {
      color: #1a73e8;
    }
  }
`;

export const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Title = styled.h1`
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 2rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0;

  ${media.mobile} {
    font-size: 1.5rem;
  }
`;

export const Subtitle = styled.h2`
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 1.25rem;
  font-weight: 500;
  color: #4a5568;
  margin: 0;

  ${media.mobile} {
    font-size: 1rem;
  }
`;

export const ActionSection = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;

  ${media.mobile} {
    flex-direction: column;
    width: 100%;

    button {
      width: 100%;
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
`;

export const DeleteConfirmationModal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  text-align: center;
  max-width: 400px;
  width: 90%;
`;

export const ModalTitle = styled.h3`
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a202c;
  margin: 1rem 0 0.5rem;
`;

export const ModalMessage = styled.p`
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 1rem;
  color: #4a5568;
  margin: 0 0 1.5rem;
  line-height: 1.5;
`;

export const ModalButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  width: 100%;
  justify-content: center;

  ${media.mobile} {
    flex-direction: column;

    button {
      width: 100%;
    }
  }
`;
