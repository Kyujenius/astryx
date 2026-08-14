import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';

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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {items.map((item) => (
        <Card key={item.title}>
          <CardHeader>
            <CardTitle className="text-lg">{item.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{item.desc}</p>
            {item.tag && <Badge variant="secondary" className="mt-2">{item.tag}</Badge>}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
