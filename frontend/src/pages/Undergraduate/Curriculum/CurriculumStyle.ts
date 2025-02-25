import styled from 'styled-components';

const media = {
  mobile: '@media(max-width: 768px)',
  tablet: '@media(max-width: 1024px)',
};

export const ImageWrapper = styled.div`
  width: 100%;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  background: white;
  overflow: hidden;
  user-select: none;
  touch-action: none;
  min-height: 200px;
`;

export const CurriculumImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  object-fit: contain;
  transform-origin: center;
  will-change: transform;
  user-select: none;
  -webkit-user-drag: none;
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

export const DownloadSection = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;

  ${media.mobile} {
    margin-top: 0.75rem;
  }
`;

export const DownloadLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
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
  z-index: 10;
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

  &:hover:not(:disabled) {
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

export const DragInstructions = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.85rem;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s;

  ${ImageContainer}:hover & {
    opacity: 1;
  }

  ${media.mobile} {
    display: none;
  }
`;

export const TouchInstructions = styled.div`
  display: none;
  text-align: center;
  color: #4a5568;
  font-size: 0.85rem;
  margin-top: 0.5rem;

  ${media.mobile} {
    display: block;
  }
`;
