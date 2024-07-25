import { XIcon } from 'lucide-react';

import { Button } from '@/components/Button';
import { Tooltip } from '@/components/Tooltip';
import type { CardHeaderProps } from './types';

export function CardHeader({
  children,
  onBack,
  title,
}: CardHeaderProps) {
  return (
    <div className="relative flex gap-2 p-2 h-16 sm:h-14">
      <div className="ml-2 self-center font-bold text-xl truncate select-none">{title}</div>

      <div className="ml-auto" />

      {children}

      {onBack && (
        <Tooltip content={`Close "${title}"`} side="bottom">
          <Button
            Icon={XIcon}
            iconOnly
            onClick={onBack}
          >
            {`Close "${title}"`}
          </Button>
        </Tooltip>
      )}
    </div>
  );
}
