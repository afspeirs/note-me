import { useAtomValue } from 'jotai';
import { ArrowDownSquareIcon } from 'lucide-react';

import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { atomUpdateAvailable } from '@/context/serviceWorker';

export function UpdateAvailable() {
  const updateAvailable = useAtomValue(atomUpdateAvailable);

  const handleUpdateClick = async () => {
    if (!updateAvailable) return;
    window.location.reload();
  };

  return updateAvailable && (
    <Card className="flex p-card-gap">
      <Button
        Icon={ArrowDownSquareIcon}
        onClick={handleUpdateClick}
      >
        Update NoteMe
      </Button>
    </Card>
  );
}
