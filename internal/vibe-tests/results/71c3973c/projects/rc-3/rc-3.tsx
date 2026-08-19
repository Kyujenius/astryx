const cards = [
  {title: 'Analytics', description: 'Track your usage and performance metrics.'},
  {title: 'Billing', description: 'Manage your subscription and payment methods.'},
  {title: 'Team', description: 'Invite members and manage roles.'},
  {title: 'Security', description: 'Configure 2FA, SSO, and access controls.'},
  {title: 'Integrations', description: 'Connect third-party services.'},
  {title: 'API Keys', description: 'Generate and manage your API credentials.'},
];

export default function ResponsiveCards() {
  return (
    <div style={{padding: 24}}>
      <h2 style={{fontSize: 24, fontWeight: 700, marginBottom: 16}}>Dashboard</h2>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16}}>
        {cards.map((card) => (<div key={card.title} style={{border: '1px solid #eee', borderRadius: 8, padding: 20}}><h3 style={{fontSize: 18, fontWeight: 600, marginBottom: 8}}>{card.title}</h3><p style={{color: '#666', fontSize: 14, margin: 0}}>{card.description}</p></div>))}
      </div>
    </div>
  );
}
