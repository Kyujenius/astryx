import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Separator} from '@/components/ui/separator';

type ServiceStatus = 'healthy' | 'degraded' | 'down';

const services = [
  {name: 'API Gateway', status: 'healthy' as ServiceStatus, lastChecked: '2 min ago'},
  {name: 'Database Cluster', status: 'healthy' as ServiceStatus, lastChecked: '1 min ago'},
  {name: 'Cache Layer', status: 'degraded' as ServiceStatus, lastChecked: '5 min ago'},
  {name: 'Search Service', status: 'down' as ServiceStatus, lastChecked: '30 sec ago'},
  {name: 'Email Service', status: 'healthy' as ServiceStatus, lastChecked: '3 min ago'},
  {name: 'CDN', status: 'healthy' as ServiceStatus, lastChecked: '1 min ago'},
];

function statusColor(s: ServiceStatus) {
  return s === 'healthy' ? 'bg-green-500' : s === 'degraded' ? 'bg-yellow-500' : 'bg-red-500';
}

function statusLabel(s: ServiceStatus) {
  return s === 'healthy' ? 'Healthy' : s === 'degraded' ? 'Degraded' : 'Down';
}

export default function ServiceStatusList() {
  return (
    <div className="flex flex-col gap-4 p-6">
      <h2 className="text-xl font-semibold">Service Status</h2>
      <Card>
        <CardContent className="p-0">
          {services.map((service, i) => (
            <div key={service.name}>
              {i > 0 && <Separator />}
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <span
                    className={`inline-block w-2.5 h-2.5 rounded-full ${statusColor(service.status)}`}
                    role="img"
                    aria-label={statusLabel(service.status)}
                  />
                  <span className="font-medium">{service.name}</span>
                </div>
                <span className="text-sm text-muted-foreground">Checked {service.lastChecked}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
