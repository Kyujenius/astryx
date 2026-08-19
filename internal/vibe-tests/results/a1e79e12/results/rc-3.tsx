import {Card, CardContent, CardHeader, CardTitle} from './components/ui/card';

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
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => (
          <Card key={card.title}>
            <CardHeader><CardTitle className="text-lg">{card.title}</CardTitle></CardHeader>
            <CardContent><p className="text-sm text-muted-foreground">{card.description}</p></CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
