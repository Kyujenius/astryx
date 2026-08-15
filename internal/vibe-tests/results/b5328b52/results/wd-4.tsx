import {useState} from 'react';
import {Button} from './components/ui/button';
import {Input} from './components/ui/input';
import {Badge} from './components/ui/badge';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from './components/ui/select';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from './components/ui/table';

interface Todo {
  id: number;
  title: string;
  status: 'pending' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  assignee: string;
}

const allTodos: Todo[] = Array.from({length: 45}, (_, i) => ({
  id: i + 1,
  title: `Task ${i + 1}: ${['Fix login bug', 'Update docs', 'Add tests', 'Refactor API', 'Deploy staging'][i % 5]}`,
  status: (['pending', 'in-progress', 'done'] as const)[i % 3],
  priority: (['low', 'medium', 'high'] as const)[i % 3],
  assignee: ['Alice', 'Bob', 'Carol', 'Dave'][i % 4],
}));

export default function TodoTracker() {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const pageSize = 10;

  const filtered = allTodos.filter(t =>
    (!filter || t.title.toLowerCase().includes(filter.toLowerCase())) &&
    (statusFilter === 'all' || t.status === statusFilter)
  );

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">TodoTracker</h1>
      <div className="flex items-center gap-3">
        <Input value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Filter tasks..." className="max-w-sm" />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="done">Done</SelectItem>
          </SelectContent>
        </Select>
        <Button>New todo</Button>
      </div>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Assignee</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paged.map(todo => (
              <TableRow key={todo.id}>
                <TableCell>{todo.id}</TableCell>
                <TableCell>{todo.title}</TableCell>
                <TableCell><Badge variant={todo.status === 'done' ? 'default' : 'secondary'}>{todo.status}</Badge></TableCell>
                <TableCell><Badge variant={todo.priority === 'high' ? 'destructive' : 'outline'}>{todo.priority}</Badge></TableCell>
                <TableCell>{todo.assignee}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Page {page} of {totalPages}</span>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>Previous</Button>
          <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>Next</Button>
        </div>
      </div>
    </div>
  );
}
