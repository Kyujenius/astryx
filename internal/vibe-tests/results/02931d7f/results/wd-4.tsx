import {useState} from 'react';

interface Todo {
  id: number;
  title: string;
  status: 'pending' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  assignee: string;
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

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  const statusColors: Record<string, string> = {pending: '#fef3c7', 'in-progress': '#dbeafe', done: '#dcfce7'};
  const priorityColors: Record<string, string> = {low: '#f3f4f6', medium: '#fef3c7', high: '#fee2e2'};

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '16px', padding: '16px'}}>
      <h1 style={{fontSize: '24px', fontWeight: 700}}>TodoTracker</h1>
      <div style={{display: 'flex', gap: '12px', alignItems: 'center'}}>
        <input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Filter tasks..."
          style={{padding: '8px 12px', borderRadius: '6px', border: '1px solid #d1d5db', flex: 1, maxWidth: '300px'}}
        />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={{padding: '8px 12px', borderRadius: '6px', border: '1px solid #d1d5db'}}>
          <option value="">All statuses</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <button style={{padding: '8px 16px', borderRadius: '6px', backgroundColor: '#3b82f6', color: 'white', border: 'none', cursor: 'pointer'}}>New todo</button>
      </div>
      <div style={{border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden'}}>
        <table style={{width: '100%', borderCollapse: 'collapse'}}>
          <thead>
            <tr style={{backgroundColor: '#f9fafb'}}>
              <th style={{padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb', width: '60px'}}>ID</th>
              <th style={{padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb'}}>Title</th>
              <th style={{padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb'}}>Status</th>
              <th style={{padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb'}}>Priority</th>
              <th style={{padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb'}}>Assignee</th>
            </tr>
          </thead>
          <tbody>
            {paged.map(todo => (
              <tr key={todo.id} style={{borderBottom: '1px solid #e5e7eb'}}>
                <td style={{padding: '12px'}}>{todo.id}</td>
                <td style={{padding: '12px'}}>{todo.title}</td>
                <td style={{padding: '12px'}}><span style={{padding: '2px 8px', borderRadius: '12px', fontSize: '12px', backgroundColor: statusColors[todo.status]}}>{todo.status}</span></td>
                <td style={{padding: '12px'}}><span style={{padding: '2px 8px', borderRadius: '12px', fontSize: '12px', backgroundColor: priorityColors[todo.priority]}}>{todo.priority}</span></td>
                <td style={{padding: '12px'}}>{todo.assignee}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <span style={{fontSize: '14px', color: '#6b7280'}}>Page {page} of {totalPages}</span>
        <div style={{display: 'flex', gap: '8px'}}>
          <button disabled={page <= 1} onClick={() => setPage(p => p - 1)} style={{padding: '6px 12px', borderRadius: '6px', border: '1px solid #d1d5db', backgroundColor: 'white', cursor: page <= 1 ? 'not-allowed' : 'pointer', opacity: page <= 1 ? 0.5 : 1}}>Previous</button>
          <button disabled={page >= totalPages} onClick={() => setPage(p => p + 1)} style={{padding: '6px 12px', borderRadius: '6px', border: '1px solid #d1d5db', backgroundColor: 'white', cursor: page >= totalPages ? 'not-allowed' : 'pointer', opacity: page >= totalPages ? 0.5 : 1}}>Next</button>
        </div>
      </div>
    </div>
  );
}
