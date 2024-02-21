import { useAtomValue } from 'jotai';
import { DatabaseIcon, RefreshCwIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/Button';
import { authAtom } from '@/context/auth';
import { replicationAtom } from '@/context/db';

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
        Icon={DatabaseIcon}
        onClick={handleButtonClick}
        secondaryAction={(
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
        Sync Database
      </Button>
    </div>
  );
}
