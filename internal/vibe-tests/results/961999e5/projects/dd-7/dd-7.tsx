import {StatusDot} from '@astryxdesign/core/StatusDot';
import {Stack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import {Card} from '@astryxdesign/core/Card';

interface Service {
  name: string;
  status: 'healthy' | 'degraded' | 'down';
  latency: string;
}

const services: Service[] = [
  {name: 'API Gateway', status: 'healthy', latency: '12ms'},
  {name: 'Auth Service', status: 'healthy', latency: '8ms'},
  {name: 'Database', status: 'degraded', latency: '230ms'},
  {name: 'Cache Layer', status: 'healthy', latency: '2ms'},
  {name: 'Worker Queue', status: 'down', latency: 'N/A'},
];

const statusMap = {
  healthy: 'success',
  degraded: 'warning',
  down: 'error',
} as const;

export default function ServiceStatusList() {
  return (
    <Stack gap={2}>
      {services.map((service) => (
        <Card key={service.name} padding={3}>
          <Stack direction="horizontal" gap={2} align="center">
            <StatusDot
              variant={statusMap[service.status]}
              label={service.status}
              isPulsing={service.status === 'down'}
            />
            <Text weight="medium">{service.name}</Text>
            <Text color="secondary" type="supporting">{service.latency}</Text>
          </Stack>
        </Card>
      ))}
    </Stack>
  );
}
