import type { avatarSizes } from '.';

export type AvatarIconProps = {
  label?: string,
  size?: keyof typeof avatarSizes,
};
