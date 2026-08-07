import {useState, useMemo} from 'react';

const users = [
  {id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin'},
  {id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor'},
  {id: 3, name: 'Carol White', email: 'carol@example.com', role: 'Viewer'},
  {id: 4, name: 'Dave Brown', email: 'dave@example.com', role: 'Editor'},
  {id: 5, name: 'Eve Davis', email: 'eve@example.com', role: 'Admin'},
];

export default function UserTable() {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<'name' | 'email' | 'role'>('name');
  const [asc, setAsc] = useState(true);

  const sorted = useMemo(() => users
    .filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => asc ? a[sortKey].localeCompare(b[sortKey]) : b[sortKey].localeCompare(a[sortKey])), [search, sortKey, asc]);

  const toggle = (k: typeof sortKey) => { if (sortKey === k) setAsc(!asc); else { setSortKey(k); setAsc(true); } };

  return (
    <div style={{maxWidth: 700}}>
      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." style={{width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: 6, marginBottom: 12, fontSize: 14}} />
      <table style={{width: '100%', borderCollapse: 'collapse'}}>
        <thead>
          <tr>
            {(['name', 'email', 'role'] as const).map(k => (
              <th key={k} onClick={() => toggle(k)} style={{textAlign: 'left', padding: '10px 12px', borderBottom: '2px solid #e5e7eb', cursor: 'pointer', fontSize: 14, fontWeight: 600}}>
                {k.charAt(0).toUpperCase() + k.slice(1)} {sortKey === k && (asc ? '↑' : '↓')}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map(u => (
            <tr key={u.id} style={{borderBottom: '1px solid #f3f4f6'}}>
              <td style={{padding: '10px 12px', fontSize: 14}}>{u.name}</td>
              <td style={{padding: '10px 12px', fontSize: 14}}>{u.email}</td>
              <td style={{padding: '10px 12px', fontSize: 14}}>{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
