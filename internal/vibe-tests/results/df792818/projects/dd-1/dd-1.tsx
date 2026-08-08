// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState, useMemo} from 'react';
import {Input} from '@/components/ui/input';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

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
      .filter(u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.role.toLowerCase().includes(q))
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

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Users</h2>
      <Input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search by name, email, or role..."
      />
      <Table>
        <TableHeader>
          <TableRow>
            {(['name', 'email', 'role', 'status'] as const).map(key => (
              <TableHead key={key} className="cursor-pointer select-none" onClick={() => handleSort(key)}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
                {sortKey === key && (sortDir === 'asc' ? ' ↑' : ' ↓')}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map(user => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
