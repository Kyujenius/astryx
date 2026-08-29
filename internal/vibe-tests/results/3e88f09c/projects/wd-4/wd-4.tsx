import {useState, useMemo, useCallback} from 'react';
import {Table} from '@astryxdesign/core/Table';
import {TableHeader} from '@astryxdesign/core/Table';
import {TableBody} from '@astryxdesign/core/Table';
import {TableRow} from '@astryxdesign/core/Table';
import {TableCell} from '@astryxdesign/core/Table';
import {Button} from '@astryxdesign/core/Button';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Selector} from '@astryxdesign/core/Selector';
import {Dialog} from '@astryxdesign/core/Dialog';
import {DialogHeader} from '@astryxdesign/core/Dialog';
import {AlertDialog} from '@astryxdesign/core/AlertDialog';
import {Badge} from '@astryxdesign/core/Badge';
import {HStack} from '@astryxdesign/core/HStack';
import {VStack} from '@astryxdesign/core/VStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Pagination} from '@astryxdesign/core/Pagination';

interface Todo {
  id: string;
  title: string;
  status: 'Open' | 'Closed';
  createdAt: string;
  updatedAt: string;
  pending?: boolean;
}

const PAGE_SIZE = 25;
const now = () => new Date().toISOString();

let nextId = 6;
const initialTodos: Todo[] = Array.from({length: 30}, (_, i) => ({
  id: String(i + 1),
  title: `Task ${i + 1}`,
  status: i % 3 === 0 ? 'Closed' as const : 'Open' as const,
  createdAt: new Date(2024, 0, i + 1).toISOString(),
  updatedAt: new Date(2024, 1, i + 1).toISOString(),
}));

type SortKey = 'updatedAt' | 'createdAt' | 'title';

