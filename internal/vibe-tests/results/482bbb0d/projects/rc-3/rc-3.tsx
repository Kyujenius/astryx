import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';

const ITEMS = [
  {title: 'Design', description: 'Create beautiful interfaces with consistent patterns.'},
  {title: 'Develop', description: 'Build accessible components with type-safe props.'},
  {title: 'Deploy', description: 'Ship production-ready features with confidence.'},
];

export default function ResponsiveCards() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Our Process</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {ITEMS.map((item) => (
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
    </div>
  );
}
