// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState, useMemo} from 'react';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Table} from '@astryxdesign/core/Table';
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
  {id: 6, name: 'Frank Miller', email: 'frank@example.com', role: 'Viewer', status: 'Inactive'},
  {id: 7, name: 'Grace Lee', email: 'grace@example.com', role: 'Editor', status: 'Active'},
  {id: 8, name: 'Henry Wilson', email: 'henry@example.com', role: 'Viewer', status: 'Active'},
];

export default function UsersTable() {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<keyof User>('name');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return USERS
      .filter(u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q))
      .sort((a, b) => {
        const aVal = String(a[sortKey]);
        const bVal = String(b[sortKey]);
        return sortDir === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      });
  }, [search, sortKey, sortDir]);

  return (
    <div className="flex flex-col gap-4 max-w-3xl">
      <Heading level={2}>Users</Heading>
      <TextInput
        label="Search users"
        isLabelHidden
        placeholder="Search by name or email..."
        value={search}
        onChange={setSearch}
        hasClear
        startIcon="search"
      />
      <Table data={filtered} columns={[
        {key: 'name', header: 'Name'},
        {key: 'email', header: 'Email'},
        {key: 'role', header: 'Role'},
        {key: 'status', header: 'Status'},
      ]} idKey="id" hasHover isStriped />
    </div>
  );
}
