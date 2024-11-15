export type ButtonVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'ghost';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
  children: React.ReactNode;
}

export type ButtonGroupAlignment =
  | 'left'
  | 'center'
  | 'right'
  | 'between'
  | 'around';
export type ButtonGroupGap = 'small' | 'medium' | 'large';

export interface ButtonGroupProps {
  children: React.ReactNode;
  align?: ButtonGroupAlignment;
  gap?: ButtonGroupGap;
  className?: string;
}
