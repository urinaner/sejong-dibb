import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PrevButton, NextButton } from './NewsSliderStyle';

interface SliderControlsProps {
  onPrevClick: () => void;
  onNextClick: () => void;
  isPrevDisabled: boolean;
  isNextDisabled: boolean;
}

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
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </PrevButton>

      <NextButton
        onClick={onNextClick}
        disabled={isNextDisabled}
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </NextButton>
    </>
  );
};

export default SliderControls;
