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
  bottom: 2rem;
  right: 2rem;
  z-index: 3;
  display: flex;
  gap: 1rem;
`;

export const ControlButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: background-color 0.3s;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;
