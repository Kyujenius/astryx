// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState, useMemo} from 'react';

interface User {id: number; name: string; email: string; role: string; status: string}

const USERS: User[] = [
  {id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active'},
  {id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'Active'},
  {id: 3, name: 'Carol White', email: 'carol@example.com', role: 'Viewer', status: 'Inactive'},
  {id: 4, name: 'Dave Brown', email: 'dave@example.com', role: 'Editor', status: 'Active'},
  {id: 5, name: 'Eve Davis', email: 'eve@example.com', role: 'Admin', status: 'Active'},
];

export default function UserTable() {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<keyof User>('name');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return USERS
      .filter(u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q))
      .sort((a, b) => {
        const av = String(a[sortKey]);
        const bv = String(b[sortKey]);
        return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
      });
  }, [search, sortKey, sortDir]);

  const handleSort = (key: keyof User) => {
    if (sortKey === key) {setSortDir(d => d === 'asc' ? 'desc' : 'asc');}
    else { setSortKey(key); setSortDir('asc'); }
  };

  const thStyle = {padding: '8px 12px', textAlign: 'left' as const, borderBottom: '2px solid #ddd', cursor: 'pointer', userSelect: 'none' as const};
  const tdStyle = {padding: '8px 12px', borderBottom: '1px solid #eee'};

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
      <h2 style={{margin: 0}}>Users</h2>
      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search..."
        style={{padding: '8px', borderRadius: '4px', border: '1px solid #ccc', maxWidth: '300px'}}
      />
      <table style={{width: '100%', borderCollapse: 'collapse'}}>
        <thead>
          <tr>
            {(['name', 'email', 'role', 'status'] as const).map(key => (
              <th key={key} style={thStyle} onClick={() => handleSort(key)}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
                {sortKey === key && (sortDir === 'asc' ? ' ↑' : ' ↓')}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filtered.map(user => (
            <tr key={user.id}>
              <td style={tdStyle}>{user.name}</td>
              <td style={tdStyle}>{user.email}</td>
              <td style={tdStyle}>{user.role}</td>
              <td style={tdStyle}>{user.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
