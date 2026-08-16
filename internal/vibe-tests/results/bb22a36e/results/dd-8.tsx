const data = [
  {id: '1', title: 'Getting Started with React 19', type: 'Article', author: 'Jane Chen', date: '2026-08-10'},
  {id: '2', title: 'Design Systems at Scale', type: 'Video', author: 'Alex Rivera', date: '2026-08-08'},
  {id: '3', title: 'Weekly Frontend Digest', type: 'Newsletter', author: 'Sam Patel', date: '2026-08-07'},
  {id: '4', title: 'A11y Deep Dive', type: 'Podcast', author: 'Kim Lau', date: '2026-08-05'},
  {id: '5', title: 'Component Architecture', type: 'Webinar', author: 'Chris Moreau', date: '2026-08-01'},
];

const typeColors: Record<string, {bg: string; color: string}> = {
  Article: {bg: '#dbeafe', color: '#1e40af'},
  Video: {bg: '#ede9fe', color: '#5b21b6'},
  Podcast: {bg: '#ffedd5', color: '#9a3412'},
  Newsletter: {bg: '#dcfce7', color: '#166534'},
  Webinar: {bg: '#ccfbf1', color: '#115e59'},
};

export default function ContentLibrary() {
  return (
    <table style={{width: '100%', borderCollapse: 'collapse'}}>
      <thead>
        <tr style={{borderBottom: '2px solid #e5e7eb'}}>
          <th style={{textAlign: 'left', padding: '12px 8px'}}>Title</th>
          <th style={{textAlign: 'left', padding: '12px 8px'}}>Type</th>
          <th style={{textAlign: 'left', padding: '12px 8px'}}>Author</th>
          <th style={{textAlign: 'left', padding: '12px 8px'}}>Date</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id} style={{borderBottom: '1px solid #e5e7eb'}}>
            <td style={{padding: '12px 8px'}}>{item.title}</td>
            <td style={{padding: '12px 8px'}}>
              <span style={{fontSize: 12, padding: '2px 10px', borderRadius: 12, background: typeColors[item.type].bg, color: typeColors[item.type].color}}>
                {item.type}
              </span>
            </td>
            <td style={{padding: '12px 8px'}}>{item.author}</td>
            <td style={{padding: '12px 8px'}}>{item.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
