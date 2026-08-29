import {useState, useMemo, useCallback} from 'react';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Dialog, DialogContent, DialogHeader, DialogTitle} from '@/components/ui/dialog';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {Badge} from '@/components/ui/badge';

interface Todo { id: string; title: string; status: 'Open' | 'Closed'; createdAt: string; updatedAt: string; pending?: boolean; }
const PAGE = 25;
const now = () => new Date().toISOString();
let nid = 31;
const init: Todo[] = Array.from({length: 30}, (_, i) => ({id: String(i+1), title: `Task ${i+1}`, status: i%3===0?'Closed':'Open' as any, createdAt: new Date(2024,0,i+1).toISOString(), updatedAt: new Date(2024,1,i+1).toISOString()}));

type SK = 'updatedAt'|'createdAt'|'title';

export default function TodoTracker() {
  const [todos, setTodos] = useState<Todo[]>(init);
  const [ft, setFt] = useState('');
  const [fs, setFs] = useState('all');
  const [sk, setSk] = useState<SK>('updatedAt');
  const [sd, setSd] = useState(true);
  const [pg, setPg] = useState(1);
  const [sc, setSc] = useState(false);
  const [nt, setNt] = useState('');
  const [ei, setEi] = useState<string|null>(null);
  const [et, setEt] = useState('');
  const [di, setDi] = useState<string|null>(null);

  const list = useMemo(() => {
    let r = todos;
    if (ft) r = r.filter(t => t.title.toLowerCase().includes(ft.toLowerCase()));
    if (fs !== 'all') r = r.filter(t => t.status === fs);
    r = [...r].sort((a,b) => { const c = a[sk] < b[sk] ? -1 : a[sk] > b[sk] ? 1 : 0; return sd ? -c : c; });
    return r;
  }, [todos, ft, fs, sk, sd]);

  const tp = Math.max(1, Math.ceil(list.length / PAGE));
  const pg2 = list.slice((pg-1)*PAGE, pg*PAGE);

  const toggle = (id: string) => { setTodos(p => p.map(t => t.id===id ? {...t, status: t.status==='Open'?'Closed':'Open', updatedAt: now(), pending: true} : t)); setTimeout(() => setTodos(p => p.map(t => t.id===id ? {...t, pending: false} : t)), 500); };
  const create = () => { if (!nt.trim()) return; const t: Todo = {id: String(nid++), title: nt, status: 'Open', createdAt: now(), updatedAt: now(), pending: true}; setTodos(p => [t,...p]); setNt(''); setSc(false); setTimeout(() => setTodos(p => p.map(x => x.id===t.id ? {...x, pending: false} : x)), 500); };
  const del = (id: string) => { setTodos(p => p.map(t => t.id===id ? {...t, pending: true} : t)); setTimeout(() => setTodos(p => p.filter(t => t.id !== id)), 500); setDi(null); };
  const save = () => { if (!ei || !et.trim()) return; setTodos(p => p.map(t => t.id===ei ? {...t, title: et, updatedAt: now(), pending: true} : t)); setTimeout(() => setTodos(p => p.map(t => t.id===ei ? {...t, pending: false} : t)), 500); setEi(null); };
  const sort = (k: SK) => { if (sk===k) setSd(!sd); else { setSk(k); setSd(true); } };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">TodoTracker</h2>
        <Button onClick={() => setSc(true)}>Create Todo</Button>
      </div>
      <div className="flex gap-2">
        <Input placeholder="Filter by title..." value={ft} onChange={e => setFt(e.target.value)} className="max-w-xs" />
        <Select value={fs} onValueChange={setFs}>
          <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="Open">Open</SelectItem>
            <SelectItem value="Closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="cursor-pointer" onClick={() => sort('createdAt')}>Created {sk==='createdAt'?(sd?'↓':'↑'):''}</TableHead>
            <TableHead className="cursor-pointer" onClick={() => sort('updatedAt')}>Updated {sk==='updatedAt'?(sd?'↓':'↑'):''}</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pg2.map(t => (
            <TableRow key={t.id} className={t.pending ? 'opacity-50' : ''}>
              <TableCell>{ei===t.id ? (
                <div className="flex gap-1"><Input value={et} onChange={e => setEt(e.target.value)} className="h-8" /><Button size="sm" onClick={save}>Save</Button><Button size="sm" variant="ghost" onClick={() => setEi(null)}>Cancel</Button></div>
              ) : <span className="cursor-pointer" onClick={() => {setEi(t.id);setEt(t.title)}}>{t.title}{t.pending?' (pending)':''}</span>}</TableCell>
              <TableCell><Badge variant={t.status==='Open'?'default':'secondary'} className="cursor-pointer" onClick={() => toggle(t.id)}>{t.status}</Badge></TableCell>
              <TableCell>{new Date(t.createdAt).toLocaleDateString()}</TableCell>
              <TableCell>{new Date(t.updatedAt).toLocaleDateString()}</TableCell>
              <TableCell><Button size="sm" variant="destructive" onClick={() => setDi(t.id)}>Delete</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-center gap-2">
        <Button variant="outline" size="sm" disabled={pg<=1} onClick={() => setPg(pg-1)}>Prev</Button>
        <span className="text-sm self-center">Page {pg} of {tp}</span>
        <Button variant="outline" size="sm" disabled={pg>=tp} onClick={() => setPg(pg+1)}>Next</Button>
      </div>
      <Dialog open={sc} onOpenChange={setSc}>
        <DialogContent><DialogHeader><DialogTitle>Create Todo</DialogTitle></DialogHeader>
          <div className="space-y-4"><Input placeholder="Title" value={nt} onChange={e => setNt(e.target.value)} /><div className="flex gap-2"><Button onClick={create} disabled={!nt.trim()}>Create</Button><Button variant="ghost" onClick={() => setSc(false)}>Cancel</Button></div></div>
        </DialogContent>
      </Dialog>
      <Dialog open={!!di} onOpenChange={() => setDi(null)}>
        <DialogContent><DialogHeader><DialogTitle>Delete todo?</DialogTitle></DialogHeader>
          <p>This cannot be undone.</p><div className="flex gap-2 mt-4"><Button variant="destructive" onClick={() => di && del(di)}>Delete</Button><Button variant="ghost" onClick={() => setDi(null)}>Cancel</Button></div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
