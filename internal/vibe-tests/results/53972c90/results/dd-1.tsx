import * as React from 'react';
import {Input} from '../components/ui/input';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '../components/ui/table';
import {ArrowUpDown} from 'lucide-react';
import {Button} from '../components/ui/button';

const users = [
  {id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active'},
  {id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'Active'},
  {id: 3, name: 'Carol White', email: 'carol@example.com', role: 'Viewer', status: 'Inactive'},
  {id: 4, name: 'Dave Brown', email: 'dave@example.com', role: 'Editor', status: 'Active'},
  {id: 5, name: 'Eve Davis', email: 'eve@example.com', role: 'Admin', status: 'Active'},
];

type SortKey = 'name' | 'email' | 'role' | 'status';

export default function UserTable() {
  const [search, setSearch] = React.useState('');
  const [sortKey, setSortKey] = React.useState<SortKey>('name');
  const [sortDir, setSortDir] = React.useState<'asc' | 'desc'>('asc');

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortKey(key); setSortDir('asc'); }
  };

  const filtered = React.useMemo(() => {
    const q = search.toLowerCase();
    return users
      .filter((u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q))
      .sort((a, b) => {
        const cmp = a[sortKey].localeCompare(b[sortKey]);
        return sortDir === 'asc' ? cmp : -cmp;
      });
  }, [search, sortKey, sortDir]);

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-2xl font-semibold">Users</h2>
      <Input placeholder="Search users..." value={search} onChange={(e) => setSearch(e.target.value)} />
      <Table>
        <TableHeader>
          <TableRow>
            {(['name', 'email', 'role', 'status'] as SortKey[]).map((key) => (
              <TableHead key={key}>
                <Button variant="ghost" size="sm" onClick={() => toggleSort(key)}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                  <ArrowUpDown className="ml-1 h-3 w-3" />
                </Button>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map((user) => (
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
