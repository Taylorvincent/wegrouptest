import { Modal } from './Modal';
import { Button } from './Button';

interface DeleteConfirmationModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onClose: () => void;
  isDeleting: boolean;
}

export const DeleteConfirmationModal = ({
  title,
  message,
  onConfirm,
  onClose,
  isDeleting,
}: DeleteConfirmationModalProps) => {
  return (
    <Modal title={title} onClose={onClose}>
      <div className="mt-2">
        <p className="text-sm text-gray-500">{message}</p>
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
