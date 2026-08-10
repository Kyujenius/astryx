// Copyright (c) Meta Platforms, Inc. and affiliates.

import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Text} from '@astryxdesign/core/Text';
import {StatusDot} from '@astryxdesign/core/StatusDot';
import {Card} from '@astryxdesign/core/Card';
import {Heading} from '@astryxdesign/core/Heading';
import {Divider} from '@astryxdesign/core/Divider';

const services = [
  {name: 'API Gateway', status: 'success' as const, statusLabel: 'Healthy', lastChecked: '2 min ago'},
  {name: 'Database', status: 'success' as const, statusLabel: 'Healthy', lastChecked: '1 min ago'},
  {name: 'Authentication', status: 'warning' as const, statusLabel: 'Degraded', lastChecked: '30 sec ago'},
  {name: 'CDN', status: 'success' as const, statusLabel: 'Healthy', lastChecked: '5 min ago'},
  {name: 'Email Service', status: 'error' as const, statusLabel: 'Down', lastChecked: '10 sec ago'},
  {name: 'Search Index', status: 'success' as const, statusLabel: 'Healthy', lastChecked: '3 min ago'},
];

export default function ServiceStatusList() {
  return (
    <Card padding={4} width={480} elevation="low">
      <VStack gap={3}>
        <Heading level={3}>Service Status</Heading>
        <Divider />
        <VStack gap={2}>
          {services.map(service => (
            <HStack key={service.name} gap={2} vAlign="center" hAlign="between">
              <HStack gap={2} vAlign="center">
                <StatusDot variant={service.status} label={service.statusLabel} />
                <Text type="body">{service.name}</Text>
              </HStack>
              <Text type="supporting" color="secondary">{service.lastChecked}</Text>
            </HStack>
          ))}
        </VStack>
      </VStack>
    </Card>
  );
}
