import type { LucideProps } from 'lucide-react';
import { forwardRef } from 'react';

export const AIcon = forwardRef<SVGSVGElement, LucideProps>(
  (
    {
      color = 'currentColor',
      size = 24,
      className = '',
      children,
      ...props
    },
    ref,
  ) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      className={className}
      aria-hidden="true"
      {...props} // eslint-disable-line react/jsx-props-no-spreading
    >
      <path d="M18 24v-6H6v6H3c-.81 0-1.54-.29-2.13-.87C.29 22.54 0 21.83 0 21V6c0-1.66.59-3.07 1.76-4.24C2.92.59 4.33 0 6 0h12c1.66 0 3.07.59 4.24 1.78C23.41 2.94 24 4.34 24 6v15c0 .83-.3 1.54-.89 2.13-.59.58-1.3.87-2.11.87m-3-12V9c0-.81-.3-1.52-.89-2.11C16.52 6.3 15.81 6 15 6H9c-.83 0-1.54.3-2.13.89C6.29 7.48 6 8.19 6 9v3h12Z" />
    </svg>
  ),
);
