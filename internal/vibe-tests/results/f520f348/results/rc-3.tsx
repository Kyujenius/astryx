// Copyright (c) Meta Platforms, Inc. and affiliates.

const items = [
  {title: 'Analytics', description: 'Track user behavior and engagement metrics.'},
  {title: 'Security', description: 'End-to-end encryption and access controls.'},
  {title: 'Integrations', description: 'Connect with 200+ services.'},
  {title: 'Collaboration', description: 'Real-time editing with version history.'},
  {title: 'Automation', description: 'Build workflows that trigger on events.'},
  {title: 'Support', description: '24/7 support for enterprise plans.'},
];

export default function ResponsiveCards() {
  return (
    <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, padding: 16}}>
      {items.map(item => (
        <div key={item.title} style={{border: '1px solid #e5e7eb', borderRadius: 8, padding: 20, background: 'white'}}>
          <h3 style={{fontSize: 18, fontWeight: 600, marginBottom: 8}}>{item.title}</h3>
          <p style={{fontSize: 14, color: '#6b7280', margin: 0}}>{item.description}</p>
        </div>
      ))}
    </div>
  );
}
