import type { LazyExoticComponent } from 'react';

export type SuspenseWrapperProps = {
  component: LazyExoticComponent<() => JSX.Element | null>,
};
