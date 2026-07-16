type ModalType = 'confirm' | 'shortcuts' | 'settings';

type ModalState = {
  type: ModalType | null;
  onConfirm?: () => void | Promise<void>;
  data?: Record<string, string>,
};

type ModalConfig = Omit<ModalState, 'type'>;

let modalState = $state<ModalState>({
  type: null,
});

export const modal = {
  get current() {
    return modalState;
  },

  open(type: ModalType, config?: ModalConfig) {
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
