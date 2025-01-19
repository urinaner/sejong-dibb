import styled from 'styled-components';

export const media = {
  mobile: '@media(max-width: 768px)',
  tablet: '@media(max-width: 1024px)',
};

export const Container = styled.div`
  max-width: 1400px;
  width: 85vw;
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
`;

export const BackButton = styled.button`
  color: #4a5568;
  font-size: 0.9rem;
  padding: 0.5rem 0.75rem;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #1a73e8;
  }

  ${media.mobile} {
    font-size: 0.8rem;
    padding: 0.4rem 0.6rem;
  }
`;

export const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  ${media.mobile} {
    gap: 0.25rem;
  }
`;

export const Title = styled.h1`
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
  font-size: 1.25rem;
  font-weight: 500;
  color: #4a5568;
  margin: 0;
  line-height: 1.4;

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
    margin-top: 0.75rem;

    button {
      width: 100%;
      justify-content: center;
    }
  }
`;

const BaseButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  font-size: 0.9rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 500;

  svg {
    width: 18px;
    height: 18px;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }

  ${media.mobile} {
    padding: 0.5rem 0.75rem;
    font-size: 0.85rem;

    svg {
      width: 16px;
      height: 16px;
    }
  }
`;

export const EditButton = styled(BaseButton)`
  background-color: white;
  border: 1px solid #e2e8f0;
  color: #4a5568;

  &:hover:not(:disabled) {
    background-color: #f8fafc;
    border-color: #cbd5e0;
  }
`;

export const DeleteButton = styled(BaseButton)`
  background-color: white;
  border: 1px solid #e2e8f0;
  color: #e53e3e;

  &:hover:not(:disabled) {
    background-color: #fff5f5;
    border-color: #feb2b2;
  }

  &:disabled {
    background-color: #fff5f5;
    border-color: #fed7d7;
    color: #fc8181;
  }
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;

  ${media.mobile} {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

export const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const InfoLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #4a5568;
  font-weight: 500;
  font-size: 0.9rem;

  svg {
    color: #1a73e8;
  }
`;

export const InfoValue = styled.div`
  color: #1a202c;
  font-size: 1rem;
  line-height: 1.5;
`;

export const DeleteConfirmationModal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  padding: 2rem;

  ${media.mobile} {
    padding: 1.5rem;
    gap: 1rem;
  }
`;

export const ModalTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0;

  ${media.mobile} {
    font-size: 1.1rem;
  }
`;

export const ModalMessage = styled.p`
  font-size: 1rem;
  color: #4a5568;
  margin: 0;
  line-height: 1.5;

  ${media.mobile} {
    font-size: 0.95rem;
  }
`;

export const ModalButtonGroup = styled.div`
  display: flex;
  justify-content: end;
  gap: 0.75rem;
  width: 100%;
  margin-top: 1.5rem;

  ${media.mobile} {
    margin-top: 1rem;
  }
`;

export const CancelButton = styled(BaseButton)`
  background-color: white;
  border: 1px solid #e2e8f0;
  color: #4a5568;

  &:hover {
    background-color: #f8fafc;
    border-color: #cbd5e0;
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
  font-size: 1.25rem;
  color: #4a5568;

  ${media.mobile} {
    font-size: 1.1rem;
  }
`;

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 60vh;
  gap: 1rem;
  font-size: 1.25rem;
  color: #e53e3e;

  svg {
    color: #e53e3e;
  }

  ${media.mobile} {
    font-size: 1.1rem;
    gap: 0.75rem;
  }
`;

export const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2rem;
  padding: 2rem;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;

  ${media.mobile} {
    grid-template-columns: 1fr;
    padding: 1.5rem;
    gap: 1.5rem;
  }
`;

export const ThumbnailSection = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 8px;
  overflow: hidden;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;

  ${media.mobile} {
    height: 300px;
  }
`;

export const ThumbnailImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
  }
`;

export const FallbackThumbnail = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background-color: #f8fafc;
  color: #94a3b8;

  svg {
    opacity: 0.5;
  }

  span {
    font-size: 0.875rem;
  }
`;

export const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

// ... 기존 스타일 컴포넌트들 ...

export const PublicationInfo = styled.div`
  color: #64748b;
  font-size: 0.95rem;
  padding: 1rem;
  background-color: #f8fafc;
  border-radius: 6px;
  border: 1px solid #e2e8f0;

  ${media.mobile} {
    font-size: 0.875rem;
    padding: 0.875rem;
  }
`;

export const ExternalLinkButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background-color: white;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  color: #1a73e8;
  text-decoration: none;
  font-size: 0.95rem;
  transition: all 0.2s ease-in-out;
  width: fit-content;

  &:hover {
    background-color: #f8fafc;
    border-color: #1a73e8;
  }

  svg {
    width: 18px;
    height: 18px;
  }

  ${media.mobile} {
    font-size: 0.875rem;
    padding: 0.625rem 0.875rem;

    svg {
      width: 16px;
      height: 16px;
    }
  }
`;
