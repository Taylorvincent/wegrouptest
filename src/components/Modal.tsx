import { ReactNode, useCallback, useEffect } from 'react';

interface ModalProps {
  children: ReactNode;
  title?: string;
  onClose?: () => void;
}

export function Modal({ children, title, onClose }: ModalProps) {
  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('modal-overlay') && onClose) {
        onClose();
      }
    },
    [onClose]
  );

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [handleClickOutside, handleEscape]);

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full modal-overlay">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        {title && (
          <div className="mt-3">
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">{title}</h3>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
