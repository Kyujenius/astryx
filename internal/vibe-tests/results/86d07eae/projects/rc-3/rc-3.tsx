const ITEMS = [
  {title: 'Design', description: 'Create beautiful interfaces with consistent patterns.'},
  {title: 'Develop', description: 'Build accessible components with type-safe props.'},
  {title: 'Deploy', description: 'Ship production-ready features with confidence.'},
];

export default function ResponsiveCards() {
  return (
    <div style={{padding: 24}}>
      <h2 style={{fontSize: 24, fontWeight: 700, marginBottom: 16}}>Our Process</h2>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16}}>
        {ITEMS.map((item) => (
          <div key={item.title} style={{border: '1px solid #e0e0e0', borderRadius: 8, padding: 24}}>
            <h3 style={{fontSize: 18, fontWeight: 600, margin: '0 0 8px'}}>{item.title}</h3>
            <p style={{color: '#666', margin: 0}}>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
