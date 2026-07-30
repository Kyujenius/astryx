import {Table, pixel, proportional} from '@astryxdesign/core/Table';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Stack} from '@astryxdesign/core/Stack';
import {Badge} from '@astryxdesign/core/Badge';
import {Avatar} from '@astryxdesign/core/Avatar';
import {Heading} from '@astryxdesign/core/Heading';
import {useState, useMemo} from 'react';

interface User extends Record<string, unknown> {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
}

const USERS: User[] = [
  {id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'active'},
  {id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'active'},
  {id: 3, name: 'Carol White', email: 'carol@example.com', role: 'Viewer', status: 'inactive'},
  {id: 4, name: 'David Brown', email: 'david@example.com', role: 'Editor', status: 'active'},
  {id: 5, name: 'Eve Davis', email: 'eve@example.com', role: 'Admin', status: 'inactive'},
];

export default function UserTable() {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<keyof User>('name');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const filteredUsers = useMemo(() => {
    const filtered = USERS.filter(
      (u) =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    );
    return filtered.sort((a, b) => {
      const aVal = String(a[sortKey]);
      const bVal = String(b[sortKey]);
      return sortDir === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    });
  }, [search, sortKey, sortDir]);

  return (
    <Stack gap={4}>
      <Heading level={2}>Users</Heading>
      <TextInput
        label="Search users"
        value={search}
        onChange={(v) => setSearch(v)}
        placeholder="Search by name or email..."
      />
      <Table
        data={filteredUsers}
        idKey="id"
        columns={[
          {
            key: 'name',
            header: 'Name',
            width: proportional(2),
            renderCell: (row) => (
              <Stack gap={2} direction="row" align="center">
                <Avatar name={row.name} size="sm" />
                <span>{row.name}</span>
              </Stack>
            ),
          },
          {key: 'email', header: 'Email', width: proportional(2)},
          {key: 'role', header: 'Role', width: pixel(120)},
          {
            key: 'status',
            header: 'Status',
            width: pixel(100),
            renderCell: (row) => (
              <Badge
                label={row.status}
                variant={row.status === 'active' ? 'success' : 'neutral'}
              />
            ),
          },
        ]}
        sortKey={sortKey}
        sortDirection={sortDir}
        onSort={(key) => {
          if (key === sortKey) {
            setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
          } else {
            setSortKey(key as keyof User);
            setSortDir('asc');
          }
        }}
      />
    </Stack>
  );
}
