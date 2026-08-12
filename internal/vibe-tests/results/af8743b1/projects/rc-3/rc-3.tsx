import {Card} from '@astryxdesign/core/Card';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: 16,
  },
});

const items = [
  {title: 'Analytics Dashboard', description: 'Track key metrics and KPIs in real time.'},
  {title: 'User Management', description: 'Add, remove, and manage team members.'},
  {title: 'Billing', description: 'View invoices and manage payment methods.'},
  {title: 'Integrations', description: 'Connect with third-party tools and services.'},
];

export default function ResponsiveCards() {
  return (
    <div {...stylex.props(styles.grid)}>
      {items.map((item) => (
        <Card key={item.title} padding={4}>
          <Heading level={3}>{item.title}</Heading>
          <Text type="supporting" color="secondary" as="p" display="block">{item.description}</Text>
        </Card>
      ))}
    </div>
  );
}
