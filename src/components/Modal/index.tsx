import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Fragment } from 'react';

import { Button } from '@/components/Button';
import type { ModalProps } from './types';

export function Modal({
  children,
  onClose,
  open,
  showCloseButton = true,
  theme,
  title,
}: ModalProps) {
  return (
    <Transition show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-primary/70 dark:bg-black/70" />
        </Transition.Child>

        <div className={`fixed inset-0 mt-titlebar-area-height overflow-y-auto ${theme}`}>
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden p-5 text-left align-middle transition-all bg-light dark:bg-dark text-dark dark:text-light rounded-xl">
                {showCloseButton && (
                  <Button
                    className="absolute top-2 right-2"
                    Icon={XMarkIcon}
                    iconOnly
                    onClick={onClose}
                  >
                    Close
                  </Button>
                )}

                {title && (
                  <Dialog.Title as="h3" className="mb-6 text-xl font-medium">
                    {title}
                  </Dialog.Title>
                )}

                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
