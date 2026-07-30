import {Card, CardContent, CardHeader, CardTitle, CardDescription} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';

const CARDS = [
  {id: 1, title: 'Getting Started', description: 'Learn the basics.', image: 'https://picsum.photos/seed/1/400/200', category: 'Tutorial'},
  {id: 2, title: 'Advanced Patterns', description: 'Component composition.', image: 'https://picsum.photos/seed/2/400/200', category: 'Guide'},
  {id: 3, title: 'Performance Tips', description: 'Optimize your app.', image: 'https://picsum.photos/seed/3/400/200', category: 'Best Practice'},
  {id: 4, title: 'Accessibility', description: 'Inclusive experiences.', image: 'https://picsum.photos/seed/4/400/200', category: 'Guide'},
];

export default function ResponsiveCardGrid() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Resources</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {CARDS.map((card) => (
          <Card key={card.id}>
            <img src={card.image} alt={card.title} className="w-full h-40 object-cover rounded-t-lg" />
            <CardHeader>
              <Badge className="w-fit">{card.category}</Badge>
              <CardTitle>{card.title}</CardTitle>
              <CardDescription>{card.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
