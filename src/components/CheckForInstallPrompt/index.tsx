import { useAtom } from 'jotai';
import { ArrowDownSquareIcon, XIcon } from 'lucide-react';

import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { beforeInstallPromptAtom } from '@/context/serviceWorker';

export function CheckForInstallPrompt() {
  const [beforeInstallPrompt, setBeforeInstallPrompt] = useAtom(beforeInstallPromptAtom);

  const handleDismissClick = () => setBeforeInstallPrompt(null);

  const handleInstallClick = async () => {
    if (!beforeInstallPrompt) return;

    beforeInstallPrompt.prompt();

    const outcome = await beforeInstallPrompt.userChoice;
    if (outcome.outcome === 'accepted') {
      handleDismissClick();
    }
  };

  return beforeInstallPrompt && (
    <Card className="flex p-2">
      <Button
        Icon={ArrowDownSquareIcon}
        onClick={handleInstallClick}
      >
        Install NoteMe
      </Button>
      <Button
        iconOnly
        Icon={XIcon}
        onClick={handleDismissClick}
      >
        Dismiss
      </Button>
    </Card>
  );
}
