import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface Todo {
  id: number;
  title: string;
  status: 'pending' | 'done';
  createdAt: string;
}

const PAGE_SIZE = 5;

export default function TodoTracker() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, title: 'Design review', status: 'pending', createdAt: '2024-01-15' },
    { id: 2, title: 'Write tests', status: 'done', createdAt: '2024-01-14' },
    { id: 3, title: 'Deploy staging', status: 'pending', createdAt: '2024-01-13' },
    { id: 4, title: 'Update docs', status: 'pending', createdAt: '2024-01-12' },
    { id: 5, title: 'Fix CI', status: 'done', createdAt: '2024-01-11' },
    { id: 6, title: 'Refactor utils', status: 'pending', createdAt: '2024-01-10' },
  ]);
  const [newTodo, setNewTodo] = useState('');
  const [page, setPage] = useState(0);

  const pageData = todos.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const totalPages = Math.ceil(todos.length / PAGE_SIZE);

  const addTodo = () => {
    if (!newTodo.trim()) return;
    setTodos((prev) => [...prev, { id: Date.now(), title: newTodo, status: 'pending', createdAt: new Date().toISOString().slice(0, 10) }]);
    setNewTodo('');
  };

  return (
    <div className="space-y-4 p-4 max-w-2xl">
      <div className="flex gap-2">
        <Input placeholder="Enter todo..." value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
        <Button onClick={addTodo}>Add</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead className="w-[100px]">Status</TableHead>
            <TableHead className="w-[120px]">Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pageData.map((todo) => (
            <TableRow key={todo.id}>
              <TableCell>{todo.title}</TableCell>
              <TableCell>
                <Badge variant={todo.status === 'done' ? 'default' : 'secondary'}>{todo.status}</Badge>
              </TableCell>
              <TableCell>{todo.createdAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-center gap-2">
        <Button variant="ghost" disabled={page === 0} onClick={() => setPage((p) => p - 1)}>Previous</Button>
        <Button variant="ghost" disabled={page >= totalPages - 1} onClick={() => setPage((p) => p + 1)}>Next</Button>
      </div>
    </div>
  );
}
