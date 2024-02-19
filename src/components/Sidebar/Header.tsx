import { Card } from '@/components/Card';
import { NotesSearch } from '@/components/NotesSearch';
import { NotesSort } from '@/components/NotesSort';
import type { SidebarProps } from './types';

export function Header({
  name,
}: SidebarProps) {
  return (
    <Card as="nav" className="p-2">
      <NotesSearch name={name}>
        <NotesSort />
      </NotesSearch>
    </Card>
  );
}
