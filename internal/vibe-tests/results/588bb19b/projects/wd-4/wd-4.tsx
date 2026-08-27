import {useState, useMemo} from 'react';
import {Table} from '@astryxdesign/core/Table';
import {Button} from '@astryxdesign/core/Button';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Dialog} from '@astryxdesign/core/Dialog';
import {AlertDialog} from '@astryxdesign/core/AlertDialog';
import {HStack} from '@astryxdesign/core/HStack';
import {VStack} from '@astryxdesign/core/VStack';
import {Badge} from '@astryxdesign/core/Badge';
import {Heading} from '@astryxdesign/core/Text';

interface Todo {
  id: string;
  title: string;
  status: 'Open' | 'Closed';
  createdAt: string;
  updatedAt: string;
  pending?: boolean;
  [key: string]: unknown;
}

export default function TodoTracker() {
  const [todos, setTodos] = useState<Todo[]>([
    {id: '1', title: 'Set up project', status: 'Closed', createdAt: '2024-01-01', updatedAt: '2024-01-02'},
    {id: '2', title: 'Build UI', status: 'Open', createdAt: '2024-01-03', updatedAt: '2024-01-04'},
  ]);
  const [filter, setFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortKey, setSortKey] = useState<'updatedAt' | 'createdAt' | 'title'>('updatedAt');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState(0);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const pageSize = 25;

  const filtered = useMemo(() => {
    let result = todos;
    if (filter) result = result.filter(t => t.title.toLowerCase().includes(filter.toLowerCase()));
    if (statusFilter) result = result.filter(t => t.status === statusFilter);
    result.sort((a, b) => {
      const cmp = a[sortKey] < b[sortKey] ? -1 : a[sortKey] > b[sortKey] ? 1 : 0;
      return sortDir === 'desc' ? -cmp : cmp;
    });
    return result;
  }, [todos, filter, statusFilter, sortKey, sortDir]);

  const paged = filtered.slice(page * pageSize, (page + 1) * pageSize);

  const columns = [
    {key: 'title' as const, header: 'Title', renderCell: (row: Todo) => {
      if (editingId === row.id) {
        return (
          <HStack gap={1}>
            <TextInput label="Edit title" isLabelHidden value={editTitle} onChange={setEditTitle} />
            <Button label="Save" variant="primary" size="sm" onClick={() => {
              setTodos(prev => prev.map(t => t.id === row.id ? {...t, title: editTitle, updatedAt: new Date().toISOString().slice(0, 10), pending: true} : t));
              setEditingId(null);
            }} />
            <Button label="Cancel" variant="ghost" size="sm" onClick={() => setEditingId(null)} />
          </HStack>
        );
      }
      return <span onClick={() => {setEditingId(row.id); setEditTitle(row.title);}}>{row.title}{row.pending ? ' (pending)' : ''}</span>;
    }},
    {key: 'status' as const, header: 'Status', renderCell: (row: Todo) => (
      <Button label={row.status} variant="ghost" size="sm" onClick={() => {
        setTodos(prev => prev.map(t => t.id === row.id ? {...t, status: t.status === 'Open' ? 'Closed' : 'Open', updatedAt: new Date().toISOString().slice(0, 10), pending: true} : t));
      }} />
    )},
    {key: 'createdAt' as const, header: 'Created'},
    {key: 'updatedAt' as const, header: 'Updated'},
    {key: 'id' as const, header: '', renderCell: (row: Todo) => (
      <Button label="Delete" variant="destructive" size="sm" onClick={() => setDeleteId(row.id)} />
    )},
  ];

  return (
    <VStack gap={4} padding={4}>
      <HStack gap={3} vAlign="center">
        <Heading level={2}>TodoTracker</Heading>
        <Button label="Create Todo" variant="primary" onClick={() => setIsCreateOpen(true)} />
      </HStack>
      <HStack gap={2}>
        <TextInput label="Filter by title" isLabelHidden value={filter} onChange={setFilter} placeholder="Filter..." hasClear />
        <Button label={statusFilter || 'All'} variant="ghost" onClick={() => setStatusFilter(s => s === '' ? 'Open' : s === 'Open' ? 'Closed' : '')} />
      </HStack>
      <Table data={paged} columns={columns} idKey="id" hasHover />
      <HStack gap={2} hAlign="center">
        <Button label="Prev" variant="ghost" isDisabled={page === 0} onClick={() => setPage(p => p - 1)} />
        <Button label="Next" variant="ghost" isDisabled={(page + 1) * pageSize >= filtered.length} onClick={() => setPage(p => p + 1)} />
      </HStack>
      {isCreateOpen && (
        <Dialog title="Create Todo" isOpen onClose={() => setIsCreateOpen(false)}>
          <VStack gap={3} padding={3}>
            <TextInput label="Title" value={newTitle} onChange={setNewTitle} />
            <Button label="Create" variant="primary" onClick={() => {
              setTodos(prev => [...prev, {id: Date.now().toString(), title: newTitle, status: 'Open', createdAt: new Date().toISOString().slice(0, 10), updatedAt: new Date().toISOString().slice(0, 10), pending: true}]);
              setNewTitle('');
              setIsCreateOpen(false);
            }} />
          </VStack>
        </Dialog>
      )}
      {deleteId && (
        <AlertDialog
          title="Delete Todo"
          description="Are you sure you want to delete this todo?"
          isOpen
          onClose={() => setDeleteId(null)}
          confirmLabel="Delete"
          onConfirm={() => {
            setTodos(prev => prev.filter(t => t.id !== deleteId));
            setDeleteId(null);
          }}
        />
      )}
    </VStack>
  );
}
