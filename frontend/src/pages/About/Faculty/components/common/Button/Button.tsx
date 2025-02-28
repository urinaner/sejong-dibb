import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { SEJONG_COLORS } from '../../../../../../constants/colors';

// 버튼 변형 타입
export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';

// 버튼 사이즈 타입
export type ButtonSize = 'small' | 'medium' | 'large';

// 버튼 프롭스 확장
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  isFullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

// 변형별 스타일 정의
const getVariantStyles = (variant: ButtonVariant) => {
  switch (variant) {
    case 'primary':
      return css`
        background-color: ${SEJONG_COLORS.CRIMSON_RED};
        color: white;
        border: 1px solid ${SEJONG_COLORS.CRIMSON_RED};

        &:hover:not(:disabled) {
          background-color: ${(props) =>
            props.theme.colors.primary.crimsonDark};
          border-color: ${(props) => props.theme.colors.primary.crimsonDark};
        }

        &:active:not(:disabled) {
          background-color: ${(props) =>
            props.theme.colors.primary.crimsonDark};
        }
      `;
    case 'secondary':
      return css`
        background-color: white;
        color: ${SEJONG_COLORS.CRIMSON_RED};
        border: 1px solid ${SEJONG_COLORS.CRIMSON_RED};

        &:hover:not(:disabled) {
          background-color: ${SEJONG_COLORS.CRIMSON_RED}10;
        }

        &:active:not(:disabled) {
          background-color: ${SEJONG_COLORS.CRIMSON_RED}20;
        }
      `;
    case 'danger':
      return css`
        background-color: #e53e3e;
        color: white;
        border: 1px solid #e53e3e;

        &:hover:not(:disabled) {
          background-color: #c53030;
          border-color: #c53030;
        }

        &:active:not(:disabled) {
          background-color: #9b2c2c;
        }
      `;
    case 'ghost':
      return css`
        background-color: transparent;
        color: ${(props) => props.theme.colors.grey[500]};
        border: 1px solid transparent;

        &:hover:not(:disabled) {
          background-color: ${(props) => props.theme.colors.grey[100]};
          color: ${SEJONG_COLORS.CRIMSON_RED};
        }

        &:active:not(:disabled) {
          background-color: ${(props) => props.theme.colors.grey[200]};
        }
      `;
    default:
      return '';
  }
};

// 사이즈별 스타일 정의
const getSizeStyles = (size: ButtonSize) => {
  switch (size) {
    case 'small':
      return css`
        padding: 0.5rem 0.75rem;
        font-size: 0.875rem;
      `;
    case 'medium':
      return css`
        padding: 0.625rem 1rem;
        font-size: 0.95rem;
      `;
    case 'large':
      return css`
        padding: 0.75rem 1.5rem;
        font-size: 1rem;
      `;
    default:
      return '';
  }
};

const StyledButton = styled.button<Omit<ButtonProps, 'children'>>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;
  white-space: nowrap;

  ${(props) => getVariantStyles(props.variant || 'primary')}
  ${(props) => getSizeStyles(props.size || 'medium')}
  
  width: ${(props) => (props.isFullWidth ? '100%' : 'auto')};

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${SEJONG_COLORS.CRIMSON_RED}30;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const LoadingSpinner = styled.div`
  width: 1rem;
  height: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 0.8s linear infinite;
  margin-right: 0.5rem;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  isLoading = false,
  isFullWidth = false,
  leftIcon,
  rightIcon,
  disabled,
  ...rest
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      isFullWidth={isFullWidth}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading && <LoadingSpinner />}
      {!isLoading && leftIcon}
      {children}
      {!isLoading && rightIcon}
    </StyledButton>
  );
};

export default Button;
