// NewsSliderStyle.ts
import styled from 'styled-components';

// 컨테이너 스타일
export const SliderContainer = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 20px 0;
`;

export const SliderTrack = styled.div<{ transform: string }>`
  display: flex;
  gap: 20px;
  transition: transform 0.5s ease-in-out;
  transform: ${(props) => props.transform};
`;

// 뉴스 카드 스타일
export const NewsCardWrapper = styled.div`
  flex: 0 0 calc(25% - 15px);
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
  }

  @media (max-width: 1024px) {
    flex: 0 0 calc(33.333% - 14px);
  }

  @media (max-width: 768px) {
    flex: 0 0 calc(50% - 10px);
  }

  @media (max-width: 480px) {
    flex: 0 0 100%;
  }
`;

export const NewsImage = styled.div<{ imageUrl: string }>`
  width: 100%;
  height: 200px;
  background-image: url(${(props) => props.imageUrl});
  background-size: cover;
  background-position: center;
`;

export const NewsContent = styled.div`
  padding: 16px;
`;

export const NewsTitle = styled.h3`
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.4;
  height: 44px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const NewsDate = styled.p`
  margin: 0;
  font-size: 14px;
  color: #666;
`;

// 컨트롤 버튼 스타일
const BaseButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: white;
  border: 1px solid #ddd;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
  transition: all 0.2s ease;

  &:hover {
    background: #f5f5f5;
    border-color: #999;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    width: 32px;
    height: 32px;
  }
`;

export const PrevButton = styled(BaseButton)`
  left: 10px;
`;

export const NextButton = styled(BaseButton)`
  right: 10px;
`;
export const NewsFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
`;

export const ViewCount = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #666;
  font-size: 14px;

  svg {
    color: #999;
  }
`;
