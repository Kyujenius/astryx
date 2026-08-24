import {Table} from '@astryxdesign/core/Table';
import {Button} from '@astryxdesign/core/Button';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Badge} from '@astryxdesign/core/Badge';
import {useState} from 'react';

type Todo = {
  id: string;
  title: string;
  status: 'pending' | 'in-progress' | 'done';
  assignee: string;
  createdAt: string;
};

const statusColors = {
  'pending': 'neutral',
  'in-progress': 'warning',
  'done': 'positive',
} as const;

const initialTodos: Todo[] = [
  {id: '1', title: 'Set up CI pipeline', status: 'done', assignee: 'Alice', createdAt: '2024-01-15'},
  {id: '2', title: 'Write unit tests', status: 'in-progress', assignee: 'Bob', createdAt: '2024-01-16'},
  {id: '3', title: 'Deploy to staging', status: 'pending', assignee: 'Charlie', createdAt: '2024-01-17'},
  {id: '4', title: 'Code review', status: 'pending', assignee: 'Alice', createdAt: '2024-01-18'},
  {id: '5', title: 'Update docs', status: 'in-progress', assignee: 'Bob', createdAt: '2024-01-19'},
];

export default function TodoTracker() {
  const [todos, setTodos] = useState(initialTodos);
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
    <div className="flex flex-col gap-4 p-6">
      <div className="flex gap-3 items-end">
        <TextInput label="New todo" value={newTitle} onChange={setNewTitle} placeholder="Enter title" />
        <Button onPress={addTodo}>Add</Button>
      </div>
      <Table
        data={todos}
        columns={[
          {key: 'title', header: 'Title', sortable: true},
          {key: 'status', header: 'Status', render: (row) => (
            <Badge size="sm" color={statusColors[row.status]}>{row.status}</Badge>
          )},
          {key: 'assignee', header: 'Assignee', sortable: true},
          {key: 'createdAt', header: 'Created', sortable: true},
        ]}
        pageSize={10}
        sortable
      />
    </div>
  );
}
