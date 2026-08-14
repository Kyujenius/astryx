import React from 'react';

const items = [
  {title: 'Analytics Dashboard', desc: 'Real-time metrics and charts', tag: 'Popular'},
  {title: 'User Management', desc: 'Invite members and manage permissions', tag: 'New'},
  {title: 'API Integration', desc: 'Connect with third-party tools', tag: 'Beta'},
  {title: 'Reports', desc: 'Generate and export custom reports', tag: null},
  {title: 'Settings', desc: 'Configure workspace preferences', tag: null},
  {title: 'Billing', desc: 'Manage subscriptions and payments', tag: null},
];

export default function ResponsiveCards() {
  return (
    <div style={{fontFamily: 'system-ui, sans-serif', padding: 24}}>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16}}>
        {items.map((item) => (
          <div key={item.title} style={{border: '1px solid #e0e0e0', borderRadius: 12, padding: 20, display: 'flex', flexDirection: 'column', gap: 8}}>
            <h4 style={{margin: 0, fontSize: 16, fontWeight: 600}}>{item.title}</h4>
            <p style={{margin: 0, color: '#666', fontSize: 14}}>{item.desc}</p>
            {item.tag && (
              <span style={{alignSelf: 'flex-start', background: '#f0f0f0', padding: '2px 8px', borderRadius: 99, fontSize: 12, fontWeight: 500}}>{item.tag}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
