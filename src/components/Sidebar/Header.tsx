import { Card } from '@/components/Card';
import { NotesSearch } from '@/components/NotesSearch';
import { NotesSort } from '@/components/NotesSort';

export function Header() {
  return (
    <Card as="nav" className="p-2">
      <NotesSearch>
        <NotesSort />
      </NotesSearch>
    </Card>
  );
}
