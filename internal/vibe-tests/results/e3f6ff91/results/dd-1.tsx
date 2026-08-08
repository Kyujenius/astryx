// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState, useMemo} from 'react';
import {Table, type TableColumn, pixel, proportional} from '@astryxdesign/core/Table';
import {Stack} from '@astryxdesign/core/Stack';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Heading} from '@astryxdesign/core/Heading';

interface User extends Record<string, unknown> {
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
      .filter(u =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.role.toLowerCase().includes(q),
      )
      .sort((a, b) => {
        const av = String(a[sortKey]);
        const bv = String(b[sortKey]);
        return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
      });
  }, [search, sortKey, sortDir]);

  const handleSort = (key: keyof User) => {
    if (sortKey === key) {
      setSortDir(d => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const columns: TableColumn<User>[] = [
    {key: 'name', header: 'Name', width: proportional(2)},
    {key: 'email', header: 'Email', width: proportional(2)},
    {key: 'role', header: 'Role', width: pixel(100)},
    {key: 'status', header: 'Status', width: pixel(100)},
  ];

  return (
    <Stack gap={3}>
      <Heading level={2}>Users</Heading>
      <TextInput
        label="Search users"
        isLabelHidden
        value={search}
        onChange={setSearch}
        placeholder="Search by name, email, or role..."
        hasClear
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
