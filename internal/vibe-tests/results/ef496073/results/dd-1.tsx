import {useState, useMemo} from 'react';

interface User { id: number; name: string; email: string; role: string; status: string; }

const users: User[] = [
  {id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active'},
  {id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'Active'},
  {id: 3, name: 'Carol Williams', email: 'carol@example.com', role: 'Viewer', status: 'Inactive'},
  {id: 4, name: 'Dave Brown', email: 'dave@example.com', role: 'Editor', status: 'Active'},
  {id: 5, name: 'Eve Davis', email: 'eve@example.com', role: 'Admin', status: 'Active'},
];

export default function UserTable() {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<keyof User>('name');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const filtered = useMemo(() => {
    const f = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));
    return f.sort((a, b) => { const cmp = String(a[sortKey]).localeCompare(String(b[sortKey])); return sortDir === 'asc' ? cmp : -cmp; });
  }, [search, sortKey, sortDir]);

  const handleSort = (key: keyof User) => {
    if (sortKey === key) setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
  };

  const thStyle = {padding: '8px 12px', textAlign: 'left' as const, borderBottom: '2px solid #e5e7eb', cursor: 'pointer', fontWeight: 600, fontSize: 14};
  const tdStyle = {padding: '8px 12px', borderBottom: '1px solid #e5e7eb', fontSize: 14};

  return (
    <div style={{fontFamily: 'system-ui'}}>
      <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search users..." style={{width: '100%', padding: 8, border: '1px solid #ccc', borderRadius: 4, marginBottom: 16, boxSizing: 'border-box'}} />
      <table style={{width: '100%', borderCollapse: 'collapse'}}>
        <thead>
          <tr>
            {(['name', 'email', 'role', 'status'] as const).map((col) => (
              <th key={col} style={thStyle} onClick={() => handleSort(col)}>
                {col.charAt(0).toUpperCase() + col.slice(1)} {sortKey === col && (sortDir === 'asc' ? '↑' : '↓')}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filtered.map((u) => (
            <tr key={u.id}>
              <td style={tdStyle}>{u.name}</td>
              <td style={tdStyle}>{u.email}</td>
              <td style={tdStyle}>{u.role}</td>
              <td style={tdStyle}>{u.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
