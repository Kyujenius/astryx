import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
      {items.map(item => (
        <Card key={item.title}>
          <CardHeader>
            <CardTitle className="text-base">{item.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
