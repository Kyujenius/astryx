import React from 'react';

const items = [
  {title: 'Analytics Dashboard', description: 'Track your key metrics in real-time.'},
  {title: 'Team Collaboration', description: 'Work together with shared projects.'},
  {title: 'Automation Tools', description: 'Automate repetitive workflows.'},
  {title: 'Security Suite', description: 'Enterprise-grade SSO and audit logs.'},
  {title: 'Integration Hub', description: 'Connect with 200+ tools.'},
  {title: 'Support Center', description: '24/7 priority support.'},
];

export default function ResponsiveCards() {
  return (
    <div style={{padding: 24, fontFamily: 'system-ui'}}>
      <h2 style={{fontSize: 20, fontWeight: 600, marginBottom: 16}}>Features</h2>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16}}>
        {items.map(item => (
          <div key={item.title} style={{border: '1px solid #e5e5e5', borderRadius: 12, padding: 20}}>
            <h3 style={{margin: '0 0 8px', fontSize: 16, fontWeight: 600}}>{item.title}</h3>
            <p style={{margin: 0, color: '#666', fontSize: 14}}>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
