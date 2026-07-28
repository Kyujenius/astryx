// Copyright (c) Meta Platforms, Inc. and affiliates.

import {Card} from '@astryxdesign/core/Card';
import {Grid} from '@astryxdesign/core/Grid';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {VStack} from '@astryxdesign/core/VStack';

const items = [
  {title: 'Analytics', description: 'Track user behavior and engagement metrics across your platform.'},
  {title: 'Security', description: 'End-to-end encryption and role-based access controls.'},
  {title: 'Integrations', description: 'Connect with 200+ services including Slack, GitHub, and Jira.'},
  {title: 'Collaboration', description: 'Real-time editing with version history and comments.'},
  {title: 'Automation', description: 'Build workflows that trigger on events and reduce manual work.'},
  {title: 'Support', description: '24/7 support with dedicated account managers for enterprise plans.'},
];

export default function ResponsiveCards() {
  return (
    <Grid columns={{minWidth: 280}} gap={4}>
      {items.map((item) => (
        <Card key={item.title} padding={4}>
          <VStack gap={2}>
            <Heading level={3}>{item.title}</Heading>
            <Text color="secondary">{item.description}</Text>
          </VStack>
        </Card>
      ))}
    </Grid>
  );
}
