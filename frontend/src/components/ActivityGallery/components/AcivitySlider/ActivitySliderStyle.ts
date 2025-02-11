import styled from 'styled-components';

export const SliderContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  padding: 0 40px;

  @media (max-width: 768px) {
    padding: 0 30px;
  }
`;

export const SliderWrapper = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 10px 0;
`;

export const SliderTrack = styled.div<{ transform: string }>`
  display: flex;
  gap: 20px;
  transition: transform 0.5s ease-in-out;
  transform: ${(props) => props.transform};
`;

export const Card = styled.div<{ itemsPerView: number }>`
  flex: 0 0
    calc(
      (100% - ${(props) => (props.itemsPerView - 1) * 20}px) /
        ${(props) => props.itemsPerView}
    );
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

export const ImageContainer = styled.div<{ imageUrl: string }>`
  width: 100%;
  height: 200px;
  background-image: url(${(props) => props.imageUrl});
  background-size: cover;
  background-position: center;
`;

export const CardContent = styled.div`
  padding: 16px;
  background: white;
`;

export const Title = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
`;

export const Date = styled.p`
  margin: 0;
  font-size: 14px;
  color: #666;
`;

export const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: white;
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    background: #f8f8f8;
  }
`;

export const PrevButton = styled(NavigationButton)`
  left: 0;
`;

export const NextButton = styled(NavigationButton)`
  right: 0;
`;
