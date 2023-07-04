import type { Dispatch, ReactNode, SetStateAction } from 'react';

export type ModalProps = {
  children: ReactNode,
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>,
  title?: string,
};
