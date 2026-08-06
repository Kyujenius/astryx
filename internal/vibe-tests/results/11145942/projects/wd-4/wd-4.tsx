import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from '@/components/ui/dialog';
import {useState, useMemo} from 'react';

interface Todo { id: string; title: string; status: 'open' | 'closed'; created: string; updated: string; }

export default function TodoTracker() {
  const [todos, setTodos] = useState<Todo[]>([
    {id: '1', title: 'Set up project', status: 'closed', created: '2024-01-01', updated: '2024-01-02'},
    {id: '2', title: 'Write tests', status: 'open', created: '2024-01-03', updated: '2024-01-04'},
  ]);
  const [filter, setFilter] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const filtered = useMemo(() => todos.filter(t => t.title.toLowerCase().includes(filter.toLowerCase())).sort((a, b) => b.updated.localeCompare(a.updated)), [todos, filter]);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input placeholder="Filter by title..." value={filter} onChange={e => setFilter(e.target.value)} />
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild><Button>Create Todo</Button></DialogTrigger>
          <DialogContent><DialogHeader><DialogTitle>Create Todo</DialogTitle></DialogHeader><Input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Title" /><Button onClick={() => { const now = new Date().toISOString().slice(0,10); setTodos(p => [{id: Date.now().toString(), title: newTitle, status: 'open', created: now, updated: now}, ...p]); setNewTitle(''); setDialogOpen(false); }}>Create</Button></DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader><TableRow><TableHead>Title</TableHead><TableHead>Status</TableHead><TableHead>Created</TableHead><TableHead>Updated</TableHead></TableRow></TableHeader>
        <TableBody>{filtered.map(t => <TableRow key={t.id}><TableCell>{t.title}</TableCell><TableCell><Button size="sm" variant="outline" onClick={() => setTodos(p => p.map(x => x.id === t.id ? {...x, status: x.status === 'open' ? 'closed' : 'open', updated: new Date().toISOString().slice(0,10)} : x))}>{t.status}</Button></TableCell><TableCell>{t.created}</TableCell><TableCell>{t.updated}</TableCell></TableRow>)}</TableBody>
      </Table>
    </div>
  );
}