import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(2px);
  transition: opacity 0.2s ease-in-out;
`;

export const ModalContainer = styled.div`
  background-color: white;
  padding: 28px 32px;
  border-radius: 12px;
  min-width: 360px;
  max-width: 560px;
  width: 90%;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12);
  transform: translateY(0);
  transition: transform 0.2s ease-in-out;

  @media (max-width: 480px) {
    padding: 24px;
    min-width: 320px;
    width: 95%;
  }
`;

export const ModalHeader = styled.div`
  margin-bottom: 24px;
  font-family:
    'Plus Jakarta Sans',
    -apple-system,
    BlinkMacSystemFont,
    sans-serif;
  font-size: 1.4rem;
  font-weight: 600;
  color: #1a1a1a;
  line-height: 1.3;
`;

export const ModalContent = styled.div`
  margin-bottom: 28px;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  color: #4a4a4a;

  @media (max-width: 480px) {
    margin-bottom: 24px;
    font-size: 0.95rem;
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 8px;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 8px;
  }
`;

export const Button = styled.button`
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  background-color: #1a73e8;
  color: white;
  cursor: pointer;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #1557b0;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(26, 115, 232, 0.2);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: 12px 20px;
  }
`;
