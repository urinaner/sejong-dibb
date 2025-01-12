import styled from 'styled-components';

interface NewsCardWrapperProps {
  itemsPerView: number;
}

interface SliderTrackProps {
  transform: string;
  gap: number;
}

const media = {
  tablet: '@media(max-width: 1024px)',
  mobile: '@media(max-width: 768px)',
  small: '@media(max-width: 480px)',
};

// 최상위 컨테이너 - 버튼을 포함한 전체 영역
export const OuterContainer = styled.div`
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  padding: 0 20px;

  ${media.mobile} {
    padding: 0 16px;
  }
`;

// 실제 슬라이더를 감싸는 컨테이너
export const SliderContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  padding: 0 40px; // 네비게이션 버튼을 위한 여백

  ${media.mobile} {
    padding: 0 32px;
  }

  ${media.small} {
    padding: 0 28px;
  }
`;

// 슬라이더 내용물을 감싸는 래퍼
export const SliderWrapper = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
`;

// 실제 슬라이딩되는 트랙
export const SliderTrack = styled.div<SliderTrackProps>`
  display: flex;
  gap: ${(props) => props.gap}px;
  transition: transform 0.5s ease-in-out;
  transform: ${(props) => props.transform};
  width: 100%;
`;

// 개별 카드 래퍼
export const NewsCardWrapper = styled.div<NewsCardWrapperProps>`
  flex: 0 0
    calc(
      (100% - ${(props) => (props.itemsPerView - 1) * 20}px) /
        ${(props) => props.itemsPerView}
    );
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

// 나머지 스타일 컴포넌트들...
export const NewsImage = styled.div<{ imageUrl: string }>`
  width: 100%;
  height: 180px;
  background-image: url(${(props) => props.imageUrl});
  background-size: cover;
  background-position: center;

  ${media.tablet} {
    height: 160px;
  }

  ${media.mobile} {
    height: 140px;
  }

  ${media.small} {
    height: 180px;
  }
`;

export const NewsContent = styled.div`
  padding: 16px;

  ${media.mobile} {
    padding: 12px;
  }
`;

export const NewsTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.4;
  height: 44px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  ${media.mobile} {
    font-size: 14px;
    height: 40px;
  }
`;

export const NewsFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;

  ${media.mobile} {
    margin-top: 8px;
  }
`;

export const NewsDate = styled.p`
  margin: 0;
  font-size: 14px;
  color: #666;

  ${media.mobile} {
    font-size: 12px;
  }
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

  ${media.mobile} {
    font-size: 12px;
  }
`;

const BaseButton = styled.button`
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
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover:not(:disabled) {
    background: #f5f5f5;
    border-color: #999;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${media.mobile} {
    width: 32px;
    height: 32px;
  }

  ${media.small} {
    width: 28px;
    height: 28px;
  }
`;

export const PrevButton = styled(BaseButton)`
  left: 0;
`;

export const NextButton = styled(BaseButton)`
  right: 0;
`;
