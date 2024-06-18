import { XIcon } from 'lucide-react';
import type { ToastOptions } from 'react-hot-toast';
import { toast } from 'react-hot-toast';

import { Button } from '@/components/Button';
import { classNames } from '@/utils/classNames';
import { OpenToast, ToastProps } from './types';

export function Toast({
  action,
  message,
  t,
}: ToastProps) {
  const handleClose = () => toast.dismiss(t.id);

  const handleActionClick = () => {
    action?.function?.();
    handleClose();
  };

  return (
    <div
      className={classNames(
        'flex items-center gap-1 p-1 rounded-xl',
        'bg-dark text-light dark:bg-light dark:text-dark max-w-none',
        t.visible ? 'opacity-1' : 'opacity-0',
      )}
    >
      {t.icon && (
        <div className="p-3 sm:p-2">
          {t.icon}
        </div>
      )}
      <span className="px-4">{message}</span>
      {(action?.text) && (
        <Button
          className="w-fit"
          colour="primary"
          fullWidth={false}
          onClick={handleActionClick}
        >
          {action.text}
        </Button>
      )}
      {t.type !== 'loading' && (
        <Button
          Icon={XIcon}
          colour="inverted"
          iconOnly
          onClick={handleClose}
        >
          Close
        </Button>
      )}
    </div>
  );
}

export function openToast(props: OpenToast, options?: ToastOptions) {
  toast.custom(
    (t) => (
      <Toast
        t={t}
        {...props} // eslint-disable-line react/jsx-props-no-spreading
      />
    ),
    options,
  );
}
