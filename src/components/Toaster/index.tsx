import { Toaster as Toaster2 } from 'react-hot-toast';

import { Toast } from './Toast';

export function Toaster() {
  return (
    <Toaster2
      position="bottom-right"
      containerClassName="select-none"
    >
      {Toast}
    </Toaster2>
  );
}
