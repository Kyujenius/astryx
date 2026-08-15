import {useState} from 'react';
import {Table} from '@astryxdesign/core/Table';
import {Pagination} from '@astryxdesign/core/Pagination';
import {Heading} from '@astryxdesign/core/Heading';
import {Button} from '@astryxdesign/core/Button';
import {Badge} from '@astryxdesign/core/Badge';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Selector} from '@astryxdesign/core/Selector';
import {Card} from '@astryxdesign/core/Card';

interface Todo {
  id: number;
  title: string;
  status: 'pending' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  assignee: string;
  [key: string]: unknown;
}

const allTodos: Todo[] = Array.from({length: 45}, (_, i) => ({
  id: i + 1,
  title: `Task ${i + 1}: ${['Fix login bug', 'Update docs', 'Add tests', 'Refactor API', 'Deploy staging'][i % 5]}`,
  status: (['pending', 'in-progress', 'done'] as const)[i % 3],
  priority: (['low', 'medium', 'high'] as const)[i % 3],
  assignee: ['Alice', 'Bob', 'Carol', 'Dave'][i % 4],
}));

export default function TodoTracker() {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const pageSize = 10;

  const filtered = allTodos.filter(t =>
    (!filter || t.title.toLowerCase().includes(filter.toLowerCase())) &&
    (!statusFilter || t.status === statusFilter)
  );

  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  const columns = [
    {key: 'id' as const, header: 'ID', width: 60},
    {key: 'title' as const, header: 'Title'},
    {key: 'status' as const, header: 'Status', renderCell: (row: Todo) => (
      <Badge label={row.status} variant={row.status === 'done' ? 'success' : row.status === 'in-progress' ? 'info' : 'neutral'} />
    )},
    {key: 'priority' as const, header: 'Priority', renderCell: (row: Todo) => (
      <Badge label={row.priority} variant={row.priority === 'high' ? 'error' : row.priority === 'medium' ? 'warning' : 'neutral'} />
    )},
    {key: 'assignee' as const, header: 'Assignee'},
  ];

  return (
    <div className="flex flex-col gap-4 p-4">
      <Heading level={1}>TodoTracker</Heading>
      <div className="flex items-end gap-3">
        <TextInput label="Search" value={filter} onChange={setFilter} placeholder="Filter tasks..." isLabelHidden hasClear />
        <Selector
          label="Status"
          options={[{value: '', label: 'All statuses'}, {value: 'pending', label: 'Pending'}, {value: 'in-progress', label: 'In Progress'}, {value: 'done', label: 'Done'}]}
          value={statusFilter}
          onChange={setStatusFilter}
        />
        <Button label="New todo" variant="primary" />
      </div>
      <Card padding={0}>
        <Table data={paged} columns={columns} idKey="id" hasHover dividers="rows" />
      </Card>
      <Pagination page={page} onChange={setPage} totalItems={filtered.length} pageSize={pageSize} />
    </div>
  );
}
