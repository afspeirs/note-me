import { CheckCircle2Icon, XCircleIcon } from 'lucide-react';

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
    <Modal
      open={open}
      onClose={onClose}
      showCloseButton={false}
    >
      <p className="mb-6 select-none">
        {message}
      </p>
      <div className="flex justify-end gap-4">
        <Button
          active
          Icon={XCircleIcon}
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          Icon={CheckCircle2Icon}
          onClick={onConfirm}
          colour="primary"
        >
          Confirm
        </Button>
      </div>
    </Modal>
  );
}
