import {useState, useMemo} from 'react';
import {Table, type TableColumn, proportional, pixel} from '@astryxdesign/core/Table';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Stack} from '@astryxdesign/core/Stack';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

const USERS: User[] = [
  {id: 1, name: 'Alice Chen', email: 'alice@example.com', role: 'Admin', status: 'Active'},
  {id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'Active'},
  {id: 3, name: 'Carol Davis', email: 'carol@example.com', role: 'Viewer', status: 'Inactive'},
  {id: 4, name: 'Dan Lee', email: 'dan@example.com', role: 'Editor', status: 'Active'},
  {id: 5, name: 'Eva Martinez', email: 'eva@example.com', role: 'Admin', status: 'Active'},
  {id: 6, name: 'Frank Wilson', email: 'frank@example.com', role: 'Viewer', status: 'Inactive'},
];

const columns: TableColumn<User>[] = [
  {key: 'name', header: 'Name', width: proportional(2)},
  {key: 'email', header: 'Email', width: proportional(2)},
  {key: 'role', header: 'Role', width: pixel(100)},
  {key: 'status', header: 'Status', width: pixel(100)},
];

export default function UserTable() {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<keyof User>('name');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const filteredUsers = useMemo(() => {
    const query = search.toLowerCase();
    const filtered = USERS.filter(
      (u) =>
        u.name.toLowerCase().includes(query) ||
        u.email.toLowerCase().includes(query) ||
        u.role.toLowerCase().includes(query)
    );
    return filtered.sort((a, b) => {
      const aVal = String(a[sortKey]);
      const bVal = String(b[sortKey]);
      return sortDir === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    });
  }, [search, sortKey, sortDir]);

  return (
    <Stack gap={3}>
      <TextInput
        label="Search users"
        value={search}
        onChange={setSearch}
        placeholder="Search by name, email, or role..."
        isLabelHidden
      />
      <Table
        data={filteredUsers}
        columns={columns}
        idKey="id"
        hasHover
        dividers="rows"
      />
    </Stack>
  );
}
