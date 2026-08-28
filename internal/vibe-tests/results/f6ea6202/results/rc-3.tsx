import {Card} from '@astryxdesign/core/Card';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';

const items = [
  {title: 'Analytics Dashboard', description: 'Track your key metrics and KPIs in real-time.'},
  {title: 'Team Collaboration', description: 'Work together with shared projects and real-time editing.'},
  {title: 'Automation Tools', description: 'Automate repetitive tasks and workflows.'},
  {title: 'Security Suite', description: 'Enterprise-grade security with SSO and audit logs.'},
  {title: 'Integration Hub', description: 'Connect with 200+ tools and services.'},
  {title: 'Support Center', description: '24/7 priority support with dedicated account managers.'},
];

export default function ResponsiveCards() {
  return (
    <div className="flex flex-col gap-4 p-6">
      <Heading level={2}>Features</Heading>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map(item => (
          <Card key={item.title} padding={4}>
            <div className="flex flex-col gap-2">
              <Heading level={3}>{item.title}</Heading>
              <Text color="secondary">{item.description}</Text>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
