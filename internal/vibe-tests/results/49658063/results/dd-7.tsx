import {StatusDot} from '@astryxdesign/core/StatusDot';
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
    <div className="flex flex-col gap-2">
      {services.map((service) => (
        <Card key={service.name} padding={3}>
          <div className="flex items-center gap-2">
            <StatusDot
              variant={statusMap[service.status]}
              label={service.status}
              isPulsing={service.status === 'down'}
            />
            <Text weight="medium">{service.name}</Text>
            <Text color="secondary" type="supporting">{service.latency}</Text>
          </div>
        </Card>
      ))}
    </div>
  );
}
