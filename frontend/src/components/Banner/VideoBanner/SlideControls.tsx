import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Controls, ControlButton } from './VideoBannerStyle';

interface SlideControlsProps {
  onPrev: () => void;
  onNext: () => void;
}

const SlideControls: React.FC<SlideControlsProps> = ({ onPrev, onNext }) => {
  return (
    <Controls>
      <ControlButton onClick={onPrev} aria-label="Previous slide">
        <ChevronLeft size={24} />
      </ControlButton>
      <ControlButton onClick={onNext} aria-label="Next slide">
        <ChevronRight size={24} />
      </ControlButton>
    </Controls>
  );
};

export default SlideControls;
