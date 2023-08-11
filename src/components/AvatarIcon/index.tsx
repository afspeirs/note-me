import type { AvatarIconProps } from './types';

export function AvatarIcon({
  name,
}: AvatarIconProps) {
  return (
    <span className="flex h-8 w-8 -m-1 items-center justify-center rounded-full bg-dark dark:bg-light text-light dark:text-dark">
      <span className="font-medium leading-none capitalize">{name?.at(0) || 'u'}</span>
    </span>
  );
}
