import { useState } from 'react';

interface Todo {
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
    setTodos((prev) => [...prev, { id: Date.now(), title: newTodo, status: 'pending', createdAt: new Date().toISOString().slice(0, 10) }]);
    setNewTodo('');
  };

  return (
    <div style={{ maxWidth: 600, padding: 16 }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter todo..."
          aria-label="New todo"
          style={{ flex: 1, padding: '8px 12px', border: '1px solid #ccc', borderRadius: 4 }}
        />
        <button onClick={addTodo} style={{ padding: '8px 16px', background: '#0066cc', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' }}>Add</button>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #ddd' }}>
            <th style={{ textAlign: 'left', padding: 8 }}>Title</th>
            <th style={{ textAlign: 'left', padding: 8, width: 100 }}>Status</th>
            <th style={{ textAlign: 'left', padding: 8, width: 120 }}>Created</th>
          </tr>
        </thead>
        <tbody>
          {pageData.map((todo) => (
            <tr key={todo.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: 8 }}>{todo.title}</td>
              <td style={{ padding: 8 }}>
                <span style={{ padding: '2px 8px', borderRadius: 12, fontSize: 12, background: todo.status === 'done' ? '#d4edda' : '#fff3cd', color: todo.status === 'done' ? '#155724' : '#856404' }}>
                  {todo.status}
                </span>
              </td>
              <td style={{ padding: 8, fontSize: 14, color: '#666' }}>{todo.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 16 }}>
        <button disabled={page === 0} onClick={() => setPage((p) => p - 1)} style={{ padding: '6px 12px', border: '1px solid #ccc', borderRadius: 4, cursor: page === 0 ? 'not-allowed' : 'pointer', opacity: page === 0 ? 0.5 : 1 }}>Previous</button>
        <button disabled={page >= totalPages - 1} onClick={() => setPage((p) => p + 1)} style={{ padding: '6px 12px', border: '1px solid #ccc', borderRadius: 4, cursor: page >= totalPages - 1 ? 'not-allowed' : 'pointer', opacity: page >= totalPages - 1 ? 0.5 : 1 }}>Next</button>
      </div>
    </div>
  );
}
