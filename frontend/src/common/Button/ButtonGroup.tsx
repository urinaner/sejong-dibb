import React from 'react';
import styled from 'styled-components';
import type { ButtonGroupProps } from './types';

const media = {
  mobile: '@media(max-width: 768px)',
};

const StyledButtonGroup = styled.div<{
  align: NonNullable<ButtonGroupProps['align']>;
  gap: NonNullable<ButtonGroupProps['gap']>;
}>`
  display: flex;
  justify-content: ${(props) => {
    switch (props.align) {
      case 'left':
        return 'flex-start';
      case 'right':
        return 'flex-end';
      case 'between':
        return 'space-between';
      case 'around':
        return 'space-around';
      default:
        return 'center';
    }
  }};
  gap: ${(props) => {
    switch (props.gap) {
      case 'small':
        return '0.5rem';
      case 'large':
        return '1.5rem';
      default:
        return '1rem';
    }
  }};
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #e2e8f0;

  ${media.mobile} {
    gap: 0.375rem;
  }
`;

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
  align = 'center',
  gap = 'medium',
  className = '',
}) => {
  return (
    <StyledButtonGroup align={align} gap={gap} className={className}>
      {children}
    </StyledButtonGroup>
  );
};

export default ButtonGroup;
