import { Modal } from './Modal';
import { Button } from './Button';
import { Alert } from './Alert';

interface DeleteConfirmationModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onClose: () => void;
  isDeleting: boolean;
  error?: Error | null;
}

export const DeleteConfirmationModal = ({
  title,
  message,
  onConfirm,
  onClose,
  isDeleting,
  error,
}: DeleteConfirmationModalProps) => {
  return (
    <Modal title={title} onClose={onClose}>
      <div className="mt-2 space-y-2">
        <p className="text-sm text-gray-500">{message}</p>
        {error && <Alert variant="error">{error.message || 'An unexpected error occurred'}</Alert>}
      </div>

      <div className="mt-5 flex justify-end gap-2">
        <Button type="button" variant="secondary" onClick={onClose} disabled={isDeleting}>
          Cancel
        </Button>
        <Button type="button" variant="danger" onClick={onConfirm} isLoading={isDeleting}>
          Delete
        </Button>
      </div>
    </Modal>
  );
};
