import type { RendererLinkProps } from './types';

export function RendererLink({
  children,
  href,
}: RendererLinkProps) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}
