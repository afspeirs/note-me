import type { Toast } from 'react-hot-toast';

export type OpenToast = {
  action?: {
    text: string,
    function: () => void,
  }
  message: string,
};

export type ToastProps = {
  t: Toast,
} & OpenToast;
