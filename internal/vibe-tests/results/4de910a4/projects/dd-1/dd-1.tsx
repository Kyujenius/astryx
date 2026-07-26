// Copyright (c) Meta Platforms, Inc. and affiliates.

import React, {useState, useMemo} from 'react';
import {Table, proportional} from '@astryxdesign/core/Table';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Badge} from '@astryxdesign/core/Badge';
import {Avatar} from '@astryxdesign/core/Avatar';
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  container: { display: 'flex', flexDirection: 'column', gap: 16 },
  search: { maxWidth: 320 },
});

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
  {id: 4, name: 'Dave Brown', email: 'dave@example.com', role: 'Editor', status: 'active'},
  {id: 5, name: 'Eve Davis', email: 'eve@example.com', role: 'Admin', status: 'active'},
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
        const av = String(a[sortKey]);
        const bv = String(b[sortKey]);
        return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
      });
  }, [search, sortKey, sortDir]);

  const columns = [
    {key: 'name' as const, header: 'Name', width: proportional(2), renderCell: (row: User) => (
      <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
        <Avatar name={row.name} size="small" />
        <span>{row.name}</span>
      </div>
    )},
    {key: 'email' as const, header: 'Email', width: proportional(2)},
    {key: 'role' as const, header: 'Role', width: proportional(1)},
    {key: 'status' as const, header: 'Status', width: proportional(1), renderCell: (row: User) => (
      <Badge variant={row.status === 'active' ? 'positive' : 'neutral'}>{row.status}</Badge>
    )},
  ];

  return (
    <div {...stylex.props(styles.container)}>
      <div {...stylex.props(styles.search)}>
        <TextInput label="Search users" value={search} onChange={setSearch} placeholder="Search by name or email..." hasClearButton />
      </div>
      <Table data={filtered} columns={columns} idKey="id" hasHover density="balanced" />
    </div>
  );
}
