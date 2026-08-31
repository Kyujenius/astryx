import {useState, useMemo} from 'react';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Table} from '@astryxdesign/core/Table';
import {VStack} from '@astryxdesign/core/VStack';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

const users: User[] = [
  {id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active'},
  {id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'Active'},
  {id: 3, name: 'Carol Williams', email: 'carol@example.com', role: 'Viewer', status: 'Inactive'},
  {id: 4, name: 'Dave Brown', email: 'dave@example.com', role: 'Editor', status: 'Active'},
  {id: 5, name: 'Eve Davis', email: 'eve@example.com', role: 'Admin', status: 'Active'},
];

export default function UserTable() {
  const [search, setSearch] = useState('');
  const [sortColumn, setSortColumn] = useState<keyof User>('name');
  const [sortDirection, setSortDirection] = useState<'ascending' | 'descending'>('ascending');

  const filteredUsers = useMemo(() => {
    const filtered = users.filter(
      (u) =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()) ||
        u.role.toLowerCase().includes(search.toLowerCase())
    );
    return filtered.sort((a, b) => {
      const aVal = String(a[sortColumn]);
      const bVal = String(b[sortColumn]);
      const cmp = aVal.localeCompare(bVal);
      return sortDirection === 'ascending' ? cmp : -cmp;
    });
  }, [search, sortColumn, sortDirection]);

  const handleSort = (column: keyof User) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'ascending' ? 'descending' : 'ascending');
    } else {
      setSortColumn(column);
      setSortDirection('ascending');
    }
  };

  return (
    <VStack gap={3}>
      <TextInput
        label="Search users"
        value={search}
        onChange={setSearch}
        placeholder="Search by name, email, or role"
      />
      <Table
        label="Users"
        columns={[
          {id: 'name', header: 'Name', isSortable: true},
          {id: 'email', header: 'Email', isSortable: true},
          {id: 'role', header: 'Role', isSortable: true},
          {id: 'status', header: 'Status', isSortable: true},
        ]}
        rows={filteredUsers.map((u) => ({
          id: String(u.id),
          name: u.name,
          email: u.email,
          role: u.role,
          status: u.status,
        }))}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        onSort={(col) => handleSort(col as keyof User)}
      />
    </VStack>
  );
}
