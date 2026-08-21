const items = [
  {title: 'Analytics Dashboard', description: 'Track your metrics and KPIs in real time.'},
  {title: 'Team Management', description: 'Invite members, assign roles, and manage permissions.'},
  {title: 'Reporting', description: 'Generate custom reports with filters and date ranges.'},
  {title: 'Integrations', description: 'Connect with your favorite tools and services.'},
  {title: 'Notifications', description: 'Stay updated with alerts and activity summaries.'},
  {title: 'Settings', description: 'Configure your workspace preferences and billing.'},
];

export default function ResponsiveCards() {
  return (
    <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px', padding: '24px', fontFamily: 'system-ui'}}>
      {items.map(item => (
        <div key={item.title} style={{border: '1px solid #e0e0e0', borderRadius: '8px', padding: '20px'}}>
          <h3 style={{margin: '0 0 8px 0', fontSize: '16px'}}>{item.title}</h3>
          <p style={{margin: 0, color: '#666', fontSize: '14px'}}>{item.description}</p>
        </div>
      ))}
    </div>
  );
}
