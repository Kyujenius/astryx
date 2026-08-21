import {Card} from '@astryxdesign/core/Card';
import {Text} from '@astryxdesign/core/Text';
import {Heading} from '@astryxdesign/core/Heading';

const items = [
  {title: 'Analytics Dashboard', description: 'Track your metrics and KPIs in real time.'},
  {title: 'Team Management', description: 'Invite members, assign roles, and manage permissions.'},
  {title: 'Reporting', description: 'Generate custom reports with filters and date ranges.'},
  {title: 'Integrations', description: 'Connect with your favorite tools and services.'},
  {title: 'Notifications', description: 'Stay updated with alerts and activity summaries.'},
  {title: 'Settings', description: 'Configure your workspace preferences and billing.'},
];

export default function ResponsiveCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
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
