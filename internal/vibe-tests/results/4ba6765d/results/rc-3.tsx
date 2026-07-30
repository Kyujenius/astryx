import {Card} from '@astryxdesign/core/Card';
import {Grid} from '@astryxdesign/core/Grid';
import {Stack} from '@astryxdesign/core/Stack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Thumbnail} from '@astryxdesign/core/Thumbnail';
import {Badge} from '@astryxdesign/core/Badge';

interface CardData {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
}

const CARDS: CardData[] = [
  {
    id: 1,
    title: 'Getting Started',
    description: 'Learn the basics of our platform and set up your first project.',
    image: 'https://picsum.photos/seed/1/400/200',
    category: 'Tutorial',
  },
  {
    id: 2,
    title: 'Advanced Patterns',
    description: 'Deep dive into component composition and state management.',
    image: 'https://picsum.photos/seed/2/400/200',
    category: 'Guide',
  },
  {
    id: 3,
    title: 'Performance Tips',
    description: 'Optimize your app for speed and responsiveness.',
    image: 'https://picsum.photos/seed/3/400/200',
    category: 'Best Practice',
  },
  {
    id: 4,
    title: 'Accessibility',
    description: 'Build inclusive experiences that work for everyone.',
    image: 'https://picsum.photos/seed/4/400/200',
    category: 'Guide',
  },
];

export default function ResponsiveCardGrid() {
  return (
    <Stack gap={4}>
      <Heading level={2}>Resources</Heading>
      <Grid columns={{minWidth: 300}}>
        {CARDS.map((card) => (
          <Card key={card.id}>
            <Stack gap={3}>
              <Thumbnail src={card.image} alt={card.title} />
              <Badge label={card.category} variant="info" />
              <Heading level={3}>{card.title}</Heading>
              <Text type="body">{card.description}</Text>
            </Stack>
          </Card>
        ))}
      </Grid>
    </Stack>
  );
}
