import { ArrowLeftIcon } from 'lucide-react';

import { Button } from '@/components/Button';
import { Tooltip } from '@/components/Tooltip';
import type { ContentHeaderProps } from './types';

export function ContentHeader({
  children,
  onBack,
  title,
}: ContentHeaderProps) {
  return (
    <div className="relative flex gap-2 p-2 h-16 sm:h-14">
      {onBack && (
        <Tooltip content="Close Folder" side="bottom">
          <Button
            Icon={ArrowLeftIcon}
            iconOnly
            onClick={onBack}
          >
            Close Folder
          </Button>
        </Tooltip>
      )}

      <div className="self-center font-bold text-xl truncate select-none">{title}</div>

      <div className="ml-auto" />

      {children}
    </div>
  );
}
