import { NotesList } from '@/components/notes-list';
import { CreateNote } from '@/components/create-note';

export function HomePage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">My Notes</h1>
      <div className="mb-8">
        <CreateNote />
      </div>
      <NotesList />
    </div>
  );
}