import {useState, useMemo} from 'react';
import {Table} from '@astryxdesign/core/Table';
import {Button} from '@astryxdesign/core/Button';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Dialog} from '@astryxdesign/core/Dialog';
import {AlertDialog} from '@astryxdesign/core/AlertDialog';
import {Badge} from '@astryxdesign/core/Badge';

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
    return result.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  }, [todos, filter, statusFilter]);

  const paged = filtered.slice(page * pageSize, (page + 1) * pageSize);

  const columns = [
    {key: 'title' as const, header: 'Title', renderCell: (row: Todo) => {
      if (editingId === row.id) {
        return (
          <div className="flex gap-1">
            <TextInput label="Edit title" isLabelHidden value={editTitle} onChange={setEditTitle} />
            <Button label="Save" variant="primary" size="sm" onClick={() => {
              setTodos(prev => prev.map(t => t.id === row.id ? {...t, title: editTitle, updatedAt: new Date().toISOString().slice(0, 10), pending: true} : t));
              setEditingId(null);
            }} />
            <Button label="Cancel" variant="ghost" size="sm" onClick={() => setEditingId(null)} />
          </div>
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
    <div className="flex flex-col gap-4 p-4">
      <div className="flex gap-3 items-center">
        <h2 className="text-xl font-bold">TodoTracker</h2>
        <Button label="Create Todo" variant="primary" onClick={() => setIsCreateOpen(true)} />
      </div>
      <div className="flex gap-2">
        <TextInput label="Filter by title" isLabelHidden value={filter} onChange={setFilter} placeholder="Filter..." hasClear />
        <Button label={statusFilter || 'All'} variant="ghost" onClick={() => setStatusFilter(s => s === '' ? 'Open' : s === 'Open' ? 'Closed' : '')} />
      </div>
      <Table data={paged} columns={columns} idKey="id" hasHover />
      <div className="flex gap-2 justify-center">
        <Button label="Prev" variant="ghost" isDisabled={page === 0} onClick={() => setPage(p => p - 1)} />
        <Button label="Next" variant="ghost" isDisabled={(page + 1) * pageSize >= filtered.length} onClick={() => setPage(p => p + 1)} />
      </div>
      {isCreateOpen && (
        <Dialog title="Create Todo" isOpen onClose={() => setIsCreateOpen(false)}>
          <div className="flex flex-col gap-3 p-3">
            <TextInput label="Title" value={newTitle} onChange={setNewTitle} />
            <Button label="Create" variant="primary" onClick={() => {
              setTodos(prev => [...prev, {id: Date.now().toString(), title: newTitle, status: 'Open', createdAt: new Date().toISOString().slice(0, 10), updatedAt: new Date().toISOString().slice(0, 10), pending: true}]);
              setNewTitle('');
              setIsCreateOpen(false);
            }} />
          </div>
        </Dialog>
      )}
      {deleteId && (
        <AlertDialog title="Delete Todo" description="Are you sure?" isOpen onClose={() => setDeleteId(null)} confirmLabel="Delete" onConfirm={() => { setTodos(prev => prev.filter(t => t.id !== deleteId)); setDeleteId(null); }} />
      )}
    </div>
  );
}
