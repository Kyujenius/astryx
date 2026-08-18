const items = [
  { title: 'Analytics', description: 'Track your performance metrics and get insights.' },
  { title: 'Automation', description: 'Set up workflows to save time on repetitive tasks.' },
  { title: 'Security', description: 'Enterprise-grade protection for your data.' },
  { title: 'Integrations', description: 'Connect with hundreds of tools you already use.' },
  { title: 'Collaboration', description: 'Work together with your team in real time.' },
  { title: 'Support', description: '24/7 help from our dedicated support team.' },
];

export default function ResponsiveCards() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16, padding: 16 }}>
      {items.map((item) => (
        <div key={item.title} style={{ padding: 24, border: '1px solid #eee', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, margin: '0 0 8px' }}>{item.title}</h3>
          <p style={{ color: '#666', margin: 0, lineHeight: 1.5 }}>{item.description}</p>
        </div>
      ))}
    </div>
  );
}
