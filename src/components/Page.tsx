import { ReactNode } from 'react';

interface PageProps {
  children: ReactNode,
}

export function Page({
  children,
}: PageProps) {
  return (
    <main className="flex-1 px-4">
      {children}
    </main>
  );
}
