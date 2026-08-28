import {Stack} from '@astryxdesign/core/Stack';
import {HStack} from '@astryxdesign/core/HStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {StatusDot} from '@astryxdesign/core/StatusDot';
import {Card} from '@astryxdesign/core/Card';
import {Divider} from '@astryxdesign/core/Divider';

type ServiceStatus = 'healthy' | 'degraded' | 'down';

interface Service {
  name: string;
  status: ServiceStatus;
  lastChecked: string;
}

const services: Service[] = [
  {name: 'API Gateway', status: 'healthy', lastChecked: '2 min ago'},
  {name: 'Database Cluster', status: 'healthy', lastChecked: '1 min ago'},
  {name: 'Cache Layer', status: 'degraded', lastChecked: '5 min ago'},
  {name: 'Search Service', status: 'down', lastChecked: '30 sec ago'},
  {name: 'Email Service', status: 'healthy', lastChecked: '3 min ago'},
  {name: 'CDN', status: 'healthy', lastChecked: '1 min ago'},
];

function getStatusVariant(status: ServiceStatus) {
  switch (status) {
    case 'healthy': return 'success' as const;
    case 'degraded': return 'warning' as const;
    case 'down': return 'error' as const;
  }
}

function getStatusLabel(status: ServiceStatus) {
  switch (status) {
    case 'healthy': return 'Healthy';
    case 'degraded': return 'Degraded';
    case 'down': return 'Down';
  }
}

export default function ServiceStatusList() {
  return (
    <Stack gap={4} padding={4}>
      <Heading level={2}>Service Status</Heading>
      <Card>
        <Stack gap={0}>
          {services.map((service, i) => (
            <Stack key={service.name} gap={0}>
              {i > 0 && <Divider />}
              <HStack padding={2} justify="space-between" align="center">
                <HStack gap={2} align="center">
                  <StatusDot
                    variant={getStatusVariant(service.status)}
                    label={getStatusLabel(service.status)}
                    isPulsing={service.status === 'down'}
                  />
                  <Text weight="medium">{service.name}</Text>
                </HStack>
                <Text type="supporting" color="secondary">
                  Checked {service.lastChecked}
                </Text>
              </HStack>
            </Stack>
          ))}
        </Stack>
      </Card>
    </Stack>
  );
}
