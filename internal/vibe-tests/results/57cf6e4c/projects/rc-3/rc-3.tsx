import {Stack} from '@astryxdesign/core/Stack';
import {Grid} from '@astryxdesign/core/Grid';
import {Card} from '@astryxdesign/core/Card';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';

const items = [
  {title: 'Analytics Dashboard', description: 'Track your key metrics and KPIs in real-time with customizable widgets.'},
  {title: 'Team Collaboration', description: 'Work together seamlessly with shared projects, comments, and real-time editing.'},
  {title: 'Automation Tools', description: 'Automate repetitive tasks and workflows to save time and reduce errors.'},
  {title: 'Security Suite', description: 'Enterprise-grade security with SSO, audit logs, and role-based access.'},
  {title: 'Integration Hub', description: 'Connect with 200+ tools and services through our integration marketplace.'},
  {title: 'Support Center', description: '24/7 priority support with dedicated account managers for enterprise plans.'},
];

export default function ResponsiveCards() {
  return (
    <Stack gap={4} padding={4}>
      <Heading level={2}>Features</Heading>
      <Grid columns={{base: 1, md: 2, lg: 3}} gap={3}>
        {items.map(item => (
          <Card key={item.title} padding={4}>
            <Stack gap={2}>
              <Heading level={3}>{item.title}</Heading>
              <Text color="secondary">{item.description}</Text>
            </Stack>
          </Card>
        ))}
      </Grid>
    </Stack>
  );
}
