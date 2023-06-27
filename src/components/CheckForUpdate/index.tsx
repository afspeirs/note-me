import { DevicePhoneMobileIcon } from '@heroicons/react/24/outline';
import { useAtom } from 'jotai';
import { useEffect, useRef, useState } from 'react';

import { updateAvailableAtom } from '../../context/serviceWorker';
import { Button } from '../Button';

export function CheckForUpdate() {
  const [updateAvailable] = useAtom(updateAvailableAtom);
  const [loading, setLoading] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  // This abominable one-liner will clear the timer if CheckForUpdate component un-mounts
  useEffect(() => () => clearTimeout(timer.current), []);

  const updateServiceWorker = () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration) => registration.update());
    } else {
      setTimeout(() => window.location.reload(), 1500);
    }
  };

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
    <li className="m-2">
      <Button
        Icon={DevicePhoneMobileIcon}
        onClick={handleButtonClick}
        secondaryAction={updateAvailable ? (
          <span>UPDATE</span>
        ) : (
          <>
            {loading && <span>Loading</span>}
          </>
        )}
      >
        Check for update
      </Button>
    </li>
  );
}
