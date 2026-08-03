// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState, useMemo} from 'react';
import {Input} from '@/components/ui/input';

interface User { id: number; name: string; email: string; role: string; status: string; }

const USERS: User[] = [
  {id: 1, name: 'Alice Chen', email: 'alice@example.com', role: 'Admin', status: 'Active'},
  {id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'Active'},
  {id: 3, name: 'Carol White', email: 'carol@example.com', role: 'Viewer', status: 'Inactive'},
  {id: 4, name: 'Dan Brown', email: 'dan@example.com', role: 'Editor', status: 'Active'},
  {id: 5, name: 'Eve Davis', email: 'eve@example.com', role: 'Admin', status: 'Active'},
];

type SortKey = keyof User;

export default function UserTable() {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return USERS
      .filter(u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q))
      .sort((a, b) => {
        const av = String(a[sortKey]); const bv = String(b[sortKey]);
        return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
      });
  }, [search, sortKey, sortDir]);

  const toggleSort = (key: SortKey) => {
    if (key === sortKey) {setSortDir(d => d === 'asc' ? 'desc' : 'asc');}
    else { setSortKey(key); setSortDir('asc'); }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Users</h2>
      <Input placeholder="Search by name or email..." value={search} onChange={e => setSearch(e.target.value)} />
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              {(['name', 'email', 'role', 'status'] as SortKey[]).map(col => (
                <th key={col} onClick={() => toggleSort(col)} className="text-left p-3 cursor-pointer hover:bg-muted">
                  {col.charAt(0).toUpperCase() + col.slice(1)} {col === sortKey && (sortDir === 'asc' ? '\u2191' : '\u2193')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(user => (
              <tr key={user.id} className="border-t">
                <td className="p-3">{user.name}</td>
                <td className="p-3 text-muted-foreground">{user.email}</td>
                <td className="p-3">{user.role}</td>
                <td className="p-3"><span className={user.status === 'Active' ? 'text-green-600' : 'text-muted-foreground'}>{user.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filtered.length === 0 && <p className="text-muted-foreground text-center py-4">No users match your search.</p>}
    </div>
  );
}
