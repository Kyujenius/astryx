import {useState} from 'react';

type Todo = {id: string; title: string; status: 'pending' | 'in-progress' | 'done'; assignee: string; createdAt: string};

const statusColors = {pending: '#e2e8f0', 'in-progress': '#fef3c7', done: '#d1fae5'};

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
    setTodos(prev => [...prev, {id: String(Date.now()), title: newTitle, status: 'pending', assignee: 'Unassigned', createdAt: new Date().toISOString().split('T')[0]}]);
    setNewTitle('');
  };

  return (
    <div style={{padding: '24px', fontFamily: 'system-ui'}}>
      <div style={{display: 'flex', gap: '8px', marginBottom: '16px'}}>
        <input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="New todo" style={{flex: 1, padding: '8px 12px', border: '1px solid #ccc', borderRadius: '6px'}} />
        <button onClick={addTodo} style={{padding: '8px 16px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer'}}>Add</button>
      </div>
      <table style={{width: '100%', borderCollapse: 'collapse'}}>
        <thead>
          <tr style={{borderBottom: '2px solid #e2e8f0'}}>
            <th style={{textAlign: 'left', padding: '8px'}}>Title</th>
            <th style={{textAlign: 'left', padding: '8px'}}>Status</th>
            <th style={{textAlign: 'left', padding: '8px'}}>Assignee</th>
            <th style={{textAlign: 'left', padding: '8px'}}>Created</th>
          </tr>
        </thead>
        <tbody>
          {todos.map(todo => (
            <tr key={todo.id} style={{borderBottom: '1px solid #e2e8f0'}}>
              <td style={{padding: '8px'}}>{todo.title}</td>
              <td style={{padding: '8px'}}><span style={{padding: '2px 8px', borderRadius: '12px', fontSize: '12px', background: statusColors[todo.status]}}>{todo.status}</span></td>
              <td style={{padding: '8px'}}>{todo.assignee}</td>
              <td style={{padding: '8px'}}>{todo.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
