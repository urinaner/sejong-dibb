import React from 'react';
import styled, { css } from 'styled-components';
import type { ButtonProps } from './types';

const media = {
  mobile: '@media(max-width: 768px)',
  tablet: '@media(max-width: 1024px)',
};

// 기본 버튼 스타일
const StyledButton = styled.button<{
  variant: NonNullable<ButtonProps['variant']>;
  size: NonNullable<ButtonProps['size']>;
  fullWidth: boolean;
}>`
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  border: 1px solid #ddd;
  background-color: white;
  color: #333;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  min-width: 80px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;

  &:hover {
    background-color: #f8f9fa;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }

  ${media.mobile} {
    padding: 0.375rem 0.75rem;
    min-width: 70px;
    height: 32px;
  }

  ${(props) =>
    props.fullWidth &&
    css`
      width: 100%;
    `}

  /* Variant Styles */
  ${(props) => {
    switch (props.variant) {
      case 'primary':
        return css`
          background-color: #1a73e8;
          color: white;
          border-color: #1557b0;

          &:hover:not(:disabled) {
            background-color: #1557b0;
          }
        `;
      case 'secondary':
        return css`
          background-color: #f8f9fa;
          border-color: #ddd;
          color: #333;

          &:hover:not(:disabled) {
            background-color: #e9ecef;
            border-color: #ccc;
          }
        `;
      case 'danger':
        return css`
          background-color: white;
          border-color: #ddd;
          color: #dc3545;

          &:hover:not(:disabled) {
            background-color: #fff5f5;
            border-color: #dc3545;
          }

          &:disabled {
            background-color: #ffe3e3;
            border-color: #ffc9c9;
            color: #fa5252;
          }
        `;
      case 'ghost':
        return css`
          background-color: transparent;
          border-color: transparent;
          color: #4a5568;

          &:hover:not(:disabled) {
            background-color: #f8f9fa;
          }
        `;
      default:
        return css`
          background-color: white;
          border-color: #ddd;
          color: #333;

          &:hover:not(:disabled) {
            background-color: #f8f9fa;
          }
        `;
    }
  }}

    /* Size Variants */
  ${(props) => {
    switch (props.size) {
      case 'small':
        return css`
          height: 32px;
          padding: 0.375rem 0.75rem;
          font-size: 0.875rem;
          min-width: 70px;
        `;
      case 'large':
        return css`
          height: 44px;
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
          min-width: 100px;
        `;
      default:
        return css`
          height: 36px;
          padding: 0.5rem 1rem;
          font-size: 0.9rem;
          min-width: 80px;
        `;
    }
  }}
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-right: 8px;
  border: 2px solid;
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 0.6s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const Button: React.FC<ButtonProps> = ({
  variant = 'default',
  size = 'medium',
  disabled = false,
  fullWidth = false,
  isLoading = false,
  className = '',
  children,
  onClick,
  type = 'button',
  ...rest
}) => {
  return (
    <StyledButton
      type={type}
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={className}
      {...rest}
    >
      {isLoading ? (
        <>
          <LoadingSpinner />
          Loading...
        </>
      ) : (
        children
      )}
    </StyledButton>
  );
};

export default Button;
