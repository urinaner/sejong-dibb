import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 95vh;
  overflow: hidden;
  background-color: #000;

  @media (max-width: 768px) {
    height: 60vh;
  }
`;

export const SlideTrack = styled.div<{ transform: string }>`
  display: flex;
  width: 100%;
  height: 100%;
  transform: ${(props) => props.transform};
  transition: transform 0.5s ease-in-out;
`;

export const Controls = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  z-index: 3;
  display: flex;
  justify-content: space-between;
  padding: 0 2rem;
`;

export const ControlButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;
