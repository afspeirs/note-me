import { CheckForInstallPrompt } from '@/components/CheckForInstallPrompt';
import { Content } from './Content';
import { ContentNested } from './ContentNested';
import { Footer } from './Footer';

export function Sidebar() {
  return (
    <>
      <Content />
      <CheckForInstallPrompt />
      <Footer />

      <ContentNested />
    </>
  );
}
