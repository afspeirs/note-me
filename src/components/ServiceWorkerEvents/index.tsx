import { useSetAtom } from 'jotai';
import { useEventListener } from 'usehooks-ts';

import { openToast } from '@/components/Toast';
import { atomBeforeInstallPrompt, atomUpdateAvailable } from '@/context/serviceWorker';
import type { BeforeInstallPromptEvent } from './types';

export function ServiceWorkerEvents() {
  const setBeforeInstallPrompt = useSetAtom(atomBeforeInstallPrompt);
  const setUpdateAvailable = useSetAtom(atomUpdateAvailable);

  const swBeforeInstallPrompt = (event: BeforeInstallPromptEvent) => {
    event.preventDefault();

    setBeforeInstallPrompt(event);
  };

  const swNewContentAvailable = () => {
    openToast({
      action: {
        text: 'Update',
        function: () => window.location.reload(),
      },
      message: 'A new version is available',
    });
    setUpdateAvailable(true);
  };

  const swContentCached = () => openToast({
    message: 'Caching complete! Now available offline',
  });

  useEventListener('beforeinstallprompt', swBeforeInstallPrompt);
  useEventListener('swNewContentAvailable', swNewContentAvailable);
  useEventListener('swContentCached', swContentCached);

  return null;
}
