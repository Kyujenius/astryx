import {Grid} from '@astryxdesign/core/Grid';
import {Card} from '@astryxdesign/core/Card';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Stack} from '@astryxdesign/core/Stack';

const items = [
  {title: 'Dashboard', desc: 'Real-time analytics and metrics'},
  {title: 'Components', desc: 'Reusable UI building blocks'},
  {title: 'Templates', desc: 'Ready-made page layouts'},
  {title: 'Integrations', desc: 'Third-party service connections'},
];

export default function ResponsiveCards() {
  return (
    <div className="p-4">
      <Grid columns={{minWidth: 260, repeat: 'fill'}} gap={3}>
        {items.map(i => (
          <Card key={i.title}>
            <Stack direction="vertical" gap={2} padding={3}>
              <Heading level={4}>{i.title}</Heading>
              <Text color="secondary">{i.desc}</Text>
            </Stack>
          </Card>
        ))}
      </Grid>
    </div>
  );
}
