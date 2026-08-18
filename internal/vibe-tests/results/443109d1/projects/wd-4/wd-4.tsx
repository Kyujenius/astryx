import {Table, proportional, pixel} from '@astryxdesign/core/Table';
import {Button} from '@astryxdesign/core/Button';
import {TextInput} from '@astryxdesign/core/TextInput';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {useState} from 'react';

interface Todo extends Record<string, unknown> {
  id: number;
  title: string;
  status: 'pending' | 'done';
  createdAt: string;
}

const PAGE_SIZE = 5;

export default function TodoTracker() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, title: 'Design review', status: 'pending', createdAt: '2024-01-15' },
    { id: 2, title: 'Write tests', status: 'done', createdAt: '2024-01-14' },
    { id: 3, title: 'Deploy staging', status: 'pending', createdAt: '2024-01-13' },
    { id: 4, title: 'Update docs', status: 'pending', createdAt: '2024-01-12' },
    { id: 5, title: 'Fix CI', status: 'done', createdAt: '2024-01-11' },
    { id: 6, title: 'Refactor utils', status: 'pending', createdAt: '2024-01-10' },
  ]);
  const [newTodo, setNewTodo] = useState('');
  const [page, setPage] = useState(0);

  const pageData = todos.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const totalPages = Math.ceil(todos.length / PAGE_SIZE);

  const addTodo = () => {
    if (!newTodo.trim()) return;
    setTodos((prev) => [
      ...prev,
      { id: Date.now(), title: newTodo, status: 'pending', createdAt: new Date().toISOString().slice(0, 10) },
    ]);
    setNewTodo('');
  };

  return (
    <VStack gap={4} padding={4}>
      <HStack gap={2} vAlign="end">
        <TextInput label="New todo" value={newTodo} onChange={setNewTodo} placeholder="Enter todo..." />
        <Button label="Add" variant="primary" onClick={addTodo} />
      </HStack>
      <Table<Todo>
        data={pageData}
        idKey="id"
        columns={[
          { key: 'title', header: 'Title', width: proportional(2) },
          { key: 'status', header: 'Status', width: pixel(100) },
          { key: 'createdAt', header: 'Created', width: pixel(120) },
        ]}
        hasHover
        dividers="rows"
      />
      <HStack gap={2} hAlign="center">
        <Button label="Previous" variant="ghost" isDisabled={page === 0} onClick={() => setPage((p) => p - 1)} />
        <Button label="Next" variant="ghost" isDisabled={page >= totalPages - 1} onClick={() => setPage((p) => p + 1)} />
      </HStack>
    </VStack>
  );
}
