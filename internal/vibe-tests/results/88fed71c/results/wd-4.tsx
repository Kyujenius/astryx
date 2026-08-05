// Copyright (c) Meta Platforms, Inc. and affiliates.

"use client";
import {useState, useMemo} from 'react';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from '@/components/ui/dialog';
import {Badge} from '@/components/ui/badge';

interface Todo { id: string; title: string; status: 'Open' | 'Closed'; created: string; updated: string; pending?: boolean; }

export default function TodoTracker() {
  const [todos, setTodos] = useState<Todo[]>([
    {id: '1', title: 'Set up project', status: 'Closed', created: '2024-01-01', updated: '2024-01-02'},
    {id: '2', title: 'Write tests', status: 'Open', created: '2024-01-03', updated: '2024-01-04'},
  ]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [filter, setFilter] = useState('');

  const filtered = useMemo(() => todos.filter((t) => t.title.toLowerCase().includes(filter.toLowerCase())).sort((a, b) => b.updated.localeCompare(a.updated)), [todos, filter]);

  const createTodo = () => {
    const now = new Date().toISOString().split('T')[0];
    setTodos([...todos, {id: Date.now().toString(), title: newTitle.trim(), status: 'Open', created: now, updated: now, pending: true}]);
    setNewTitle(''); setIsCreateOpen(false);
  };

  const toggleStatus = (id: string) => setTodos(todos.map((t) => t.id === id ? {...t, status: t.status === 'Open' ? 'Closed' : 'Open', updated: new Date().toISOString().split('T')[0], pending: true} : t));
  const deleteTodo = (id: string) => setTodos(todos.filter((t) => t.id !== id));

  return (
    <div className="p-4 space-y-4 max-w-4xl">
      <h2 className="text-2xl font-bold">Todo Tracker</h2>
      <div className="flex gap-2">
        <Input placeholder="Filter by title" value={filter} onChange={(e) => setFilter(e.target.value)} />
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild><Button>Create Todo</Button></DialogTrigger>
          <DialogContent><DialogHeader><DialogTitle>Create Todo</DialogTitle></DialogHeader><Input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Title" /><Button onClick={createTodo}>Create</Button></DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader><TableRow><TableHead>Title</TableHead><TableHead>Status</TableHead><TableHead>Created</TableHead><TableHead>Updated</TableHead><TableHead></TableHead></TableRow></TableHeader>
        <TableBody>
          {filtered.map((todo) => (
            <TableRow key={todo.id}>
              <TableCell>{todo.title}{todo.pending && ' (pending)'}</TableCell>
              <TableCell><Badge variant={todo.status === 'Open' ? 'default' : 'secondary'}>{todo.status}</Badge></TableCell>
              <TableCell>{todo.created}</TableCell>
              <TableCell>{todo.updated}</TableCell>
              <TableCell className="space-x-1"><Button size="sm" variant="ghost" onClick={() => toggleStatus(todo.id)}>{todo.status === 'Open' ? 'Close' : 'Reopen'}</Button><Button size="sm" variant="ghost" onClick={() => deleteTodo(todo.id)}>Delete</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}