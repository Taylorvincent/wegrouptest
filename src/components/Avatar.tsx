import { Icons } from './Icons';

interface AvatarProps {
  src?: string | null;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeClasses = {
  sm: 'h-8 w-8',
  md: 'h-12 w-12',
  lg: 'h-16 w-16',
  xl: 'h-24 w-24',
};

export const Avatar = ({ src, alt, size = 'md', className = '' }: AvatarProps) => {
  const sizeClass = sizeClasses[size];

  if (src) {
    return (
      <img src={src} alt={alt} className={`rounded-full object-cover ${sizeClass} ${className}`} />
    );
  }

  return (
    <div
      className={`rounded-full bg-gray-200 flex items-center justify-center ${sizeClass} ${className}`}
      aria-label={alt}
    >
      <Icons.User className="h-1/2 w-1/2 text-gray-500" />
    </div>
  );
};
