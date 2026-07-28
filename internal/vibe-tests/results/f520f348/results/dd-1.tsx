// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState, useMemo} from 'react';

interface User { id: number; name: string; email: string; role: string; status: string; }

const USERS: User[] = [
  {id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active'},
  {id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'Active'},
  {id: 3, name: 'Carol White', email: 'carol@example.com', role: 'Viewer', status: 'Inactive'},
  {id: 4, name: 'Dave Brown', email: 'dave@example.com', role: 'Editor', status: 'Active'},
  {id: 5, name: 'Eve Davis', email: 'eve@example.com', role: 'Admin', status: 'Active'},
  {id: 6, name: 'Frank Miller', email: 'frank@example.com', role: 'Viewer', status: 'Inactive'},
];

export default function UsersTable() {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<keyof User>('name');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return USERS.filter(u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q))
      .sort((a, b) => { const av = String(a[sortKey]); const bv = String(b[sortKey]); return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av); });
  }, [search, sortKey, sortDir]);

  const toggleSort = (key: keyof User) => { if (sortKey === key) {setSortDir(d => d === 'asc' ? 'desc' : 'asc');} else { setSortKey(key); setSortDir('asc'); } };

  const thStyle: React.CSSProperties = {padding: '8px 12px', textAlign: 'left', borderBottom: '2px solid #e5e7eb', cursor: 'pointer', userSelect: 'none', fontWeight: 600, fontSize: 14};
  const tdStyle: React.CSSProperties = {padding: '8px 12px', borderBottom: '1px solid #f3f4f6', fontSize: 14};

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
      <h2 style={{fontSize: 24, fontWeight: 600}}>Users</h2>
      <input placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} style={{padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 14}} />
      <table style={{width: '100%', borderCollapse: 'collapse'}}>
        <thead><tr>
          {(['name','email','role','status'] as const).map(k => <th key={k} style={thStyle} onClick={() => toggleSort(k)}>{k.charAt(0).toUpperCase()+k.slice(1)} {sortKey===k?(sortDir==='asc'?'\u2191':'\u2193'):''}</th>)}
        </tr></thead>
        <tbody>{filtered.map(u => <tr key={u.id}><td style={tdStyle}>{u.name}</td><td style={tdStyle}>{u.email}</td><td style={tdStyle}>{u.role}</td><td style={tdStyle}>{u.status}</td></tr>)}</tbody>
      </table>
    </div>
  );
}
