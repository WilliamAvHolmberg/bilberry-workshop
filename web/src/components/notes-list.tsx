import { useNotes } from '@/lib/hooks/use-notes';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export function NotesList() {
    const { data: notes, isLoading, error } = useNotes();

    if (isLoading) {
        return <div className="text-center">Loading notes...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">Failed to load notes</div>;
    }

    if (!notes?.length) {
        return <div className="text-center text-muted-foreground">No notes found</div>;
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {notes.map((note) => (
                <Card key={note.id}>
                    <CardHeader>
                        <CardTitle>{note.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{note.content}</p>
                        <p className="text-sm text-muted-foreground mt-2">
                            {new Date(note.createdAt).toLocaleDateString()}
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
} 