import {useState, useMemo} from 'react';

interface User { id: number; name: string; email: string; role: string; joined: string; }

const users: User[] = [
  {id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', joined: '2024-01-15'},
  {id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', joined: '2024-02-20'},
  {id: 3, name: 'Carol Davis', email: 'carol@example.com', role: 'Viewer', joined: '2024-03-10'},
  {id: 4, name: 'Dan Wilson', email: 'dan@example.com', role: 'Editor', joined: '2024-04-05'},
  {id: 5, name: 'Eve Martinez', email: 'eve@example.com', role: 'Admin', joined: '2024-05-12'},
];

type SortKey = keyof User;

export default function UserTable() {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortAsc, setSortAsc] = useState(true);

  const handleSort = (key: SortKey) => {
    if (key === sortKey) setSortAsc(!sortAsc);
    else { setSortKey(key); setSortAsc(true); }
  };

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return users.filter((u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)).sort((a, b) => { const cmp = String(a[sortKey]).localeCompare(String(b[sortKey])); return sortAsc ? cmp : -cmp; });
  }, [search, sortKey, sortAsc]);

  const arrow = (key: SortKey) => (sortKey === key ? (sortAsc ? ' \u2191' : ' \u2193') : '');

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 16, padding: 24}}>
      <h2 style={{margin: 0}}>Users</h2>
      <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or email..." style={{padding: 10, border: '1px solid #ccc', borderRadius: 6, width: '100%'}} />
      <table style={{width: '100%', borderCollapse: 'collapse'}}>
        <thead>
          <tr>
            <th style={{textAlign: 'left', padding: 12, borderBottom: '2px solid #ddd', cursor: 'pointer'}} onClick={() => handleSort('name')}>Name{arrow('name')}</th>
            <th style={{textAlign: 'left', padding: 12, borderBottom: '2px solid #ddd', cursor: 'pointer'}} onClick={() => handleSort('email')}>Email{arrow('email')}</th>
            <th style={{textAlign: 'left', padding: 12, borderBottom: '2px solid #ddd', cursor: 'pointer'}} onClick={() => handleSort('role')}>Role{arrow('role')}</th>
            <th style={{textAlign: 'left', padding: 12, borderBottom: '2px solid #ddd', cursor: 'pointer'}} onClick={() => handleSort('joined')}>Joined{arrow('joined')}</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((user) => (
            <tr key={user.id}>
              <td style={{padding: 12, borderBottom: '1px solid #eee'}}>{user.name}</td>
              <td style={{padding: 12, borderBottom: '1px solid #eee'}}>{user.email}</td>
              <td style={{padding: 12, borderBottom: '1px solid #eee'}}>{user.role}</td>
              <td style={{padding: 12, borderBottom: '1px solid #eee'}}>{user.joined}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
