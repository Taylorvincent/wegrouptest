import { ButtonHTMLAttributes, ReactNode } from 'react';
import { Spinner } from './Spinner';

type ButtonVariant = 'primary' | 'secondary' | 'danger';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  isLoading?: boolean;
}
const baseStyles =
  'px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

const variantStyles = {
  primary: 'text-white bg-blue-600 border border-transparent hover:bg-blue-700',
  secondary: 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50',
  danger: 'text-white bg-red-600 border border-transparent hover:bg-red-700',
};

export const Button = ({
  children,
  variant = 'primary',
  isLoading = false,
  disabled,
  className = '',
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? <Spinner label="Loading..." /> : children}
    </button>
  );
};
