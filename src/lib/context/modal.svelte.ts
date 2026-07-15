type ModalType = 'confirm' | 'shortcuts' | 'settings' | null;

type ModalConfig = {
  type: ModalType;
  onConfirm?: () => void | Promise<void>;
  data?: {
    title?: string;
    message?: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
    fileName?: string;
    [key: string]: string;
  };
};

let modalState = $state<ModalConfig>({
  type: null,
});

export const modal = {
  get current() {
    return modalState;
  },

  open(type: Exclude<ModalType, null>, config?: Omit<ModalConfig, 'type'>) {
    modalState = {
      type,
      onConfirm: config?.onConfirm,
      data: config?.data,
    };
  },

  close() {
    modalState = {
      type: null,
    };
  },
};
