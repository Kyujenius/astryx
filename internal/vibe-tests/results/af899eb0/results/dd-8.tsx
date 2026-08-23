const data = [
  {title: 'Getting Started Guide', type: 'Article', author: 'Alice', date: '2024-01-15'},
  {title: 'Product Launch Video', type: 'Video', author: 'Bob', date: '2024-01-14'},
  {title: 'Brand Guidelines PDF', type: 'Document', author: 'Carol', date: '2024-01-13'},
  {title: 'Q4 Results Podcast', type: 'Audio', author: 'Dan', date: '2024-01-12'},
  {title: 'Hero Banner', type: 'Image', author: 'Eve', date: '2024-01-11'},
  {title: 'API Documentation', type: 'Article', author: 'Frank', date: '2024-01-10'},
];

const typeColors: Record<string, {bg: string; text: string}> = {
  Article: {bg: '#dbeafe', text: '#1e40af'},
  Video: {bg: '#dcfce7', text: '#166534'},
  Document: {bg: '#f3e8ff', text: '#6b21a8'},
  Audio: {bg: '#ffedd5', text: '#9a3412'},
  Image: {bg: '#ccfbf1', text: '#115e59'},
};

export default function ContentLibrary() {
  const cellStyle = {padding: '12px 16px', borderBottom: '1px solid #e0e0e0'};
  return (
    <table style={{width: '100%', borderCollapse: 'collapse'}}>
      <thead>
        <tr style={{borderBottom: '2px solid #e0e0e0'}}>
          <th style={{...cellStyle, textAlign: 'left'}}>Title</th>
          <th style={{...cellStyle, textAlign: 'left'}}>Type</th>
          <th style={{...cellStyle, textAlign: 'left'}}>Author</th>
          <th style={{...cellStyle, textAlign: 'left'}}>Last Modified</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, i) => (
          <tr key={i}>
            <td style={cellStyle}>{item.title}</td>
            <td style={cellStyle}><span style={{padding: '2px 8px', borderRadius: 12, fontSize: 12, fontWeight: 500, backgroundColor: typeColors[item.type].bg, color: typeColors[item.type].text}}>{item.type}</span></td>
            <td style={cellStyle}>{item.author}</td>
            <td style={cellStyle}>{item.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
