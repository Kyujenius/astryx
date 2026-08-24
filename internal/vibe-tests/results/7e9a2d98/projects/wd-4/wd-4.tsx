import {Table} from '@astryxdesign/core/Table';
import {Button} from '@astryxdesign/core/Button';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Badge} from '@astryxdesign/core/Badge';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {useState} from 'react';

type Todo = {
  id: string;
  title: string;
  status: 'pending' | 'in-progress' | 'done';
  assignee: string;
  createdAt: string;
};

const initialTodos: Todo[] = [
  {id: '1', title: 'Set up CI pipeline', status: 'done', assignee: 'Alice', createdAt: '2024-01-15'},
  {id: '2', title: 'Write unit tests', status: 'in-progress', assignee: 'Bob', createdAt: '2024-01-16'},
  {id: '3', title: 'Deploy to staging', status: 'pending', assignee: 'Charlie', createdAt: '2024-01-17'},
  {id: '4', title: 'Code review', status: 'pending', assignee: 'Alice', createdAt: '2024-01-18'},
  {id: '5', title: 'Update documentation', status: 'in-progress', assignee: 'Bob', createdAt: '2024-01-19'},
];

const statusColors = {
  'pending': 'neutral',
  'in-progress': 'warning',
  'done': 'positive',
} as const;

export default function TodoTracker() {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [newTitle, setNewTitle] = useState('');

  const addTodo = () => {
    if (!newTitle.trim()) return;
    setTodos(prev => [...prev, {
      id: String(Date.now()),
      title: newTitle,
      status: 'pending',
      assignee: 'Unassigned',
      createdAt: new Date().toISOString().split('T')[0],
    }]);
    setNewTitle('');
  };

  return (
    <VStack gap="md">
      <HStack gap="sm" align="end">
        <TextInput
          label="New todo"
          value={newTitle}
          onChange={setNewTitle}
          placeholder="Enter todo title"
        />
        <Button onPress={addTodo}>Add</Button>
      </HStack>

      <Table
        data={todos}
        columns={[
          {key: 'title', header: 'Title', sortable: true},
          {key: 'status', header: 'Status', render: (row) => (
            <Badge color={statusColors[row.status]}>{row.status}</Badge>
          )},
          {key: 'assignee', header: 'Assignee', sortable: true},
          {key: 'createdAt', header: 'Created', sortable: true},
        ]}
        pageSize={10}
        sortable
      />
    </VStack>
  );
}
