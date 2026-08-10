// Copyright (c) Meta Platforms, Inc. and affiliates.

import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Separator} from '@/components/ui/separator';

const services = [
  {name: 'API Gateway', status: 'healthy', lastChecked: '2 min ago'},
  {name: 'Database', status: 'healthy', lastChecked: '1 min ago'},
  {name: 'Authentication', status: 'degraded', lastChecked: '30 sec ago'},
  {name: 'CDN', status: 'healthy', lastChecked: '5 min ago'},
  {name: 'Email Service', status: 'down', lastChecked: '10 sec ago'},
  {name: 'Search Index', status: 'healthy', lastChecked: '3 min ago'},
];

const statusColors = {
  healthy: 'bg-green-500',
  degraded: 'bg-yellow-500',
  down: 'bg-red-500',
};

export default function ServiceStatusList() {
  return (
    <Card className="w-[480px]">
      <CardHeader>
        <CardTitle>Service Status</CardTitle>
      </CardHeader>
      <CardContent>
        <Separator className="mb-4" />
        <div className="flex flex-col gap-3">
          {services.map(service => (
            <div key={service.name} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-2.5 h-2.5 rounded-full ${statusColors[service.status as keyof typeof statusColors]}`} />
                <span className="text-sm font-medium">{service.name}</span>
              </div>
              <span className="text-xs text-muted-foreground">{service.lastChecked}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
