import { CheckForInstallPrompt } from '@/components/CheckForInstallPrompt';
import { UpdateAvailable } from '@/components/UpdateAvailable';
import { Content } from './Content';
import { Footer } from './Footer';

export function Sidebar() {
  return (
    <>
      <Content />
      <UpdateAvailable />
      <CheckForInstallPrompt />
      <Footer />
    </>
  );
}
