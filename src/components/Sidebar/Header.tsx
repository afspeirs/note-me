import { Card } from '../Card';
import { NotesSearch } from '../NotesSearch';
import { NotesSort } from '../NotesSort';

export function Header() {
  return (
    <Card as="nav" className="flex gap-2 p-2">
      <NotesSearch>
        <NotesSort />
      </NotesSearch>
    </Card>
  );
}
