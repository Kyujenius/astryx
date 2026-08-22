import {Card} from '@astryxdesign/core/Card';
import {Grid} from '@astryxdesign/core/Grid';
import {Stack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import {Heading} from '@astryxdesign/core/Heading';

const items = [
  {title: 'Analytics', description: 'View your traffic and engagement metrics'},
  {title: 'Settings', description: 'Manage account preferences and notifications'},
  {title: 'Billing', description: 'Review invoices and payment methods'},
  {title: 'Team', description: 'Invite members and manage roles'},
];

export default function ResponsiveCards() {
  return (
    <Grid columns={{minWidth: 280, repeat: 'fill'}} gap={4}>
      {items.map((item) => (
        <Card key={item.title} padding={4}>
          <Stack gap={2}>
            <Heading level={3}>{item.title}</Heading>
            <Text color="secondary">{item.description}</Text>
          </Stack>
        </Card>
      ))}
    </Grid>
  );
}
