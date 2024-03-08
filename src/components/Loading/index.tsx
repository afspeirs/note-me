import { RotateCwIcon } from 'lucide-react';

export function Loading() {
  return (
    <div className="absolute inset-0 text-dark dark:text-light grid place-content-center">
      <span className="sr-only">Loading...</span>
      <RotateCwIcon className="size-8 animate-spin" aria-hidden="true" />
    </div>
  );
}
