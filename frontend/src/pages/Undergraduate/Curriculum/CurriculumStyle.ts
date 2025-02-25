import styled from 'styled-components';
import { media } from '../../../styles/media';

export const ImageWrapper = styled.div`
  width: 100%;
  margin-bottom: 2rem;
  box-sizing: border-box;
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  background: white;
  overflow: hidden;
  user-select: none;
  touch-action: none;
  min-height: 200px;
  margin-bottom: 1rem;
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
  text-align: center;
  color: #4a5568;
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.5rem;

  ${media.mobile} {
    font-size: 0.9rem;
  }
`;

export const DownloadSection = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;

  ${media.mobile} {
    margin-bottom: 2rem;
  }
`;

export const DownloadLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  color: #2d3748;
  text-decoration: none;
  font-size: 0.95rem;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: #1a202c;
    text-decoration: underline;
  }

  svg {
    width: 18px;
    height: 18px;
  }

  ${media.mobile} {
    width: 100%;
    justify-content: center;
    font-size: 0.9rem;
    padding: 0.75rem 1rem;
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

export const SectionTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  color: #2d3748;
  margin: 2rem 0 1.5rem;
  text-align: center;

  ${media.mobile} {
    font-size: 1.5rem;
    margin: 1.5rem 0 1rem;
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
  text-align: center;
  color: #4a5568;
  font-size: 0.85rem;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  display: none;

  ${media.mobile} {
    display: block;
  }
`;
