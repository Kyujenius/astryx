import {Card, CardContent} from '@/components/ui/card';

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

const statusColors = {
  healthy: 'bg-green-500',
  degraded: 'bg-yellow-500',
  down: 'bg-red-500',
};

export default function ServiceStatusList() {
  return (
    <div className="flex flex-col gap-2">
      {services.map((service) => (
        <Card key={service.name}>
          <CardContent className="py-3 px-4 flex items-center gap-3">
            <span className={`h-2.5 w-2.5 rounded-full ${statusColors[service.status]} ${service.status === 'down' ? 'animate-pulse' : ''}`} />
            <span className="font-medium">{service.name}</span>
            <span className="text-sm text-muted-foreground ml-auto">{service.latency}</span>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
