import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Badge} from '@/components/ui/badge';
import {useState} from 'react';

type Todo = {id: string; title: string; status: 'pending' | 'in-progress' | 'done'; assignee: string; createdAt: string};

const statusVariants = {'pending': 'secondary', 'in-progress': 'default', 'done': 'outline'} as const;

const initialTodos: Todo[] = [
  {id: '1', title: 'Set up CI pipeline', status: 'done', assignee: 'Alice', createdAt: '2024-01-15'},
  {id: '2', title: 'Write unit tests', status: 'in-progress', assignee: 'Bob', createdAt: '2024-01-16'},
  {id: '3', title: 'Deploy to staging', status: 'pending', assignee: 'Charlie', createdAt: '2024-01-17'},
  {id: '4', title: 'Code review', status: 'pending', assignee: 'Alice', createdAt: '2024-01-18'},
  {id: '5', title: 'Update docs', status: 'in-progress', assignee: 'Bob', createdAt: '2024-01-19'},
];

export default function TodoTracker() {
  const [todos, setTodos] = useState(initialTodos);
  const [newTitle, setNewTitle] = useState('');

  const addTodo = () => {
    if (!newTitle.trim()) return;
    setTodos(prev => [...prev, {id: String(Date.now()), title: newTitle, status: 'pending', assignee: 'Unassigned', createdAt: new Date().toISOString().split('T')[0]}]);
    setNewTitle('');
  };

  return (
    <div className="space-y-4 p-6">
      <div className="flex gap-3">
        <Input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="New todo title" />
        <Button onClick={addTodo}>Add</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Assignee</TableHead>
            <TableHead>Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {todos.map(todo => (
            <TableRow key={todo.id}>
              <TableCell>{todo.title}</TableCell>
              <TableCell><Badge variant={statusVariants[todo.status]}>{todo.status}</Badge></TableCell>
              <TableCell>{todo.assignee}</TableCell>
              <TableCell>{todo.createdAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
