import {useState, useMemo} from 'react';
import {Input} from '@/components/ui/input';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {ArrowUpDown} from 'lucide-react';
import {Button} from '@/components/ui/button';

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
  const [sortAsc, setSortAsc] = useState(true);

  const sorted = useMemo(() => {
    return users
      .filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => sortAsc ? a[sortKey].localeCompare(b[sortKey]) : b[sortKey].localeCompare(a[sortKey]));
  }, [search, sortKey, sortAsc]);

  const toggleSort = (key: typeof sortKey) => {
    if (sortKey === key) setSortAsc(!sortAsc);
    else { setSortKey(key); setSortAsc(true); }
  };

  return (
    <div className="space-y-4">
      <Input placeholder="Search users..." value={search} onChange={e => setSearch(e.target.value)} />
      <Table>
        <TableHeader>
          <TableRow>
            {(['name', 'email', 'role'] as const).map(k => (
              <TableHead key={k}>
                <Button variant="ghost" size="sm" onClick={() => toggleSort(k)} className="gap-1">
                  {k.charAt(0).toUpperCase() + k.slice(1)} <ArrowUpDown className="h-3 w-3" />
                </Button>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sorted.map(u => (
            <TableRow key={u.id}>
              <TableCell>{u.name}</TableCell>
              <TableCell>{u.email}</TableCell>
              <TableCell>{u.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
