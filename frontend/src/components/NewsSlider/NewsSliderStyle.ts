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

export const OuterContainer = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
  isolation: isolate;
`;

export const SliderContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  z-index: 1;

  ${media.mobile} {
    padding: 0 30px;
  }
`;

export const SliderWrapper = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 10px 0;
`;

export const SliderTrack = styled.div<SliderTrackProps>`
  display: flex;
  gap: ${(props) => props.gap}px;
  transition: transform 0.5s ease-in-out;
  transform: ${(props) => props.transform};
  width: 100%;
`;

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

// 기존 스타일 유지
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
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    background: #f8f8f8;
  }
`;

export const PrevButton = styled(BaseButton)`
  left: 0;
`;

export const NextButton = styled(BaseButton)`
  right: 0;
`;
