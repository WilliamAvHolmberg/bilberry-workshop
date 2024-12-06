# AI Implementation Guide

This guide outlines the key technologies and patterns to follow when implementing features in this repository.

## Core Technologies

### TanStack Query
- Use TanStack Query for all data fetching and state management
- Implement custom hooks for data fetching using `useQuery` and `useMutation`
- Follow the pattern:
```typescript
export function useData() {
  return useQuery({
    queryKey: ['data'],
    queryFn: async () => {
      const response = await fetch('/api/data');
      return response.json();
    }
  });
}
```

### Tailwind CSS
- Use Tailwind CSS for all styling
- Follow the project's design system using custom colors and variables
- Utilize the `cn()` utility for conditional class names:
```typescript
import { cn } from "@/lib/utils";

export function Component({ className, ...props }) {
  return (
    <div className={cn("base-classes", className)} {...props}>
      {/* content */}
    </div>
  );
}
```

### shadcn/ui Components
- All shadcn/ui components are pre-installed and ready to use, if not, install by npx shadcn@latest add [component]
- Import components from `@/components/ui`
- Follow the component patterns:
```typescript
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Form() {
  return (
    <div>
      <Input placeholder="Enter text" />
      <Button>Submit</Button>
    </div>
  );
}
```

## Best Practices

1. **Component Structure**
   - Keep components small and focused
   - Use TypeScript interfaces for props
   - Implement proper error boundaries
   - Use React.Suspense for loading states

2. **Data Fetching**
   - Always use TanStack Query hooks
   - Implement proper error handling
   - Use suspense mode when appropriate
   - Cache invalidation strategies

3. **Styling**
   - Use Tailwind CSS classes
   - Follow the design system
   - Maintain consistent spacing
   - Use responsive design patterns

4. **State Management**
   - Use TanStack Query for server state
   - React state for UI state
   - Context for theme/auth

5. **Performance**
   - Implement proper memoization
   - Use dynamic imports for code splitting
   - Optimize images and assets
   - Monitor bundle size

## File Structure
```
src/
├── components/
│   ├── ui/          # shadcn/ui components
│   └── features/    # feature-specific components
├── hooks/           # custom hooks
├── lib/            # utilities and helpers
└── pages/          # route components
```

## Example Implementation

```typescript
// src/features/users/use-users.ts
export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await fetch('/api/users');
      return response.json();
    }
  });
}

// src/features/users/users-list.tsx
import { useUsers } from './use-users';
import { Card } from '@/components/ui/card';

export function UsersList() {
  const { data, isLoading } = useUsers();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="grid gap-4">
      {data.map((user) => (
        <Card key={user.id}>
          <CardHeader>
            <CardTitle>{user.name}</CardTitle>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
```