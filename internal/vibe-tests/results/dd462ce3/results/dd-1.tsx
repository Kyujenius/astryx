// Copyright (c) Meta Platforms, Inc. and affiliates.

import React, {useState, useMemo} from 'react';
import {Table, proportional} from '@astryxdesign/core/Table';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Badge} from '@astryxdesign/core/Badge';
import {Avatar} from '@astryxdesign/core/Avatar';

interface User extends Record<string, unknown> {
  id: number; name: string; email: string; role: string; status: 'active' | 'inactive';
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
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return USERS.filter(u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
  }, [search]);

  return (
    <div className="flex flex-col gap-4">
      <div className="max-w-xs">
        <TextInput label="Search" value={search} onChange={setSearch} placeholder="Search..." hasClearButton />
      </div>
      <Table data={filtered} columns={[
        {key: 'name', header: 'Name', width: proportional(2), renderCell: (r: User) => <div className="flex items-center gap-2"><Avatar name={r.name} size="small" /><span>{r.name}</span></div>},
        {key: 'email', header: 'Email', width: proportional(2)},
        {key: 'role', header: 'Role', width: proportional(1)},
        {key: 'status', header: 'Status', width: proportional(1), renderCell: (r: User) => <Badge variant={r.status === 'active' ? 'positive' : 'neutral'}>{r.status}</Badge>},
      ]} idKey="id" hasHover />
    </div>
  );
}
