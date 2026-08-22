const items = [
  {title: 'Analytics', description: 'View your traffic and engagement metrics'},
  {title: 'Settings', description: 'Manage account preferences and notifications'},
  {title: 'Billing', description: 'Review invoices and payment methods'},
  {title: 'Team', description: 'Invite members and manage roles'},
];

export default function ResponsiveCards() {
  return (
    <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16}}>
      {items.map((item) => (
        <div key={item.title} style={{padding: 16, border: '1px solid #e0e0e0', borderRadius: 8}}>
          <h3 style={{margin: '0 0 8px', fontSize: 18, fontWeight: 600}}>{item.title}</h3>
          <p style={{margin: 0, color: '#666', fontSize: 14}}>{item.description}</p>
        </div>
      ))}
    </div>
  );
}
