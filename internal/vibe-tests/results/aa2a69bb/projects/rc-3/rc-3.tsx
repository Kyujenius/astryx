import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';

const items = [
  {title: 'Analytics Dashboard', description: 'Track your key metrics and KPIs in real-time.'},
  {title: 'Team Collaboration', description: 'Work together with shared projects and real-time editing.'},
  {title: 'Automation Tools', description: 'Automate repetitive tasks and workflows.'},
  {title: 'Security Suite', description: 'Enterprise-grade security with SSO and audit logs.'},
  {title: 'Integration Hub', description: 'Connect with 200+ tools and services.'},
  {title: 'Support Center', description: '24/7 priority support with dedicated account managers.'},
];

export default function ResponsiveCards() {
  return (
    <div className="flex flex-col gap-4 p-6">
      <h2 className="text-xl font-semibold">Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map(item => (
          <Card key={item.title}>
            <CardHeader>
              <CardTitle className="text-lg">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
