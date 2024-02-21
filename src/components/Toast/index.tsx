import { XIcon } from 'lucide-react';
import type { Toast as ToastType } from 'react-hot-toast';
import { toast } from 'react-hot-toast';

import { Button } from '@/components/Button';
import { classNames } from '@/utils/classNames';

export function Toast({
  visible,
  message,
  type,
  id,
}: ToastType) {
  return (
    <div
      className={classNames(
        'flex items-center p-1 rounded-xl',
        'bg-dark text-light dark:bg-light dark:text-dark max-w-none',
        visible ? 'opacity-1' : 'opacity-0',
      )}
    >
      <span className="px-4">{message as string}</span>
      {type !== 'loading' && (
        <Button
          Icon={XIcon}
          colour="inverted"
          iconOnly
          onClick={() => toast.dismiss(id)}
        >
          Close
        </Button>
      )}
    </div>
  );
}
