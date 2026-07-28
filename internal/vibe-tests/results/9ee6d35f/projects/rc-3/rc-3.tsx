// Copyright (c) Meta Platforms, Inc. and affiliates.

import {Card} from '@astryxdesign/core/Card';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {VStack} from '@astryxdesign/core/VStack';

const items = [
  {title: 'Analytics', description: 'Track user behavior and engagement metrics.'},
  {title: 'Security', description: 'End-to-end encryption and role-based access controls.'},
  {title: 'Integrations', description: 'Connect with 200+ services.'},
  {title: 'Collaboration', description: 'Real-time editing with version history.'},
  {title: 'Automation', description: 'Build workflows that trigger on events.'},
  {title: 'Support', description: '24/7 support with dedicated account managers.'},
];

export default function ResponsiveCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <Card key={item.title} padding={4}>
          <VStack gap={2}>
            <Heading level={3}>{item.title}</Heading>
            <Text color="secondary">{item.description}</Text>
          </VStack>
        </Card>
      ))}
    </div>
  );
}
