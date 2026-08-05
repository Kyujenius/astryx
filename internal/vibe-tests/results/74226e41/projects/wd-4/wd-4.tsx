// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState, useMemo} from 'react';
import {Table} from '@astryxdesign/core/Table';
import {Button} from '@astryxdesign/core/Button';
import {Dialog} from '@astryxdesign/core/Dialog';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Badge} from '@astryxdesign/core/Badge';
import {Heading} from '@astryxdesign/core/Heading';

interface Todo extends Record<string, unknown> {
  id: string;
  title: string;
  status: 'Open' | 'Closed';
  created: string;
  updated: string;
  pending?: boolean;
}

export default function TodoTracker() {
  const [todos, setTodos] = useState<Todo[]>([
    {id: '1', title: 'Set up project', status: 'Closed', created: '2024-01-01', updated: '2024-01-02'},
    {id: '2', title: 'Write tests', status: 'Open', created: '2024-01-03', updated: '2024-01-04'},
    {id: '3', title: 'Deploy to prod', status: 'Open', created: '2024-01-05', updated: '2024-01-06'},
  ]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [filter, setFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'Open' | 'Closed'>('all');
  const [sortField, setSortField] = useState<'updated' | 'created' | 'title'>('updated');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 25;

  const filtered = useMemo(() => {
    let result = todos.filter((t) => t.title.toLowerCase().includes(filter.toLowerCase()));
    if (statusFilter !== 'all') {result = result.filter((t) => t.status === statusFilter);}
    result.sort((a, b) => {
      const aVal = String(a[sortField]);
      const bVal = String(b[sortField]);
      return sortDir === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    });
    return result;
  }, [todos, filter, statusFilter, sortField, sortDir]);

  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  const createTodo = () => {
    if (!newTitle.trim()) {return;}
    const now = new Date().toISOString().split('T')[0];
    setTodos((prev) => [...prev, {id: Date.now().toString(), title: newTitle.trim(), status: 'Open', created: now, updated: now, pending: true}]);
    setNewTitle('');
    setIsCreateOpen(false);
    setTimeout(() => setTodos((prev) => prev.map((t) => ({...t, pending: false}))), 500);
  };

  const toggleStatus = (id: string) => {
    setTodos((prev) => prev.map((t) => t.id === id ? {...t, status: t.status === 'Open' ? 'Closed' : 'Open', updated: new Date().toISOString().split('T')[0], pending: true} : t));
    setTimeout(() => setTodos((prev) => prev.map((t) => ({...t, pending: false}))), 500);
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
    setDeleteId(null);
  };

  const saveEdit = (id: string) => {
    setTodos((prev) => prev.map((t) => t.id === id ? {...t, title: editTitle, updated: new Date().toISOString().split('T')[0]} : t));
    setEditingId(null);
  };

  const columns = [
    {key: 'title' as const, header: 'Title'},
    {key: 'status' as const, header: 'Status', renderCell: (row: Todo) => <Badge>{row.status}</Badge>},
    {key: 'created' as const, header: 'Created'},
    {key: 'updated' as const, header: 'Updated'},
  ];

  return (
    <div>
      <Heading level={2}>Todo Tracker</Heading>
      <div style={{display: 'flex', gap: 8, marginBottom: 16, alignItems: 'flex-end'}}>
        <TextInput label="Filter" isLabelHidden value={filter} onChange={setFilter} placeholder="Filter by title" />
        <Button label="Create Todo" onPress={() => setIsCreateOpen(true)} />
      </div>
      <Table data={paged} columns={columns} idKey="id" hasHover />
      {totalPages > 1 && (
        <div style={{display: 'flex', gap: 8, marginTop: 8, alignItems: 'center'}}>
          <Button label="Prev" onPress={() => setPage(Math.max(1, page - 1))} isDisabled={page === 1} variant="ghost" size="sm" />
          <span>Page {page} of {totalPages}</span>
          <Button label="Next" onPress={() => setPage(Math.min(totalPages, page + 1))} isDisabled={page === totalPages} variant="ghost" size="sm" />
        </div>
      )}
      <Dialog isOpen={isCreateOpen} onOpenChange={setIsCreateOpen} purpose="form">
        <Heading level={3}>Create Todo</Heading>
        <TextInput label="Title" value={newTitle} onChange={setNewTitle} placeholder="Todo title" />
        <Button label="Create" onPress={createTodo} />
      </Dialog>
      <Dialog isOpen={deleteId !== null} onOpenChange={(open) => { if (!open) {setDeleteId(null);} }} purpose="required">
        <Heading level={3}>Delete this todo?</Heading>
        <div style={{display: 'flex', gap: 8}}>
          <Button label="Delete" onPress={() => deleteId && deleteTodo(deleteId)} />
          <Button label="Cancel" variant="ghost" onPress={() => setDeleteId(null)} />
        </div>
      </Dialog>
    </div>
  );
}