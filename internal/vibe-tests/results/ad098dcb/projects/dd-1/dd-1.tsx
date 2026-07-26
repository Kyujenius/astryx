// Copyright (c) Meta Platforms, Inc. and affiliates.

import React, {useState, useMemo} from 'react';

interface User { id: number; name: string; email: string; role: string; status: string; }

const USERS: User[] = [
  {id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'active'},
  {id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'active'},
  {id: 3, name: 'Carol White', email: 'carol@example.com', role: 'Viewer', status: 'inactive'},
  {id: 4, name: 'Dave Brown', email: 'dave@example.com', role: 'Editor', status: 'active'},
  {id: 5, name: 'Eve Davis', email: 'eve@example.com', role: 'Admin', status: 'active'},
];

export default function UsersTable() {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<keyof User>('name');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return USERS.filter(u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q))
      .sort((a, b) => sortDir === 'asc' ? String(a[sortKey]).localeCompare(String(b[sortKey])) : String(b[sortKey]).localeCompare(String(a[sortKey])));
  }, [search, sortKey, sortDir]);

  const toggleSort = (key: keyof User) => { setSortKey(key); setSortDir(d => sortKey === key ? (d === 'asc' ? 'desc' : 'asc') : 'asc'); };

  return (
    <div style={{padding: 16}}>
      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." style={{padding: '8px 12px', border: '1px solid #ddd', borderRadius: 6, marginBottom: 16, width: 300}} />
      <table style={{width: '100%', borderCollapse: 'collapse'}}>
        <thead>
          <tr style={{borderBottom: '2px solid #eee'}}>
            <th style={{textAlign: 'left', padding: 12, cursor: 'pointer'}} onClick={() => toggleSort('name')}>Name {sortKey === 'name' ? (sortDir === 'asc' ? '↑' : '↓') : ''}</th>
            <th style={{textAlign: 'left', padding: 12, cursor: 'pointer'}} onClick={() => toggleSort('email')}>Email</th>
            <th style={{textAlign: 'left', padding: 12}}>Role</th>
            <th style={{textAlign: 'left', padding: 12}}>Status</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(u => (
            <tr key={u.id} style={{borderBottom: '1px solid #eee'}}>
              <td style={{padding: 12}}>{u.name}</td>
              <td style={{padding: 12}}>{u.email}</td>
              <td style={{padding: 12}}>{u.role}</td>
              <td style={{padding: 12}}><span style={{padding: '2px 8px', borderRadius: 12, fontSize: 12, backgroundColor: u.status === 'active' ? '#dcfce7' : '#f3f4f6'}}>{u.status}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
