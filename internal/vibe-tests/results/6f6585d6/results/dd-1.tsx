import {useState, useMemo} from 'react';

interface User { id: number; name: string; email: string; role: string; status: string; }
const USERS: User[] = [
  {id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'active'},
  {id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'active'},
  {id: 3, name: 'Carol White', email: 'carol@example.com', role: 'Viewer', status: 'inactive'},
  {id: 4, name: 'David Brown', email: 'david@example.com', role: 'Editor', status: 'active'},
  {id: 5, name: 'Eve Davis', email: 'eve@example.com', role: 'Admin', status: 'inactive'},
];

export default function UserTable() {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<keyof User>('name');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const filtered = useMemo(() => {
    return USERS.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => { const av = String(a[sortKey]), bv = String(b[sortKey]); return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av); });
  }, [search, sortKey, sortDir]);

  const toggleSort = (key: keyof User) => { if (key === sortKey) setSortDir(d => d === 'asc' ? 'desc' : 'asc'); else { setSortKey(key); setSortDir('asc'); } };

  return (
    <div style={{fontFamily: 'system-ui'}}>
      <h2 style={{fontSize: 24, fontWeight: 700}}>Users</h2>
      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." style={{padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: 6, width: '100%', marginBottom: 16}} />
      <table style={{width: '100%', borderCollapse: 'collapse'}}>
        <thead><tr style={{borderBottom: '2px solid #e5e7eb'}}>
          {(['name', 'email', 'role', 'status'] as const).map(k => (
            <th key={k} onClick={() => toggleSort(k)} style={{padding: 8, textAlign: 'left', cursor: 'pointer'}}>{k.charAt(0).toUpperCase() + k.slice(1)} {sortKey === k ? (sortDir === 'asc' ? '▲' : '▼') : ''}</th>
          ))}
        </tr></thead>
        <tbody>{filtered.map(u => (
          <tr key={u.id} style={{borderBottom: '1px solid #f3f4f6'}}>
            <td style={{padding: 8}}>{u.name}</td><td style={{padding: 8}}>{u.email}</td><td style={{padding: 8}}>{u.role}</td>
            <td style={{padding: 8}}><span style={{padding: '2px 8px', borderRadius: 12, fontSize: 12, background: u.status === 'active' ? '#dcfce7' : '#f3f4f6'}}>{u.status}</span></td>
          </tr>
        ))}</tbody>
      </table>
    </div>
  );
}
