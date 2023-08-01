import { Card } from '@/components/Card';
import { NotesList } from '@/components/NotesList';

export function Content() {
  return (
    <Card as="nav" className="flex-1 h-full overflow-hidden" aria-label="Sidebar">
      <NotesList />
    </Card>
  );
}
