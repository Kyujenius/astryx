import {Grid} from '@astryxdesign/core/Grid';
import {Card} from '@astryxdesign/core/Card';
import {VStack} from '@astryxdesign/core/VStack';
import {Text} from '@astryxdesign/core/Text';
import {Heading} from '@astryxdesign/core/Heading';
import {Badge} from '@astryxdesign/core/Badge';

const items = [
  {title: 'Analytics Dashboard', description: 'Real-time metrics and charts for your business', tag: 'Popular'},
  {title: 'User Management', description: 'Invite team members and manage permissions', tag: 'New'},
  {title: 'API Integration', description: 'Connect with third-party services and tools', tag: 'Beta'},
  {title: 'Reports', description: 'Generate and export custom reports', tag: null},
  {title: 'Settings', description: 'Configure your workspace preferences', tag: null},
  {title: 'Billing', description: 'Manage subscriptions and payment methods', tag: null},
];

export default function ResponsiveCards() {
  return (
    <Grid columns={{minWidth: 300, max: 3}} gap={3}>
      {items.map((item) => (
        <Card key={item.title} padding={3}>
          <VStack gap={2}>
            <Heading level={4}>{item.title}</Heading>
            <Text color="secondary">{item.description}</Text>
            {item.tag && <Badge>{item.tag}</Badge>}
          </VStack>
        </Card>
      ))}
    </Grid>
  );
}
