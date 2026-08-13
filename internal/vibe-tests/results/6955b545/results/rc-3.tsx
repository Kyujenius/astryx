import {Card} from '@astryxdesign/core/Card';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';

const items = [
  {title: 'Analytics Dashboard', description: 'Track key metrics and KPIs in real time.'},
  {title: 'User Management', description: 'Add, remove, and manage team members.'},
  {title: 'Billing', description: 'View invoices and manage payment methods.'},
  {title: 'Integrations', description: 'Connect with third-party tools and services.'},
];

export default function ResponsiveCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {items.map((item) => (
        <Card key={item.title} padding={4}>
          <Heading level={3}>{item.title}</Heading>
          <Text type="supporting" color="secondary" as="p" display="block">{item.description}</Text>
        </Card>
      ))}
    </div>
  );
}
