const typeColors: Record<string, {bg: string; text: string}> = {
  Article: {bg: '#dbeafe', text: '#1e40af'},
  Video: {bg: '#f3e8ff', text: '#6b21a8'},
  Podcast: {bg: '#ffedd5', text: '#9a3412'},
  Newsletter: {bg: '#dcfce7', text: '#166534'},
  Course: {bg: '#ccfbf1', text: '#115e59'},
};

const data = [
  {id: '1', title: 'Getting Started with React', type: 'Article', author: 'Jane', date: '2024-03-01'},
  {id: '2', title: 'Advanced TypeScript Patterns', type: 'Video', author: 'Alex', date: '2024-03-05'},
  {id: '3', title: 'Design Systems Weekly', type: 'Podcast', author: 'Sam', date: '2024-03-10'},
  {id: '4', title: 'March Updates', type: 'Newsletter', author: 'Team', date: '2024-03-15'},
  {id: '5', title: 'Build a Component Library', type: 'Course', author: 'Chris', date: '2024-03-20'},
];

export default function ContentLibrary() {
  const cellStyle = {padding: '10px 12px', borderBottom: '1px solid #e5e7eb', textAlign: 'left' as const};

  return (
    <div style={{padding: 16, fontFamily: 'system-ui'}}>
      <h2 style={{fontSize: 20, fontWeight: 700, marginBottom: 16}}>Content Library</h2>
      <table style={{width: '100%', borderCollapse: 'collapse'}}>
        <thead>
          <tr style={{background: '#f9fafb'}}>
            <th style={cellStyle}>Title</th>
            <th style={cellStyle}>Type</th>
            <th style={cellStyle}>Author</th>
            <th style={cellStyle}>Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td style={cellStyle}>{item.title}</td>
              <td style={cellStyle}>
                <span style={{padding: '2px 8px', borderRadius: 12, fontSize: 12, fontWeight: 500, background: typeColors[item.type].bg, color: typeColors[item.type].text}}>{item.type}</span>
              </td>
              <td style={cellStyle}>{item.author}</td>
              <td style={cellStyle}>{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
