import {Grid} from '@astryxdesign/core/Grid';
import {Card} from '@astryxdesign/core/Card';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Stack} from '@astryxdesign/core/Stack';
import {Badge} from '@astryxdesign/core/Badge';

const cards = [
  {title: 'Analytics Dashboard', desc: 'Track user engagement and conversion metrics in real-time.', tag: 'Active'},
  {title: 'Design System', desc: 'Component library and design tokens for consistent UI.', tag: 'In Progress'},
  {title: 'API Gateway', desc: 'Centralized request routing and rate limiting service.', tag: 'Active'},
  {title: 'Mobile App', desc: 'Native mobile experience for iOS and Android platforms.', tag: 'Planning'},
  {title: 'Documentation', desc: 'Interactive guides and API reference for developers.', tag: 'Active'},
  {title: 'CI Pipeline', desc: 'Automated testing and deployment infrastructure.', tag: 'Active'},
];

export default function ResponsiveCards() {
  return (
    <Grid columns={{minWidth: 280, repeat: 'fill'}} gap={3}>
      {cards.map(card => (
        <Card key={card.title}>
          <Stack direction="vertical" gap={2} padding={3}>
            <Stack direction="horizontal" gap={2} hAlign="between" vAlign="center">
              <Heading level={4}>{card.title}</Heading>
              <Badge label={card.tag} variant="info" />
            </Stack>
            <Text color="secondary">{card.desc}</Text>
          </Stack>
        </Card>
      ))}
    </Grid>
  );
}
