import {useState, useMemo} from 'react';

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
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const pageSize = 25;

  const filtered = useMemo(() => {
    let result = todos;
    if (filter) result = result.filter(t => t.title.toLowerCase().includes(filter.toLowerCase()));
    if (statusFilter) result = result.filter(t => t.status === statusFilter);
    return result.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  }, [todos, filter, statusFilter]);

  const paged = filtered.slice(page * pageSize, (page + 1) * pageSize);

  const cellStyle = {padding: '8px 12px', borderBottom: '1px solid #e5e7eb', textAlign: 'left' as const};

  return (
    <div style={{padding: 16, fontFamily: 'system-ui'}}>
      <div style={{display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16}}>
        <h2 style={{fontSize: 20, fontWeight: 700, margin: 0}}>TodoTracker</h2>
        <button onClick={() => setIsCreateOpen(true)} style={{padding: '6px 12px', background: '#0066cc', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer'}}>Create Todo</button>
      </div>
      <div style={{display: 'flex', gap: 8, marginBottom: 12}}>
        <input placeholder="Filter by title..." value={filter} onChange={e => setFilter(e.target.value)} style={{padding: '6px 10px', border: '1px solid #ccc', borderRadius: 4, flex: 1}} />
        <button onClick={() => setStatusFilter(s => s === '' ? 'Open' : s === 'Open' ? 'Closed' : '')} style={{padding: '6px 12px', border: '1px solid #ccc', borderRadius: 4, background: '#fff', cursor: 'pointer'}}>{statusFilter || 'All'}</button>
      </div>
      <table style={{width: '100%', borderCollapse: 'collapse'}}>
        <thead><tr style={{background: '#f9fafb'}}>
          <th style={cellStyle}>Title</th><th style={cellStyle}>Status</th><th style={cellStyle}>Created</th><th style={cellStyle}>Updated</th><th style={cellStyle}></th>
        </tr></thead>
        <tbody>
          {paged.map(todo => (
            <tr key={todo.id}>
              <td style={cellStyle}>
                {editingId === todo.id ? (
                  <span style={{display: 'flex', gap: 4}}>
                    <input value={editTitle} onChange={e => setEditTitle(e.target.value)} style={{padding: '4px 6px', border: '1px solid #ccc', borderRadius: 4}} />
                    <button onClick={() => { setTodos(prev => prev.map(t => t.id === todo.id ? {...t, title: editTitle, updatedAt: new Date().toISOString().slice(0, 10)} : t)); setEditingId(null); }} style={{padding: '4px 8px', fontSize: 12, background: '#0066cc', color: '#fff', border: 'none', borderRadius: 4}}>Save</button>
                    <button onClick={() => setEditingId(null)} style={{padding: '4px 8px', fontSize: 12, border: '1px solid #ccc', borderRadius: 4}}>Cancel</button>
                  </span>
                ) : <span style={{cursor: 'pointer'}} onClick={() => { setEditingId(todo.id); setEditTitle(todo.title); }}>{todo.title}{todo.pending ? ' (pending)' : ''}</span>}
              </td>
              <td style={cellStyle}><button onClick={() => setTodos(prev => prev.map(t => t.id === todo.id ? {...t, status: t.status === 'Open' ? 'Closed' : 'Open', updatedAt: new Date().toISOString().slice(0, 10)} : t))} style={{padding: '2px 8px', border: '1px solid #ccc', borderRadius: 4, background: '#fff', cursor: 'pointer'}}>{todo.status}</button></td>
              <td style={cellStyle}>{todo.createdAt}</td>
              <td style={cellStyle}>{todo.updatedAt}</td>
              <td style={cellStyle}><button onClick={() => setDeleteId(todo.id)} style={{padding: '2px 8px', background: '#dc2626', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 12}}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{display: 'flex', gap: 8, justifyContent: 'center', marginTop: 12}}>
        <button disabled={page === 0} onClick={() => setPage(p => p - 1)} style={{padding: '4px 12px', border: '1px solid #ccc', borderRadius: 4}}>Prev</button>
        <button disabled={(page + 1) * pageSize >= filtered.length} onClick={() => setPage(p => p + 1)} style={{padding: '4px 12px', border: '1px solid #ccc', borderRadius: 4}}>Next</button>
      </div>
      {isCreateOpen && <div style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{background: '#fff', padding: 24, borderRadius: 8, minWidth: 300}}>
          <h3 style={{margin: '0 0 12px'}}>Create Todo</h3>
          <input placeholder="Title" value={newTitle} onChange={e => setNewTitle(e.target.value)} style={{width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: 4, marginBottom: 12}} />
          <div style={{display: 'flex', gap: 8}}>
            <button onClick={() => { setTodos(prev => [...prev, {id: Date.now().toString(), title: newTitle, status: 'Open', createdAt: new Date().toISOString().slice(0, 10), updatedAt: new Date().toISOString().slice(0, 10), pending: true}]); setNewTitle(''); setIsCreateOpen(false); }} style={{padding: '6px 12px', background: '#0066cc', color: '#fff', border: 'none', borderRadius: 4}}>Create</button>
            <button onClick={() => setIsCreateOpen(false)} style={{padding: '6px 12px', border: '1px solid #ccc', borderRadius: 4}}>Cancel</button>
          </div>
        </div>
      </div>}
      {deleteId && <div style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{background: '#fff', padding: 24, borderRadius: 8}}>
          <p>Are you sure you want to delete this todo?</p>
          <div style={{display: 'flex', gap: 8, marginTop: 12}}>
            <button onClick={() => { setTodos(prev => prev.filter(t => t.id !== deleteId)); setDeleteId(null); }} style={{padding: '6px 12px', background: '#dc2626', color: '#fff', border: 'none', borderRadius: 4}}>Delete</button>
            <button onClick={() => setDeleteId(null)} style={{padding: '6px 12px', border: '1px solid #ccc', borderRadius: 4}}>Cancel</button>
          </div>
        </div>
      </div>}
    </div>
  );
}
