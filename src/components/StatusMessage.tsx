import { ReactNode } from 'react';

interface StatusMessageProps {
  children: ReactNode;
  variant?: 'default' | 'error';
}

export const StatusMessage = ({ children, variant = 'default' }: StatusMessageProps) => {
  const textColorClass = variant === 'error' ? 'text-red-600' : 'text-gray-500';

  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className={`text-center ${textColorClass}`}>{children}</div>
    </div>
  );
};
