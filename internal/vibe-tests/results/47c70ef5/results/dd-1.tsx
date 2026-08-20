import {useState, useMemo} from 'react';

interface User { id: number; name: string; email: string; role: string; status: string; }

const USERS: User[] = [
  {id: 1, name: 'Alice Chen', email: 'alice@example.com', role: 'Admin', status: 'Active'},
  {id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'Active'},
  {id: 3, name: 'Carol Davis', email: 'carol@example.com', role: 'Viewer', status: 'Inactive'},
  {id: 4, name: 'Dan Lee', email: 'dan@example.com', role: 'Editor', status: 'Active'},
  {id: 5, name: 'Eva Martinez', email: 'eva@example.com', role: 'Admin', status: 'Active'},
  {id: 6, name: 'Frank Wilson', email: 'frank@example.com', role: 'Viewer', status: 'Inactive'},
];

type SortKey = 'name' | 'email' | 'role' | 'status';

export default function UserTable() {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
  };

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return USERS.filter(u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.role.toLowerCase().includes(q))
      .sort((a, b) => { const av = a[sortKey]; const bv = b[sortKey]; return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av); });
  }, [search, sortKey, sortDir]);

  const thStyle = {padding: '8px 12px', textAlign: 'left' as const, borderBottom: '2px solid #e0e0e0', cursor: 'pointer', userSelect: 'none' as const};
  const tdStyle = {padding: '8px 12px', borderBottom: '1px solid #f0f0f0'};

  return (
    <div>
      <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search users..." style={{padding: '8px 12px', border: '1px solid #ccc', borderRadius: 6, width: 280, marginBottom: 12}} />
      <table style={{width: '100%', borderCollapse: 'collapse'}}>
        <thead>
          <tr>
            {(['name', 'email', 'role', 'status'] as const).map(col => (
              <th key={col} style={thStyle} onClick={() => toggleSort(col)}>
                {col.charAt(0).toUpperCase() + col.slice(1)} {sortKey === col ? (sortDir === 'asc' ? '↑' : '↓') : ''}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filtered.map(u => (
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
