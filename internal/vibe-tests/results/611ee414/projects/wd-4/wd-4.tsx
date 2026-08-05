// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState, useMemo} from 'react';

interface Todo { id: string; title: string; status: 'Open' | 'Closed'; created: string; updated: string; pending?: boolean; }

export default function TodoTracker() {
  const [todos, setTodos] = useState<Todo[]>([
    {id: '1', title: 'Set up project', status: 'Closed', created: '2024-01-01', updated: '2024-01-02'},
    {id: '2', title: 'Write tests', status: 'Open', created: '2024-01-03', updated: '2024-01-04'},
  ]);
  const [filter, setFilter] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const filtered = useMemo(() => todos.filter((t) => t.title.toLowerCase().includes(filter.toLowerCase())).sort((a, b) => b.updated.localeCompare(a.updated)), [todos, filter]);

  const createTodo = () => {
    const now = new Date().toISOString().split('T')[0];
    setTodos([...todos, {id: Date.now().toString(), title: newTitle.trim(), status: 'Open', created: now, updated: now}]);
    setNewTitle(''); setShowCreate(false);
  };
  const toggleStatus = (id: string) => setTodos(todos.map((t) => t.id === id ? {...t, status: t.status === 'Open' ? 'Closed' : 'Open', updated: new Date().toISOString().split('T')[0]} : t));
  const deleteTodo = (id: string) => { if (confirm('Delete?')) {setTodos(todos.filter((t) => t.id !== id));} };

  return (
    <div style={{padding: 16, fontFamily: 'sans-serif'}}>
      <h2>Todo Tracker</h2>
      <div style={{display: 'flex', gap: 8, marginBottom: 16}}>
        <input value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Filter by title" style={{padding: '6px 8px', border: '1px solid #ccc', borderRadius: 4, flex: 1}} />
        <button onClick={() => setShowCreate(true)} style={{padding: '6px 12px', background: '#0066cc', color: '#fff', border: 'none', borderRadius: 4}}>Create Todo</button>
      </div>
      <table style={{width: '100%', borderCollapse: 'collapse'}}>
        <thead><tr style={{borderBottom: '2px solid #ddd'}}><th style={{textAlign: 'left', padding: 8}}>Title</th><th style={{padding: 8}}>Status</th><th style={{padding: 8}}>Created</th><th style={{padding: 8}}>Updated</th><th></th></tr></thead>
        <tbody>
          {filtered.map((t) => (
            <tr key={t.id} style={{borderBottom: '1px solid #eee'}}>
              <td style={{padding: 8}}>{t.title}</td>
              <td style={{padding: 8, textAlign: 'center'}}><span style={{padding: '2px 8px', borderRadius: 12, background: t.status === 'Open' ? '#e3f2fd' : '#e8f5e9', fontSize: 12}}>{t.status}</span></td>
              <td style={{padding: 8}}>{t.created}</td>
              <td style={{padding: 8}}>{t.updated}</td>
              <td style={{padding: 8}}><button onClick={() => toggleStatus(t.id)} style={{marginRight: 4}}>{t.status === 'Open' ? 'Close' : 'Reopen'}</button><button onClick={() => deleteTodo(t.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      {showCreate && <div style={{position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{background: '#fff', padding: 24, borderRadius: 8, minWidth: 300}}>
          <h3>Create Todo</h3>
          <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Title" style={{width: '100%', padding: 8, marginBottom: 12, border: '1px solid #ccc', borderRadius: 4}} />
          <button onClick={createTodo} style={{marginRight: 8, padding: '6px 12px', background: '#0066cc', color: '#fff', border: 'none', borderRadius: 4}}>Create</button>
          <button onClick={() => setShowCreate(false)}>Cancel</button>
        </div>
      </div>}
    </div>
  );
}