import { Suspense } from 'react';

import { Loading } from '@/components/Loading';
import type { SuspenseWrapperProps } from './types';

export function SuspenseWrapper({
  component: Component,
}: SuspenseWrapperProps) {
  return (
    <Suspense fallback={<Loading />}>
      <Component />
    </Suspense>
  );
}
