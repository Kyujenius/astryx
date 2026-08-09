// Copyright (c) Meta Platforms, Inc. and affiliates.

const items = [
  {title: 'Analytics', description: 'Track performance metrics and engagement.'},
  {title: 'Reports', description: 'Generate detailed reports for stakeholders.'},
  {title: 'Settings', description: 'Configure workspace preferences.'},
  {title: 'Team', description: 'Manage team members and permissions.'},
  {title: 'Billing', description: 'View invoices and manage subscriptions.'},
  {title: 'Support', description: 'Get help or browse the knowledge base.'},
];

export default function ResponsiveCards() {
  return (
    <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16, padding: 16, fontFamily: 'system-ui'}}>
      {items.map((item) => (
        <div key={item.title} style={{padding: 20, border: '1px solid #e5e7eb', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)'}}>
          <h3 style={{marginTop: 0, fontSize: 18}}>{item.title}</h3>
          <p style={{color: '#666', margin: 0}}>{item.description}</p>
        </div>
      ))}
    </div>
  );
}
