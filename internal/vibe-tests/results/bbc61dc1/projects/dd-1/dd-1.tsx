import {useState, useMemo} from 'react';
import {Table} from '@astryxdesign/core/Table';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Stack} from '@astryxdesign/core/Stack';

interface User extends Record<string, unknown> {
  id: number; name: string; email: string; role: string;
}

const users: User[] = [
  {id: 1, name: 'Alice', email: 'alice@co.com', role: 'Admin'},
  {id: 2, name: 'Bob', email: 'bob@co.com', role: 'Editor'},
  {id: 3, name: 'Carol', email: 'carol@co.com', role: 'Viewer'},
  {id: 4, name: 'Dave', email: 'dave@co.com', role: 'Editor'},
  {id: 5, name: 'Eve', email: 'eve@co.com', role: 'Admin'},
];

export default function UserTable() {
  const [search, setSearch] = useState('');
  const filtered = useMemo(() => users.filter(u => u.name.toLowerCase().includes(search.toLowerCase())), [search]);

  return (
    <div className="max-w-2xl">
      <Stack direction="vertical" gap={3}>
        <TextInput label="Search" value={search} onChange={setSearch} placeholder="Filter users..." />
        <Table data={filtered} columns={[{key: 'name', header: 'Name'}, {key: 'email', header: 'Email'}, {key: 'role', header: 'Role'}]} idKey="id" hasHover />
      </Stack>
    </div>
  );
}
