import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';

const items = [
  {title: 'Analytics', description: 'View your traffic and engagement metrics'},
  {title: 'Settings', description: 'Manage account preferences and notifications'},
  {title: 'Billing', description: 'Review invoices and payment methods'},
  {title: 'Team', description: 'Invite members and manage roles'},
];

export default function ResponsiveCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <Card key={item.title}>
          <CardHeader>
            <CardTitle>{item.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{item.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
