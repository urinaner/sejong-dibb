import styled from 'styled-components';

interface ModalWrapperProps<ModalWrapperProps> {
  isModalOpen: boolean;
}

export const ModalWrapper = styled.div<{ isModalOpen: boolean }>`
  display: ${({ isModalOpen }) => (isModalOpen ? 'flex' : 'none')};
  position: fixed;
  overflow: ${(isModalOpen) => (isModalOpen ? 'hidden' : 'auto')};
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* 반투명 배경 */
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 400px;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  background: white;
`;

export const CloseButton = styled.button`
  width: fit-content;
  height: fit-content;
  align-self: flex-end;
  margin-top: 16px;
  padding: 8px 16px;
  border: none;
  color: white;
  border-radius: 4px;
  background-color: #007bff;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
