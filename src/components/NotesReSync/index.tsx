import { ArrowPathIcon, CircleStackIcon } from '@heroicons/react/24/outline';
import { useAtomValue } from 'jotai';
import { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/Button';
import { replicationAtom } from '@/context/db';
import { authAtom } from '@/context/auth';

export function NotesReSync() {
  const auth = useAtomValue(authAtom);
  const replication = useAtomValue(replicationAtom);
  const [loading, setLoading] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  // This abominable one-liner will clear the timer if CheckForUpdate component un-mounts
  useEffect(() => () => clearTimeout(timer.current), []);

  const handleButtonClick = () => {
    if (!loading) {
      setLoading(true);
      replication?.reSync();
      timer.current = setTimeout(() => setLoading(false), 2000);
    }
  };

  return (
    <div className="m-2">
      <Button
        disabled={!auth?.user}
        Icon={CircleStackIcon}
        onClick={handleButtonClick}
        secondaryAction={(
          <div
            aria-busy={loading}
            aria-live="polite"
            className={!loading ? 'hidden' : ''}
          >
            <ArrowPathIcon className="h-6 w-6 animate-spin" aria-hidden="true" />
            <span className="sr-only">Loading</span>
          </div>
        )}
      >
        Sync Database
      </Button>
    </div>
  );
}
