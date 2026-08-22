import {Table, pixel, proportional} from '@astryxdesign/core/Table';
import {Pagination} from '@astryxdesign/core/Pagination';
import {CheckboxInput} from '@astryxdesign/core/CheckboxInput';
import {Stack} from '@astryxdesign/core/Stack';
import {Heading} from '@astryxdesign/core/Heading';
import {Badge} from '@astryxdesign/core/Badge';
import {useState} from 'react';

interface Todo {
  id: number;
  title: string;
  status: 'pending' | 'done';
  dueDate: string;
  [key: string]: unknown;
}

const todos: Todo[] = Array.from({length: 75}, (_, i) => ({
  id: i + 1,
  title: `Task ${i + 1}`,
  status: i % 3 === 0 ? 'done' : 'pending',
  dueDate: `2026-09-${String((i % 28) + 1).padStart(2, '0')}`,
}));

export default function TodoTracker() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const start = (page - 1) * pageSize;
  const pageData = todos.slice(start, start + pageSize);

  return (
    <Stack gap={4}>
      <Heading level={2}>TodoTracker</Heading>
      <Table
        data={pageData}
        idKey="id"
        hasHover
        columns={[
          {key: 'id', header: 'ID', width: pixel(60)},
          {key: 'title', header: 'Title', width: proportional(2)},
          {key: 'status', header: 'Status', width: pixel(100), renderCell: (row) => (
            <Badge variant={row.status === 'done' ? 'success' : 'neutral'}>{row.status}</Badge>
          )},
          {key: 'dueDate', header: 'Due Date', width: pixel(120)},
        ]}
      />
      <Pagination
        page={page}
        onChange={setPage}
        totalItems={todos.length}
        pageSize={pageSize}
        pageSizeOptions={[10, 25, 50]}
        onPageSizeChange={setPageSize}
      />
    </Stack>
  );
}
