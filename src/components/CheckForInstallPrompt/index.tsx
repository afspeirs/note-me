import { ArrowDownOnSquareIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useAtom } from 'jotai';

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
    <Card as="li" className="flex [&>button:last-child]:w-fit p-2">
      <Button
        Icon={ArrowDownOnSquareIcon}
        onClick={handleInstallClick}
      >
        Install NoteMe
      </Button>
      <Button
        iconOnly
        Icon={XMarkIcon}
        onClick={handleDismissClick}
      >
        Dismiss
      </Button>
    </Card>
  );
}
