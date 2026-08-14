import {Card} from '@astryxdesign/core/Card';
import {VStack} from '@astryxdesign/core/VStack';
import {Text} from '@astryxdesign/core/Text';
import {Heading} from '@astryxdesign/core/Heading';
import {Badge} from '@astryxdesign/core/Badge';

const items = [
  {title: 'Analytics Dashboard', desc: 'Real-time metrics and charts', tag: 'Popular'},
  {title: 'User Management', desc: 'Invite members and manage permissions', tag: 'New'},
  {title: 'API Integration', desc: 'Connect with third-party tools', tag: 'Beta'},
  {title: 'Reports', desc: 'Generate and export custom reports', tag: null},
  {title: 'Settings', desc: 'Configure workspace preferences', tag: null},
  {title: 'Billing', desc: 'Manage subscriptions and payments', tag: null},
];

export default function ResponsiveCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {items.map((item) => (
        <Card key={item.title} padding={3}>
          <VStack gap={2}>
            <Heading level={4}>{item.title}</Heading>
            <Text color="secondary">{item.desc}</Text>
            {item.tag && <Badge>{item.tag}</Badge>}
          </VStack>
        </Card>
      ))}
    </div>
  );
}
