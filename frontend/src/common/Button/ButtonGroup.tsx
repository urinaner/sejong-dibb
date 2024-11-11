import React from 'react';
import type { ButtonGroupProps } from './types';

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
  align = 'center',
  gap = 'medium',
  className = '',
}) => {
  const alignments: Record<NonNullable<ButtonGroupProps['align']>, string> = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
  };

  const gaps: Record<NonNullable<ButtonGroupProps['gap']>, string> = {
    small: 'gap-2',
    medium: 'gap-4',
    large: 'gap-6',
  };

  return (
    <div
      className={`
        flex flex-wrap items-center
        ${alignments[align]}
        ${gaps[gap]}
        mt-12
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default ButtonGroup;
