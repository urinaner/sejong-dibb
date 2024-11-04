import styled, { keyframes, css } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px); /* 살짝 위에서 나타나게 함 */
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

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
  ${({ isModalOpen }) =>
    isModalOpen &&
    css`
      animation: ${fadeIn} 0.3s ease-in-out; /* 애니메이션 추가 */
    `}
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
  animation: ${fadeIn} 0.3s ease-in-out; /* 모달 내용에도 애니메이션 추가 */

  h1 {
    text-align: center; /* 가운데 정렬 */
    font-size: 24px;
    margin-bottom: 16px;
  }
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
