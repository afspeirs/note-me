import type { Dispatch, SetStateAction } from 'react';

export type UserInformationModalProps = {
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>,
};
