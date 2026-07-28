// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState, useMemo} from 'react';
import {VStack} from '@astryxdesign/core/VStack';
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
      .filter(u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.role.toLowerCase().includes(q))
      .sort((a, b) => {
        const aVal = String(a[sortKey]);
        const bVal = String(b[sortKey]);
        return sortDir === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      });
  }, [search, sortKey, sortDir]);

  const handleSort = (key: keyof User) => {
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const columns = [
    {key: 'name' as const, header: `Name ${sortKey === 'name' ? (sortDir === 'asc' ? '\u2191' : '\u2193') : ''}`},
    {key: 'email' as const, header: `Email ${sortKey === 'email' ? (sortDir === 'asc' ? '\u2191' : '\u2193') : ''}`},
    {key: 'role' as const, header: `Role ${sortKey === 'role' ? (sortDir === 'asc' ? '\u2191' : '\u2193') : ''}`},
    {key: 'status' as const, header: `Status ${sortKey === 'status' ? (sortDir === 'asc' ? '\u2191' : '\u2193') : ''}`},
  ];

  return (
    <VStack gap={3}>
      <Heading level={2}>Users</Heading>
      <TextInput
        label="Search users"
        isLabelHidden
        placeholder="Search by name, email, or role..."
        value={search}
        onChange={setSearch}
        hasClear
        startIcon="search"
      />
      <Table
        data={filtered}
        columns={columns}
        idKey="id"
        hasHover
        isStriped
      />
    </VStack>
  );
}
