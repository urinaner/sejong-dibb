import styled from 'styled-components';

const media = {
  tablet: '@media(max-width: 1024px)',
  mobile: '@media(max-width: 768px)',
  small: '@media(max-width: 480px)',
};

export const SliderContainer = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;

  ${media.mobile} {
    padding: 16px;
  }
`;
export const SliderTrack = styled.div<{ transform: string }>`
  display: flex;
  gap: 20px;
  transition: transform 0.5s ease-in-out;
  transform: ${(props) => props.transform};
  width: 100%;

  ${media.mobile} {
    gap: 16px;
    padding: 0 20px;
  }
`;
export const NewsCardWrapper = styled.div`
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  ${media.mobile} {
    max-width: 100%;
    margin: 0;
  }
`;

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

  ${media.small} {
    font-size: 15px;
    height: 42px;
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

  ${media.small} {
    font-size: 13px;
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
    width: 16px;
    height: 16px;
  }

  ${media.mobile} {
    font-size: 12px;

    svg {
      width: 14px;
      height: 14px;
    }
  }

  ${media.small} {
    font-size: 13px;
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
  left: 10px;

  ${media.small} {
    left: 5px;
  }
`;

export const NextButton = styled(BaseButton)`
  right: 10px;

  ${media.small} {
    right: 5px;
  }
`;
