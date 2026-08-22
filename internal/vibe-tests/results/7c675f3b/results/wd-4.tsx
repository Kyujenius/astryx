import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {Button} from '@/components/ui/button';
import {Badge} from '@/components/ui/badge';
import {useState} from 'react';

interface Todo {
  id: number;
  title: string;
  status: 'pending' | 'done';
  dueDate: string;
}

const todos: Todo[] = Array.from({length: 75}, (_, i) => ({
  id: i + 1,
  title: `Task ${i + 1}`,
  status: i % 3 === 0 ? 'done' : 'pending',
  dueDate: `2026-09-${String((i % 28) + 1).padStart(2, '0')}`,
}));

export default function TodoTracker() {
  const [page, setPage] = useState(1);
  const pageSize = 25;
  const totalPages = Math.ceil(todos.length / pageSize);
  const pageData = todos.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">TodoTracker</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="w-24">Status</TableHead>
            <TableHead className="w-28">Due Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pageData.map((todo) => (
            <TableRow key={todo.id}>
              <TableCell>{todo.id}</TableCell>
              <TableCell>{todo.title}</TableCell>
              <TableCell>
                <Badge variant={todo.status === 'done' ? 'default' : 'secondary'}>{todo.status}</Badge>
              </TableCell>
              <TableCell>{todo.dueDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-between items-center">
        <span className="text-sm text-muted-foreground">
          Page {page} of {totalPages}
        </span>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</Button>
          <Button size="sm" variant="outline" disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</Button>
        </div>
      </div>
    </div>
  );
}
