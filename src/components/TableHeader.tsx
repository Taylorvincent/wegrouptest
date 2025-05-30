import { ReactNode } from 'react';

interface TableHeaderProps {
  children: ReactNode;
  onClick?: () => void;
  sortActive?: boolean;
  sortDirection?: 'asc' | 'desc';
  className?: string;
}

export const TableHeader = ({
  children,
  onClick,
  sortActive,
  sortDirection,
  className = '',
}: TableHeaderProps) => {
  const baseStyles =
    'px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider';
  const cursorStyles = onClick
    ? 'cursor-pointer hover:text-gray-900 transition-colors duration-200'
    : '';

  return (
    <th scope="col" className={`${baseStyles} ${cursorStyles} ${className}`} onClick={onClick}>
      <div className="flex items-center gap-2">
        {children}
        {sortActive && <span className="text-blue-600">{sortDirection === 'asc' ? '↑' : '↓'}</span>}
      </div>
    </th>
  );
};
