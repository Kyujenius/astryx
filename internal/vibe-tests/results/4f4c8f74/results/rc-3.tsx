import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';

const items = [
  {title: 'Analytics', desc: 'Track user engagement and metrics'},
  {title: 'Design System', desc: 'Component library and tokens'},
  {title: 'API Gateway', desc: 'Centralized routing and rate limiting'},
  {title: 'Mobile App', desc: 'Native iOS and Android experience'},
  {title: 'Docs', desc: 'Interactive developer guides'},
  {title: 'CI/CD', desc: 'Automated build and deploy pipeline'},
];

export default function ResponsiveCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {items.map(item => (
        <Card key={item.title}>
          <CardHeader><CardTitle>{item.title}</CardTitle></CardHeader>
          <CardContent><p className="text-sm text-muted-foreground">{item.desc}</p></CardContent>
        </Card>
      ))}
    </div>
  );
}
