import {Table, proportional, pixel} from '@astryxdesign/core/Table';
import {Button} from '@astryxdesign/core/Button';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Dialog} from '@astryxdesign/core/Dialog';
import {DialogHeader} from '@astryxdesign/core/Dialog';
import {Stack} from '@astryxdesign/core/Stack';
import {SegmentedControl, SegmentedControlItem} from '@astryxdesign/core/SegmentedControl';
import {useState, useMemo} from 'react';

interface Todo { id: string; title: string; status: 'open' | 'closed'; created: string; updated: string; pending?: boolean; [key: string]: unknown; }

export default function TodoTracker() {
  const [todos, setTodos] = useState<Todo[]>([
    {id: '1', title: 'Set up project', status: 'closed', created: '2024-01-01', updated: '2024-01-02'},
    {id: '2', title: 'Write tests', status: 'open', created: '2024-01-03', updated: '2024-01-04'},
  ]);
  const [filter, setFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const filtered = useMemo(() => {
    let result = todos.filter(t => t.title.toLowerCase().includes(filter.toLowerCase()));
    if (statusFilter !== 'all') result = result.filter(t => t.status === statusFilter);
    return result.sort((a, b) => b.updated.localeCompare(a.updated));
  }, [todos, filter, statusFilter]);

  const columns = [
    {key: 'title' as const, header: 'Title', width: proportional(2)},
    {key: 'status' as const, header: 'Status', width: pixel(100)},
    {key: 'created' as const, header: 'Created', width: pixel(120)},
    {key: 'updated' as const, header: 'Updated', width: pixel(120)},
  ];

  return (
    <Stack gap={3}>
      <Stack direction="row" gap={2}>
        <TextInput label="Filter" isLabelHidden value={filter} onChange={setFilter} placeholder="Filter by title..." />
        <SegmentedControl label="Status" value={statusFilter} onChange={setStatusFilter}>
          <SegmentedControlItem value="all" label="All" />
          <SegmentedControlItem value="open" label="Open" />
          <SegmentedControlItem value="closed" label="Closed" />
        </SegmentedControl>
        <Button label="Create Todo" variant="primary" onClick={() => setIsCreateOpen(true)} />
      </Stack>
      <Table data={filtered} columns={columns} idKey="id" hasHover />
      <Dialog isOpen={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogHeader title="Create Todo" />
        <Stack gap={2}>
          <TextInput label="Title" value={newTitle} onChange={setNewTitle} />
          <Button label="Create" variant="primary" onClick={() => { const now = new Date().toISOString().slice(0,10); setTodos(p => [{id: Date.now().toString(), title: newTitle, status: 'open', created: now, updated: now, pending: true}, ...p]); setNewTitle(''); setIsCreateOpen(false); }} />
        </Stack>
      </Dialog>
    </Stack>
  );
}