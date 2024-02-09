import { classNames } from '@/utils/classNames';
import type { AvatarIconProps } from './types';

export const avatarSizes = {
  icon: 'size-8 -m-1',
  normal: 'size-10',
  large: 'size-40 text-8xl',
} as const;

export function AvatarIcon({
  label,
  size = 'normal',
}: AvatarIconProps) {
  return (
    <span
      aria-hidden="true"
      className={classNames(
        'flex items-center justify-center rounded-full font-medium leading-none capitalize bg-dark dark:bg-light text-light dark:text-dark select-none',
        avatarSizes[size],
      )}
    >
      {label?.at(0) || 'u'}
    </span>
  );
}
