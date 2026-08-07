import {useState, useMemo} from 'react';
import {Table} from '@astryxdesign/core/Table';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Stack} from '@astryxdesign/core/Stack';

interface User extends Record<string, unknown> {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

const users: User[] = [
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
    return users
      .filter(u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q))
      .sort((a, b) => {
        const aVal = String(a[sortKey]);
        const bVal = String(b[sortKey]);
        return sortDir === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      });
  }, [search, sortKey, sortDir]);

  const columns = [
    {key: 'name' as const, header: 'Name'},
    {key: 'email' as const, header: 'Email'},
    {key: 'role' as const, header: 'Role'},
    {key: 'status' as const, header: 'Status'},
  ];

  return (
    <Stack direction="vertical" gap={3}>
      <TextInput
        label="Search users"
        value={search}
        onChange={setSearch}
        placeholder="Filter by name or email..."
      />
      <Table
        data={filtered}
        columns={columns}
        idKey="id"
        hasHover
        dividers="rows"
      />
    </Stack>
  );
}
