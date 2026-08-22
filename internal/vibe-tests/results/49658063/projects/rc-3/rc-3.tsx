import {Card} from '@astryxdesign/core/Card';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';

const items = [
  {title: 'Analytics', description: 'View your traffic and engagement metrics'},
  {title: 'Settings', description: 'Manage account preferences and notifications'},
  {title: 'Billing', description: 'Review invoices and payment methods'},
  {title: 'Team', description: 'Invite members and manage roles'},
];

export default function ResponsiveCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <Card key={item.title} padding={4}>
          <div className="flex flex-col gap-2">
            <Heading level={3}>{item.title}</Heading>
            <Text color="secondary">{item.description}</Text>
          </div>
        </Card>
      ))}
    </div>
  );
}
