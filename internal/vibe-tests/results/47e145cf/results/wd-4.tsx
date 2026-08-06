import {useState, useMemo} from 'react';

interface Todo { id: string; title: string; status: 'open' | 'closed'; created: string; updated: string; }

export default function TodoTracker() {
  const [todos, setTodos] = useState<Todo[]>([
    {id: '1', title: 'Set up project', status: 'closed', created: '2024-01-01', updated: '2024-01-02'},
    {id: '2', title: 'Write tests', status: 'open', created: '2024-01-03', updated: '2024-01-04'},
  ]);
  const [filter, setFilter] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const filtered = useMemo(() => todos.filter(t => t.title.toLowerCase().includes(filter.toLowerCase())).sort((a, b) => b.updated.localeCompare(a.updated)), [todos, filter]);

  return (
    <div style={{fontFamily: 'system-ui'}}>
      <div style={{display: 'flex', gap: 8, marginBottom: 12}}>
        <input style={{flex: 1, padding: 8, border: '1px solid #ccc', borderRadius: 4}} placeholder="Filter..." value={filter} onChange={e => setFilter(e.target.value)} />
        <button style={{padding: '8px 16px', backgroundColor: '#0066cc', color: '#fff', border: 'none', borderRadius: 4}} onClick={() => setShowCreate(true)}>Create Todo</button>
      </div>
      <table style={{width: '100%', borderCollapse: 'collapse'}}>
        <thead><tr style={{borderBottom: '2px solid #eee'}}><th style={{textAlign: 'left', padding: 8}}>Title</th><th style={{padding: 8}}>Status</th><th style={{padding: 8}}>Created</th><th style={{padding: 8}}>Updated</th></tr></thead>
        <tbody>{filtered.map(t => <tr key={t.id} style={{borderBottom: '1px solid #eee'}}><td style={{padding: 8}}>{t.title}</td><td style={{padding: 8}}><button onClick={() => setTodos(p => p.map(x => x.id === t.id ? {...x, status: x.status === 'open' ? 'closed' : 'open'} : x))}>{t.status}</button></td><td style={{padding: 8}}>{t.created}</td><td style={{padding: 8}}>{t.updated}</td></tr>)}</tbody>
      </table>
      {showCreate && <div style={{position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><div style={{backgroundColor: '#fff', padding: 24, borderRadius: 8, width: 300}}><h3>Create Todo</h3><input style={{width: '100%', padding: 8, border: '1px solid #ccc', borderRadius: 4, marginBottom: 12}} value={newTitle} onChange={e => setNewTitle(e.target.value)} /><button style={{padding: '8px 16px', backgroundColor: '#0066cc', color: '#fff', border: 'none', borderRadius: 4}} onClick={() => { const now = new Date().toISOString().slice(0,10); setTodos(p => [{id: Date.now().toString(), title: newTitle, status: 'open', created: now, updated: now}, ...p]); setNewTitle(''); setShowCreate(false); }}>Create</button></div></div>}
    </div>
  );
}