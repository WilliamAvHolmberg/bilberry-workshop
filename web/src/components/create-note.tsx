import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useCreateNote } from '@/lib/hooks/use-notes';

export function CreateNote() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const createNote = useCreateNote();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createNote.mutateAsync({ title, content });
    setTitle('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Note title"
        value={title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
        required
      />
      <Textarea
        placeholder="Note content"
        value={content}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
        required
      />
      <Button 
        type="submit" 
        disabled={createNote.isPending}
      >
        {createNote.isPending ? 'Creating...' : 'Create Note'}
      </Button>
    </form>
  );
} 