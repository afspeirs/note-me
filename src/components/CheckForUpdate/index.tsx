import { useAtomValue } from 'jotai';
import { RefreshCwIcon, RocketIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/Button';
import { atomUpdateAvailable } from '@/context/serviceWorker';

const updateServiceWorker = () => {
  if ('serviceWorker' in window.navigator) {
    window.navigator.serviceWorker.ready.then((registration) => registration.update());
  } else {
    setTimeout(() => window.location.reload(), 1500);
  }
};

export function CheckForUpdate() {
  const updateAvailable = useAtomValue(atomUpdateAvailable);
  const [loading, setLoading] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  // This abominable one-liner will clear the timer if CheckForUpdate component un-mounts
  useEffect(() => () => clearTimeout(timer.current), []);

  const handleButtonClick = () => {
    if (updateAvailable) {
      window.location.reload();
    } else if (!loading) {
      setLoading(true);
      updateServiceWorker();
      timer.current = setTimeout(() => setLoading(false), 2000);
    }
  };

  return (
    <div className="m-card-gap">
      <Button
        Icon={RocketIcon}
        onClick={handleButtonClick}
        secondaryAction={updateAvailable ? (
          <span className="text-light bg-primary px-4 py-1 -my-1 rounded-full">
            UPDATE
          </span>
        ) : (
          <div
            aria-busy={loading}
            aria-live="polite"
            className={!loading ? 'hidden' : ''}
          >
            <RefreshCwIcon className="size-6 animate-spin" aria-hidden="true" />
            <span className="sr-only">Loading</span>
          </div>
        )}
      >
        Check for update
      </Button>
    </div>
  );
}
