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

  // fallback user icon
  return (
    <div
      className={`rounded-full bg-gray-200 flex items-center justify-center ${sizeClass} ${className}`}
      aria-label={alt}
    >
      <svg className="h-1/2 w-1/2 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    </div>
  );
};
