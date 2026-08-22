import {useState} from 'react';

interface Todo {
  id: number;
  title: string;
  status: 'pending' | 'done';
  dueDate: string;
}

const todos: Todo[] = Array.from({length: 75}, (_, i) => ({
  id: i + 1,
  title: `Task ${i + 1}`,
  status: i % 3 === 0 ? 'done' : 'pending',
  dueDate: `2026-09-${String((i % 28) + 1).padStart(2, '0')}`,
}));

export default function TodoTracker() {
  const [page, setPage] = useState(1);
  const pageSize = 25;
  const totalPages = Math.ceil(todos.length / pageSize);
  const pageData = todos.slice((page - 1) * pageSize, page * pageSize);

  const cellStyle = {padding: '8px 12px', borderBottom: '1px solid #eee', textAlign: 'left' as const};

  return (
    <div style={{fontFamily: 'sans-serif'}}>
      <h2 style={{marginBottom: 16}}>TodoTracker</h2>
      <table style={{width: '100%', borderCollapse: 'collapse'}}>
        <thead>
          <tr style={{background: '#f5f5f5'}}>
            <th style={cellStyle}>ID</th>
            <th style={cellStyle}>Title</th>
            <th style={cellStyle}>Status</th>
            <th style={cellStyle}>Due Date</th>
          </tr>
        </thead>
        <tbody>
          {pageData.map((todo) => (
            <tr key={todo.id}>
              <td style={cellStyle}>{todo.id}</td>
              <td style={cellStyle}>{todo.title}</td>
              <td style={cellStyle}>
                <span style={{padding: '2px 8px', borderRadius: 12, fontSize: 12, background: todo.status === 'done' ? '#d4edda' : '#e2e3e5'}}>
                  {todo.status}
                </span>
              </td>
              <td style={cellStyle}>{todo.dueDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16}}>
        <span style={{fontSize: 14, color: '#666'}}>Page {page} of {totalPages}</span>
        <div style={{display: 'flex', gap: 8}}>
          <button disabled={page === 1} onClick={() => setPage(page - 1)} style={{padding: '6px 12px', cursor: page === 1 ? 'not-allowed' : 'pointer'}}>Previous</button>
          <button disabled={page === totalPages} onClick={() => setPage(page + 1)} style={{padding: '6px 12px', cursor: page === totalPages ? 'not-allowed' : 'pointer'}}>Next</button>
        </div>
      </div>
    </div>
  );
}
