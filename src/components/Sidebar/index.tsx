import { CheckForInstallPrompt } from '@/components/CheckForInstallPrompt';
import { Content } from './Content';
import { Header } from './Header';
import { Footer } from './Footer';
import type { SidebarProps } from './types';

export function Sidebar({
  name,
}: SidebarProps) {
  return (
    <>
      <Content />
      <Header name={name} />
      <CheckForInstallPrompt />
      <Footer />
    </>
  );
}
