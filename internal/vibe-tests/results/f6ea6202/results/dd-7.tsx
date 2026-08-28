import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {StatusDot} from '@astryxdesign/core/StatusDot';
import {Card} from '@astryxdesign/core/Card';

type ServiceStatus = 'healthy' | 'degraded' | 'down';

const services = [
  {name: 'API Gateway', status: 'healthy' as ServiceStatus, lastChecked: '2 min ago'},
  {name: 'Database Cluster', status: 'healthy' as ServiceStatus, lastChecked: '1 min ago'},
  {name: 'Cache Layer', status: 'degraded' as ServiceStatus, lastChecked: '5 min ago'},
  {name: 'Search Service', status: 'down' as ServiceStatus, lastChecked: '30 sec ago'},
  {name: 'Email Service', status: 'healthy' as ServiceStatus, lastChecked: '3 min ago'},
  {name: 'CDN', status: 'healthy' as ServiceStatus, lastChecked: '1 min ago'},
];

function statusVariant(s: ServiceStatus) {
  return s === 'healthy' ? 'success' as const : s === 'degraded' ? 'warning' as const : 'error' as const;
}

export default function ServiceStatusList() {
  return (
    <div className="flex flex-col gap-4 p-6">
      <Heading level={2}>Service Status</Heading>
      <Card>
        <div className="divide-y divide-gray-200">
          {services.map(service => (
            <div key={service.name} className="flex items-center justify-between py-3 px-2">
              <div className="flex items-center gap-3">
                <StatusDot
                  variant={statusVariant(service.status)}
                  label={service.status}
                  isPulsing={service.status === 'down'}
                />
                <Text weight="medium">{service.name}</Text>
              </div>
              <Text type="supporting" color="secondary">Checked {service.lastChecked}</Text>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