export default function TodoTracker() {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [filterTitle, setFilterTitle] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [sortBy, setSortBy] = useState<SortKey>('updatedAt');
  const [sortDesc, setSortDesc] = useState(true);
  const [page, setPage] = useState(1);
  const [showCreate, setShowCreate] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let result = todos;
    if (filterTitle) result = result.filter((t) => t.title.toLowerCase().includes(filterTitle.toLowerCase()));
    if (filterStatus) result = result.filter((t) => t.status === filterStatus);
    result.sort((a, b) => {
      const av = a[sortBy]; const bv = b[sortBy];
      const cmp = av < bv ? -1 : av > bv ? 1 : 0;
      return sortDesc ? -cmp : cmp;
    });
    return result;
  }, [todos, filterTitle, filterStatus, sortBy, sortDesc]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const toggleStatus = useCallback((id: string) => {
    setTodos((prev) => prev.map((t) =>
      t.id === id ? {...t, status: t.status === 'Open' ? 'Closed' : 'Open', updatedAt: now(), pending: true} : t
    ));
    setTimeout(() => {
      setTodos((prev) => prev.map((t) => t.id === id ? {...t, pending: false} : t));
    }, 500);
  }, []);

  const createTodo = useCallback(() => {
    if (!newTitle.trim()) return;
    const todo: Todo = {id: String(nextId++), title: newTitle, status: 'Open', createdAt: now(), updatedAt: now(), pending: true};
    setTodos((prev) => [todo, ...prev]);
    setNewTitle('');
    setShowCreate(false);
    setTimeout(() => {
      setTodos((prev) => prev.map((t) => t.id === todo.id ? {...t, pending: false} : t));
    }, 500);
  }, [newTitle]);

  const deleteTodo = useCallback((id: string) => {
    setTodos((prev) => prev.map((t) => t.id === id ? {...t, pending: true} : t));
    setTimeout(() => setTodos((prev) => prev.filter((t) => t.id !== id)), 500);
    setDeleteId(null);
  }, []);

  const saveEdit = useCallback(() => {
    if (!editingId || !editTitle.trim()) return;
    setTodos((prev) => prev.map((t) =>
      t.id === editingId ? {...t, title: editTitle, updatedAt: now(), pending: true} : t
    ));
    setTimeout(() => {
      setTodos((prev) => prev.map((t) => t.id === editingId ? {...t, pending: false} : t));
    }, 500);
    setEditingId(null);
  }, [editingId, editTitle]);

  const handleSort = (key: SortKey) => {
    if (sortBy === key) setSortDesc(!sortDesc);
    else { setSortBy(key); setSortDesc(true); }
  };

  return (
    <VStack gap="md">
      <HStack gap="md" align="center">
        <Heading level={2}>TodoTracker</Heading>
        <Button label="Create Todo" variant="primary" onPress={() => setShowCreate(true)} />
      </HStack>
      <HStack gap="sm">
        <TextInput label="Filter by title" value={filterTitle} onChange={setFilterTitle} placeholder="Search..." isLabelHidden />
        <Selector label="Filter by status" options={['', 'Open', 'Closed']} value={filterStatus} onChange={setFilterStatus} placeholder="All statuses" isLabelHidden />
      </HStack>
      <Table density="compact">
        <TableHeader>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>
              <Button label={`Created${sortBy === 'createdAt' ? (sortDesc ? ' ↓' : ' ↑') : ''}`} variant="ghost" size="sm" onPress={() => handleSort('createdAt')} />
            </TableCell>
            <TableCell>
              <Button label={`Updated${sortBy === 'updatedAt' ? (sortDesc ? ' ↓' : ' ↑') : ''}`} variant="ghost" size="sm" onPress={() => handleSort('updatedAt')} />
            </TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paged.map((todo) => (
            <TableRow key={todo.id}>
              <TableCell>
                {editingId === todo.id ? (
                  <HStack gap="xs">
                    <TextInput label="Edit title" value={editTitle} onChange={setEditTitle} isLabelHidden />
                    <Button label="Save" variant="primary" size="sm" onPress={saveEdit} />
                    <Button label="Cancel" variant="ghost" size="sm" onPress={() => setEditingId(null)} />
                  </HStack>
                ) : (
                  <span
                    style={{cursor: 'pointer', opacity: todo.pending ? 0.5 : 1}}
                    onClick={() => { setEditingId(todo.id); setEditTitle(todo.title); }}
                  >
                    {todo.title}{todo.pending ? ' (pending)' : ''}
                  </span>
                )}
              </TableCell>
              <TableCell>
                <Button
                  label={todo.status}
                  variant={todo.status === 'Open' ? 'secondary' : 'ghost'}
                  size="sm"
                  onPress={() => toggleStatus(todo.id)}
                />
              </TableCell>
              <TableCell>{new Date(todo.createdAt).toLocaleDateString()}</TableCell>
              <TableCell>{new Date(todo.updatedAt).toLocaleDateString()}</TableCell>
              <TableCell>
                <Button label="Delete" variant="destructive" size="sm" onPress={() => setDeleteId(todo.id)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination page={page} total={totalPages} onChange={setPage} variant="pages" />
      {showCreate && (
        <Dialog isOpen onClose={() => setShowCreate(false)}>
          <DialogHeader title="Create Todo" />
          <VStack gap="md">
            <TextInput label="Title" value={newTitle} onChange={setNewTitle} isRequired />
            <HStack gap="sm">
              <Button label="Create" variant="primary" onPress={createTodo} isDisabled={!newTitle.trim()} />
              <Button label="Cancel" variant="ghost" onPress={() => setShowCreate(false)} />
            </HStack>
          </VStack>
        </Dialog>
      )}
      {deleteId && (
        <AlertDialog
          isOpen
          title="Delete todo?"
          description="This action cannot be undone."
          actionLabel="Delete"
          actionVariant="destructive"
          onAction={() => deleteTodo(deleteId)}
          onClose={() => setDeleteId(null)}
        />
      )}
    </VStack>
  );
}
