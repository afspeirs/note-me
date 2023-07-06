import {
  CheckCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';

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
      <p className="mb-4 select-none">
        {message}
      </p>
      <div className="flex justify-end gap-4">
        <Button
          className="ring-2 ring-black dark:ring-white"
          Icon={XCircleIcon}
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          className="ring-2 ring-black dark:ring-white"
          Icon={CheckCircleIcon}
          onClick={onConfirm}
        >
          Confirm
        </Button>
      </div>
    </Modal>
  );
}
