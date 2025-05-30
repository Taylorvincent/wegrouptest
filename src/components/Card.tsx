import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className = '' }: CardProps) => {
  return (
    <div className={`bg-white rounded-2xl shadow-xl ring-1 ring-gray-200 ${className}`}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '' }: CardProps) => {
  return (
    <div className={`px-6 py-5 sm:px-8 border-b border-gray-100 ${className}`}>{children}</div>
  );
};

export const CardBody = ({ children, className = '' }: CardProps) => {
  return <div className={className}>{children}</div>;
};
