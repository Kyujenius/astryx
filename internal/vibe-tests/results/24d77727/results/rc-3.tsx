// Copyright (c) Meta Platforms, Inc. and affiliates.

import {Card} from '@astryxdesign/core/Card';
import {Grid} from '@astryxdesign/core/Grid';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Stack} from '@astryxdesign/core/Stack';

const items = [
  {title: 'Analytics', description: 'Track performance metrics and engagement.'},
  {title: 'Reports', description: 'Generate detailed reports for stakeholders.'},
  {title: 'Settings', description: 'Configure workspace preferences.'},
  {title: 'Team', description: 'Manage team members and permissions.'},
  {title: 'Billing', description: 'View invoices and manage subscriptions.'},
  {title: 'Support', description: 'Get help or browse the knowledge base.'},
];

export default function ResponsiveCards() {
  return (
    <Grid columns={{minWidth: 280, max: 3}} gap={4} padding={4}>
      {items.map((item) => (
        <Card key={item.title} padding={4} elevation="low">
          <Stack gap={2}>
            <Heading level={3}>{item.title}</Heading>
            <Text color="secondary">{item.description}</Text>
          </Stack>
        </Card>
      ))}
    </Grid>
  );
}
