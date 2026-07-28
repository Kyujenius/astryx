// Copyright (c) Meta Platforms, Inc. and affiliates.

import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';

const items = [
  {title: 'Analytics', description: 'Track user behavior and engagement metrics.'},
  {title: 'Security', description: 'End-to-end encryption and access controls.'},
  {title: 'Integrations', description: 'Connect with 200+ services.'},
  {title: 'Collaboration', description: 'Real-time editing with version history.'},
  {title: 'Automation', description: 'Build workflows that trigger on events.'},
  {title: 'Support', description: '24/7 support for enterprise plans.'},
];

export default function ResponsiveCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {items.map(item => (
        <Card key={item.title}>
          <CardHeader>
            <CardTitle>{item.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">{item.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
