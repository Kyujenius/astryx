const typeColors: Record<string, string> = {
  Article: '#dbeafe',
  Video: '#d1fae5',
  Podcast: '#fef3c7',
  Infographic: '#ede9fe',
};

const data = [
  {title: 'Getting Started with React', type: 'Article', author: 'Jane', published: '2024-03-01', views: 1520},
  {title: 'Advanced CSS Techniques', type: 'Video', author: 'Mike', published: '2024-03-05', views: 890},
  {title: 'Design Systems in Practice', type: 'Podcast', author: 'Sarah', published: '2024-03-10', views: 2100},
  {title: 'Data Visualization Guide', type: 'Infographic', author: 'Tom', published: '2024-03-15', views: 650},
  {title: 'TypeScript Best Practices', type: 'Article', author: 'Jane', published: '2024-03-20', views: 3200},
];

export default function ContentLibrary() {
  return (
    <table style={{width: '100%', borderCollapse: 'collapse', fontFamily: 'system-ui', fontSize: '14px'}}>
      <thead>
        <tr style={{borderBottom: '2px solid #e2e8f0'}}>
          <th style={{textAlign: 'left', padding: '10px'}}>Title</th>
          <th style={{textAlign: 'left', padding: '10px'}}>Type</th>
          <th style={{textAlign: 'left', padding: '10px'}}>Author</th>
          <th style={{textAlign: 'left', padding: '10px'}}>Published</th>
          <th style={{textAlign: 'left', padding: '10px'}}>Views</th>
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item.title} style={{borderBottom: '1px solid #e2e8f0'}}>
            <td style={{padding: '10px'}}>{item.title}</td>
            <td style={{padding: '10px'}}><span style={{padding: '2px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 500, background: typeColors[item.type]}}>{item.type}</span></td>
            <td style={{padding: '10px'}}>{item.author}</td>
            <td style={{padding: '10px'}}>{item.published}</td>
            <td style={{padding: '10px'}}>{item.views.toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
