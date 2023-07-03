import { Card } from '../Card';
import { NotesFilter } from '../NotesFilter';
import { NotesSearch } from '../NotesSearch';

export function Header() {
  return (
    <Card as="nav" className="flex gap-2 p-2">
      <NotesSearch>
        <NotesFilter />
      </NotesSearch>
    </Card>
  );
}
