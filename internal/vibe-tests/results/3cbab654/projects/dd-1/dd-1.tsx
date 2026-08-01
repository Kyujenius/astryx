import {Table, TableHeaderCell, TableRow, TableCell, useTableSortable, proportional, pixel} from '@astryxdesign/core/Table';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Stack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import {useState, useMemo} from 'react';

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
  {id: 3, name: 'Carol White', email: 'carol@example.com', role: 'Viewer', status: 'Inactive'},
  {id: 4, name: 'Dave Brown', email: 'dave@example.com', role: 'Editor', status: 'Active'},
  {id: 5, name: 'Eve Davis', email: 'eve@example.com', role: 'Admin', status: 'Active'},
];

type SortKey = 'name' | 'email' | 'role' | 'status';

export default function UserTable() {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<Array<{sortKey: SortKey; direction: 'ascending' | 'descending'}>>([
    {sortKey: 'name', direction: 'ascending'},
  ]);

  const sortPlugin = useTableSortable({sort, onSortChange: setSort});

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    let result = users.filter(
      (u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    );
    if (sort.length > 0) {
      const {sortKey, direction} = sort[0];
      result = [...result].sort((a, b) => {
        const cmp = a[sortKey].localeCompare(b[sortKey]);
        return direction === 'ascending' ? cmp : -cmp;
      });
    }
    return result;
  }, [search, sort]);

  return (
    <Stack gap={3} padding={4}>
      <Text type="display-3">Users</Text>
      <TextInput label="Search users" value={search} onChange={setSearch} isLabelHidden />
      <Table
        data={filtered}
        idKey="id"
        columns={[
          {key: 'name', header: 'Name', width: proportional(2)},
          {key: 'email', header: 'Email', width: proportional(2)},
          {key: 'role', header: 'Role', width: proportional(1)},
          {key: 'status', header: 'Status', width: pixel(100)},
        ]}
        plugins={{sort: sortPlugin}}
        hasHover
      />
    </Stack>
  );
}
