import { Content } from './Content';
import { Header } from './Header';

export function Sidebar() {
  return (
    <>
      <div className="bg-white dark:bg-neutral-800 dark:text-white rounded-xl shadow">
        <Header />
      </div>
      <div className="flex-1 bg-white dark:bg-neutral-800 dark:text-white rounded-xl overflow-hidden shadow">
        <Content />
      </div>
    </>
  );
}
