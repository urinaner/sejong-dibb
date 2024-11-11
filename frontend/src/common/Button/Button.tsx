import React from 'react';
import type { ButtonProps } from './types';

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
  const baseStyles =
    'inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 ease-in-out focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';

  const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
    default:
      'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300',
    primary: 'bg-blue-600 text-white hover:bg-blue-700 border-transparent',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 border-transparent',
    danger: 'bg-red-600 text-white hover:bg-red-700 border-transparent',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-600 border-transparent',
  };

  const sizes: Record<NonNullable<ButtonProps['size']>, string> = {
    small: 'h-8 px-3 text-sm',
    medium: 'h-10 px-4 text-base',
    large: 'h-12 px-6 text-lg',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${widthClass}
        ${className}
      `}
      {...rest}
    >
      {isLoading ? (
        <div className="flex items-center">
          <span className="w-4 h-4 mr-2 border-2 border-t-transparent border-white rounded-full animate-spin" />
          Loading...
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
