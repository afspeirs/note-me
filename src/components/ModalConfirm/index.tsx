import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import type { ModalConfirmProps } from './types';

export function ModalConfirm({
  message,
  onClose,
  onConfirm,
  open,
}: ModalConfirmProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <p className="mb-4">
        {message}
      </p>
      <div className="flex flex-col gap-2">
        <Button onClick={onConfirm}>
          Confirm
        </Button>
        <Button onClick={onClose}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
}
