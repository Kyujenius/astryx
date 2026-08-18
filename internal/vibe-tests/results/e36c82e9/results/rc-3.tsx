import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const items = [
  { title: 'Analytics', description: 'Track your performance metrics and get insights.' },
  { title: 'Automation', description: 'Set up workflows to save time on repetitive tasks.' },
  { title: 'Security', description: 'Enterprise-grade protection for your data.' },
  { title: 'Integrations', description: 'Connect with hundreds of tools you already use.' },
  { title: 'Collaboration', description: 'Work together with your team in real time.' },
  { title: 'Support', description: '24/7 help from our dedicated support team.' },
];

export default function ResponsiveCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {items.map((item) => (
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
  );
}
