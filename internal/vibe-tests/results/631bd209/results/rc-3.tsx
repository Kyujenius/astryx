import {Card} from '@astryxdesign/core/Card';
import {Grid} from '@astryxdesign/core/Grid';
import {Text, Heading} from '@astryxdesign/core/Text';
import {Stack} from '@astryxdesign/core/Stack';

const cards = [
  {title: 'Analytics', description: 'Track your usage and performance metrics.'},
  {title: 'Billing', description: 'Manage your subscription and payment methods.'},
  {title: 'Team', description: 'Invite members and manage roles.'},
  {title: 'Security', description: 'Configure 2FA, SSO, and access controls.'},
  {title: 'Integrations', description: 'Connect third-party services.'},
  {title: 'API Keys', description: 'Generate and manage your API credentials.'},
];

export default function ResponsiveCards() {
  return (
    <Stack gap="lg">
      <Heading level={2}>Dashboard</Heading>
      <Grid columns={{base: 1, sm: 2, lg: 3}} gap="md">
        {cards.map((card) => (
          <Card key={card.title}>
            <Stack gap="sm">
              <Heading level={3}>{card.title}</Heading>
              <Text color="secondary">{card.description}</Text>
            </Stack>
          </Card>
        ))}
      </Grid>
    </Stack>
  );
}
