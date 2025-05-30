import { ReactNode, useCallback, useEffect } from 'react';

interface ModalProps {
  children: ReactNode;
  title?: string;
  onClose?: () => void;
}

export const Modal = ({ children, title, onClose }: ModalProps) => {
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
    <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm overflow-y-auto h-full w-full modal-overlay">
      <div className="relative top-20 mx-auto p-8 max-w-md rounded-2xl bg-white shadow-xl ring-1 ring-gray-200">
        {title && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-900 tracking-tight">{title}</h3>
          </div>
        )}
        {children}
      </div>
    </div>
  );
};
