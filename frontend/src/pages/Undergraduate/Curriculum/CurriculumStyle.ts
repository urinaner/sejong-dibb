import styled from 'styled-components';

const media = {
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

export const ImageWrapper = styled.div`
  width: 100%;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

export const CurriculumImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  object-fit: contain;
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  color: #4a5568;
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
  color: #c53030;
  border-radius: 8px;
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
  }
`;

export const ImageCaption = styled.div`
  padding: 1rem;
  text-align: center;
  color: #4a5568;
  font-size: 0.9rem;
  border-top: 1px solid #e2e8f0;
  background: #f8fafc;

  ${media.mobile} {
    padding: 0.75rem;
    font-size: 0.8rem;
  }
`;

export const DownloadLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  padding: 0.75rem 1rem;
  color: #2d3748;
  text-decoration: none;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 0.9rem;
  transition: all 0.2s ease-in-out;
  background: white;

  &:hover {
    background: #f8fafc;
    border-color: #cbd5e0;
  }

  svg {
    width: 18px;
    height: 18px;
  }

  ${media.mobile} {
    width: 100%;
    justify-content: center;
    font-size: 0.85rem;
  }
`;

export const DownloadSection = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;

  ${media.mobile} {
    margin-top: 1.5rem;
  }
`;

export const ZoomControls = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  gap: 0.5rem;
  background: white;
  padding: 0.25rem;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const ZoomButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  background: white;
  color: #4a5568;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f8fafc;
    border-color: #cbd5e0;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

export const ImageContainer = styled.div`
  width: 100%;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

export const Caption = styled.div`
  padding: 1rem;
  text-align: center;
  color: #4a5568;
  font-size: 0.9rem;
  border-top: 1px solid #e2e8f0;
  background: #f8fafc;

  ${media.mobile} {
    padding: 0.75rem;
    font-size: 0.8rem;
  }
`;