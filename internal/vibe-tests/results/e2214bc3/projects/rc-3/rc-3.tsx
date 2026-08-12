export default function ResponsiveCards() {
  const items = [
    {title: 'Analytics Dashboard', description: 'Track key metrics and KPIs in real time.'},
    {title: 'User Management', description: 'Add, remove, and manage team members.'},
    {title: 'Billing', description: 'View invoices and manage payment methods.'},
    {title: 'Integrations', description: 'Connect with third-party tools and services.'},
  ];

  return (
    <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16, padding: 16, fontFamily: 'system-ui'}}>
      {items.map((item) => (
        <div key={item.title} style={{padding: 20, border: '1px solid #e5e7eb', borderRadius: 12}}>
          <h3 style={{margin: '0 0 8px'}}>{item.title}</h3>
          <p style={{margin: 0, color: '#6b7280', fontSize: 14}}>{item.description}</p>
        </div>
      ))}
    </div>
  );
}
