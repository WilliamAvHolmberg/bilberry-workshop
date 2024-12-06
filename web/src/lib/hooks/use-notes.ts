import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { API_BASE_URL, Note } from '../api';

export function useNotes() {
  return useQuery<Note[]>({
    queryKey: ['notes'],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/notes`);
      if (!response.ok) {
        throw new Error('Failed to fetch notes');
      }
      return response.json();
    }
  });
}

export function useCreateNote() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (note: Omit<Note, 'id' | 'createdAt'>) => {
      const response = await fetch(`${API_BASE_URL}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(note),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create note');
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });
} 