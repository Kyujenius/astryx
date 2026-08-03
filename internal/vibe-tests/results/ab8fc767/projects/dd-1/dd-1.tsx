// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState, useMemo} from 'react';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {VStack} from '@astryxdesign/core/Stack';

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
  {id: 3, name: 'Carol White', email: 'carol@example.com', role: 'Viewer', status: 'Inactive'},
  {id: 4, name: 'Dan Brown', email: 'dan@example.com', role: 'Editor', status: 'Active'},
  {id: 5, name: 'Eve Davis', email: 'eve@example.com', role: 'Admin', status: 'Active'},
];

type SortKey = keyof User;
type SortDir = 'asc' | 'desc';

export default function UserTable() {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortDir, setSortDir] = useState<SortDir>('asc');

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return USERS
      .filter(u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q))
      .sort((a, b) => {
        const av = a[sortKey];
        const bv = b[sortKey];
        if (typeof av === 'string' && typeof bv === 'string') {
          return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
        }
        return 0;
      });
  }, [search, sortKey, sortDir]);

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const sortIndicator = (key: SortKey) => key === sortKey ? (sortDir === 'asc' ? ' ↑' : ' ↓') : '';

  return (
    <VStack gap={3}>
      <Heading level={2}>Users</Heading>
      <TextInput label="Search users" value={search} onChange={setSearch} placeholder="Search by name or email" isLabelHidden />
      <table style={{width: '100%', borderCollapse: 'collapse'}}>
        <thead>
          <tr>
            {(['name', 'email', 'role', 'status'] as SortKey[]).map(col => (
              <th
                key={col}
                onClick={() => handleSort(col)}
                style={{textAlign: 'left', padding: '8px 12px', cursor: 'pointer', borderBottom: '1px solid var(--color-border-default)'}}
              >
                {col.charAt(0).toUpperCase() + col.slice(1)}{sortIndicator(col)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filtered.map(user => (
            <tr key={user.id}>
              <td style={{padding: '8px 12px'}}><Text>{user.name}</Text></td>
              <td style={{padding: '8px 12px'}}><Text color="secondary">{user.email}</Text></td>
              <td style={{padding: '8px 12px'}}><Text>{user.role}</Text></td>
              <td style={{padding: '8px 12px'}}><Text color={user.status === 'Active' ? 'accent' : 'secondary'}>{user.status}</Text></td>
            </tr>
          ))}
        </tbody>
      </table>
      {filtered.length === 0 && <Text color="secondary">No users match your search.</Text>}
    </VStack>
  );
}
