import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

import {
  beforeInstallPromptAtom,
  updateAvailableAtom,
} from '../../context/serviceWorker';
import type { BeforeInstallPromptEvent } from './types';

export function ServiceWorkerEvents() {
  const setBeforeInstallPrompt = useSetAtom(beforeInstallPromptAtom);
  const setUpdateAvailable = useSetAtom(updateAvailableAtom);

  const swBeforeInstallPrompt = (event: BeforeInstallPromptEvent) => {
    event.preventDefault();

    setBeforeInstallPrompt(event);
  };

  const swNewContentAvailable = () => {
    toast.info('A new version is available');
    // snackbar.showMessage({
    //   message: 'A new version is available',
    //   actionText: 'Update',
    //   actionFunction: () => window.location.reload(),
    // });
    setUpdateAvailable(true);
  };

  const swContentCached = () => toast.info('Caching complete! Now available offline');

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', swBeforeInstallPrompt);
    window.addEventListener('swNewContentAvailable', swNewContentAvailable);
    window.addEventListener('swContentCached', swContentCached);

    return () => {
      window.removeEventListener('beforeinstallprompt', swBeforeInstallPrompt);
      window.removeEventListener('swNewContentAvailable', swNewContentAvailable);
      window.removeEventListener('swContentCached', swContentCached);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
}
