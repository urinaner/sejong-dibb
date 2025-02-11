import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styled from 'styled-components';

interface SliderControlsProps {
  onPrevClick: () => void;
  onNextClick: () => void;
  isPrevDisabled: boolean;
  isNextDisabled: boolean;
}

const NavigationButton = styled.button`
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

const PrevButton = styled(NavigationButton)`
  left: 0;
`;

const NextButton = styled(NavigationButton)`
  right: 0;
`;

const SliderControls: React.FC<SliderControlsProps> = ({
  onPrevClick,
  onNextClick,
  isPrevDisabled,
  isNextDisabled,
}) => {
  return (
    <>
      <PrevButton
        onClick={onPrevClick}
        disabled={isPrevDisabled}
        aria-label="이전 슬라이드"
      >
        <ChevronLeft size={24} />
      </PrevButton>

      <NextButton
        onClick={onNextClick}
        disabled={isNextDisabled}
        aria-label="다음 슬라이드"
      >
        <ChevronRight size={24} />
      </NextButton>
    </>
  );
};

export default SliderControls;
