interface ContentItem {
  id: string; title: string; type: string; author: string; date: string; status: string;
}

const TYPE_COLORS: Record<string, string> = {
  Article: '#dbeafe', Video: '#ede9fe', Podcast: '#ffedd5', Infographic: '#dcfce7',
};
const TYPE_TEXT: Record<string, string> = {
  Article: '#1e40af', Video: '#6b21a8', Podcast: '#c2410c', Infographic: '#166534',
};

export default function ContentLibrary({items}: {items: ContentItem[]}) {
  return (
    <div style={{padding: 24}}>
      <table style={{width: '100%', borderCollapse: 'collapse'}}>
        <thead>
          <tr style={{borderBottom: '2px solid #e0e0e0'}}>
            <th style={{textAlign: 'left', padding: 8}}>Title</th>
            <th style={{textAlign: 'left', padding: 8}}>Type</th>
            <th style={{textAlign: 'left', padding: 8}}>Author</th>
            <th style={{textAlign: 'left', padding: 8}}>Date</th>
            <th style={{textAlign: 'left', padding: 8}}>Status</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} style={{borderBottom: '1px solid #f0f0f0'}}>
              <td style={{padding: 8}}>{item.title}</td>
              <td style={{padding: 8}}>
                <span style={{
                  padding: '2px 8px', borderRadius: 12, fontSize: 12, fontWeight: 500,
                  backgroundColor: TYPE_COLORS[item.type] || '#f0f0f0',
                  color: TYPE_TEXT[item.type] || '#333',
                }}>{item.type}</span>
              </td>
              <td style={{padding: 8}}>{item.author}</td>
              <td style={{padding: 8}}>{item.date}</td>
              <td style={{padding: 8}}>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
