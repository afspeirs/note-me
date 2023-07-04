import { CheckForInstallPrompt } from '@/components/CheckForInstallPrompt';
import { Content } from './Content';
import { Header } from './Header';
import { Footer } from './Footer';

export function Sidebar() {
  return (
    <>
      <Header />
      <Content />
      <CheckForInstallPrompt />
      <Footer />
    </>
  );
}
