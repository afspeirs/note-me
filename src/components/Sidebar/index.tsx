import { CheckForInstallPrompt } from '@/components/CheckForInstallPrompt';
import { Content } from './Content';
import { Footer } from './Footer';

export function Sidebar() {
  return (
    <>
      <Content />
      <CheckForInstallPrompt />
      <Footer />
    </>
  );
}
