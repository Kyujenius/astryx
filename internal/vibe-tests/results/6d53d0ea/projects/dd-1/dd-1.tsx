import {useState, useMemo} from 'react';

const users = [
  {id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active'},
  {id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'Active'},
  {id: 3, name: 'Carol White', email: 'carol@example.com', role: 'Viewer', status: 'Inactive'},
  {id: 4, name: 'Dave Brown', email: 'dave@example.com', role: 'Editor', status: 'Active'},
  {id: 5, name: 'Eve Davis', email: 'eve@example.com', role: 'Admin', status: 'Active'},
];

type SortKey = 'name' | 'email' | 'role' | 'status';

export default function UserTable() {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortKey(key); setSortDir('asc'); }
  };

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return users
      .filter((u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q))
      .sort((a, b) => {
        const cmp = a[sortKey].localeCompare(b[sortKey]);
        return sortDir === 'asc' ? cmp : -cmp;
      });
  }, [search, sortKey, sortDir]);

  return (
    <div style={{padding: 16, fontFamily: 'system-ui, sans-serif'}}>
      <h2 style={{fontSize: 24, fontWeight: 600, marginBottom: 12}}>Users</h2>
      <input
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: 6, marginBottom: 12}}
      />
      <table style={{width: '100%', borderCollapse: 'collapse'}}>
        <thead>
          <tr>
            {(['name', 'email', 'role', 'status'] as SortKey[]).map((key) => (
              <th
                key={key}
                onClick={() => toggleSort(key)}
                style={{textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid #e5e5e5', cursor: 'pointer', userSelect: 'none'}}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)} {sortKey === key ? (sortDir === 'asc' ? '↑' : '↓') : ''}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filtered.map((user) => (
            <tr key={user.id}>
              <td style={{padding: '8px 12px', borderBottom: '1px solid #eee'}}>{user.name}</td>
              <td style={{padding: '8px 12px', borderBottom: '1px solid #eee'}}>{user.email}</td>
              <td style={{padding: '8px 12px', borderBottom: '1px solid #eee'}}>{user.role}</td>
              <td style={{padding: '8px 12px', borderBottom: '1px solid #eee'}}>{user.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
