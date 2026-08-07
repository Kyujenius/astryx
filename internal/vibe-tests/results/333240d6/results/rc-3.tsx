const cards = [
  {title: 'Analytics', desc: 'Track engagement metrics'},
  {title: 'Design System', desc: 'Reusable component library'},
  {title: 'API Gateway', desc: 'Centralized routing'},
  {title: 'Mobile App', desc: 'Native experience'},
  {title: 'Documentation', desc: 'Developer guides'},
  {title: 'CI/CD', desc: 'Build automation'},
];

export default function ResponsiveCards() {
  return (
    <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16, padding: 16}}>
      {cards.map(c => (
        <div key={c.title} style={{border: '1px solid #e5e7eb', borderRadius: 8, padding: 20}}>
          <h3 style={{margin: '0 0 8px', fontSize: 16, fontWeight: 600}}>{c.title}</h3>
          <p style={{margin: 0, fontSize: 14, color: '#6b7280'}}>{c.desc}</p>
        </div>
      ))}
    </div>
  );
}
