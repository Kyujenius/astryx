// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState, useMemo} from 'react';
import {Table} from '@astryxdesign/core/Table';
import {Button} from '@astryxdesign/core/Button';
import {Dialog} from '@astryxdesign/core/Dialog';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Badge} from '@astryxdesign/core/Badge';
import {Heading} from '@astryxdesign/core/Heading';

interface Todo extends Record<string, unknown> {
  id: string; title: string; status: 'Open' | 'Closed'; created: string; updated: string; pending?: boolean;
}

export default function TodoTracker() {
  const [todos, setTodos] = useState<Todo[]>([
    {id: '1', title: 'Set up project', status: 'Closed', created: '2024-01-01', updated: '2024-01-02'},
    {id: '2', title: 'Write tests', status: 'Open', created: '2024-01-03', updated: '2024-01-04'},
  ]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 25;

  const filtered = useMemo(() => todos.filter((t) => t.title.toLowerCase().includes(filter.toLowerCase())).sort((a, b) => b.updated.localeCompare(a.updated)), [todos, filter]);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const createTodo = () => {
    const now = new Date().toISOString().split('T')[0];
    setTodos([...todos, {id: Date.now().toString(), title: newTitle.trim(), status: 'Open', created: now, updated: now, pending: true}]);
    setNewTitle(''); setIsCreateOpen(false);
  };

  const columns = [
    {key: 'title' as const, header: 'Title'},
    {key: 'status' as const, header: 'Status', renderCell: (row: Todo) => <Badge>{row.status}</Badge>},
    {key: 'created' as const, header: 'Created'},
    {key: 'updated' as const, header: 'Updated'},
  ];

  return (
    <div className="p-4 space-y-4 max-w-4xl">
      <Heading level={2}>Todo Tracker</Heading>
      <div className="flex gap-2 items-end">
        <TextInput label="Filter" isLabelHidden value={filter} onChange={setFilter} placeholder="Filter by title" />
        <Button label="Create Todo" onPress={() => setIsCreateOpen(true)} />
      </div>
      <Table data={paged} columns={columns} idKey="id" hasHover />
      <Dialog isOpen={isCreateOpen} onOpenChange={setIsCreateOpen} purpose="form">
        <div className="space-y-4 p-4">
          <Heading level={3}>Create Todo</Heading>
          <TextInput label="Title" value={newTitle} onChange={setNewTitle} />
          <Button label="Create" onPress={createTodo} />
        </div>
      </Dialog>
    </div>
  );
}