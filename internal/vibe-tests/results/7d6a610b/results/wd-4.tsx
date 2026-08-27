import {useState, useMemo} from 'react';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from '@/components/ui/dialog';
import {AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger} from '@/components/ui/alert-dialog';

interface Todo {
  id: string;
  title: string;
  status: 'Open' | 'Closed';
  createdAt: string;
  updatedAt: string;
  pending?: boolean;
}

export default function TodoTracker() {
  const [todos, setTodos] = useState<Todo[]>([
    {id: '1', title: 'Set up project', status: 'Closed', createdAt: '2024-01-01', updatedAt: '2024-01-02'},
    {id: '2', title: 'Build UI', status: 'Open', createdAt: '2024-01-03', updatedAt: '2024-01-04'},
  ]);
  const [filter, setFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(0);
  const [newTitle, setNewTitle] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const pageSize = 25;

  const filtered = useMemo(() => {
    let result = todos;
    if (filter) result = result.filter(t => t.title.toLowerCase().includes(filter.toLowerCase()));
    if (statusFilter) result = result.filter(t => t.status === statusFilter);
    return result.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  }, [todos, filter, statusFilter]);

  const paged = filtered.slice(page * pageSize, (page + 1) * pageSize);

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex gap-3 items-center">
        <h2 className="text-xl font-bold">TodoTracker</h2>
        <Dialog>
          <DialogTrigger asChild><Button>Create Todo</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Create Todo</DialogTitle></DialogHeader>
            <div className="flex flex-col gap-3">
              <Input placeholder="Title" value={newTitle} onChange={e => setNewTitle(e.target.value)} />
              <Button onClick={() => {
                setTodos(prev => [...prev, {id: Date.now().toString(), title: newTitle, status: 'Open', createdAt: new Date().toISOString().slice(0, 10), updatedAt: new Date().toISOString().slice(0, 10), pending: true}]);
                setNewTitle('');
              }}>Create</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex gap-2">
        <Input placeholder="Filter by title..." value={filter} onChange={e => setFilter(e.target.value)} />
        <Button variant="outline" onClick={() => setStatusFilter(s => s === '' ? 'Open' : s === 'Open' ? 'Closed' : '')}>
          {statusFilter || 'All'}
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Updated</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paged.map(todo => (
            <TableRow key={todo.id}>
              <TableCell>
                {editingId === todo.id ? (
                  <div className="flex gap-1">
                    <Input value={editTitle} onChange={e => setEditTitle(e.target.value)} />
                    <Button size="sm" onClick={() => { setTodos(prev => prev.map(t => t.id === todo.id ? {...t, title: editTitle, updatedAt: new Date().toISOString().slice(0, 10)} : t)); setEditingId(null); }}>Save</Button>
                    <Button size="sm" variant="outline" onClick={() => setEditingId(null)}>Cancel</Button>
                  </div>
                ) : (
                  <span className="cursor-pointer" onClick={() => { setEditingId(todo.id); setEditTitle(todo.title); }}>{todo.title}{todo.pending ? ' (pending)' : ''}</span>
                )}
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="sm" onClick={() => setTodos(prev => prev.map(t => t.id === todo.id ? {...t, status: t.status === 'Open' ? 'Closed' : 'Open', updatedAt: new Date().toISOString().slice(0, 10)} : t))}>
                  {todo.status}
                </Button>
              </TableCell>
              <TableCell>{todo.createdAt}</TableCell>
              <TableCell>{todo.updatedAt}</TableCell>
              <TableCell>
                <AlertDialog>
                  <AlertDialogTrigger asChild><Button variant="destructive" size="sm">Delete</Button></AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader><AlertDialogTitle>Delete this todo?</AlertDialogTitle><AlertDialogDescription>This cannot be undone.</AlertDialogDescription></AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => setTodos(prev => prev.filter(t => t.id !== todo.id))}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex gap-2 justify-center">
        <Button variant="outline" disabled={page === 0} onClick={() => setPage(p => p - 1)}>Prev</Button>
        <Button variant="outline" disabled={(page + 1) * pageSize >= filtered.length} onClick={() => setPage(p => p + 1)}>Next</Button>
      </div>
    </div>
  );
}
