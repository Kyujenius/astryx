// Copyright (c) Meta Platforms, Inc. and affiliates.

import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';

const items = [
  {title: 'Analytics', description: 'Track performance metrics and engagement.'},
  {title: 'Reports', description: 'Generate detailed reports for stakeholders.'},
  {title: 'Settings', description: 'Configure workspace preferences.'},
  {title: 'Team', description: 'Manage team members and permissions.'},
  {title: 'Billing', description: 'View invoices and manage subscriptions.'},
  {title: 'Support', description: 'Get help or browse the knowledge base.'},
];

export default function ResponsiveCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {items.map((item) => (
        <Card key={item.title}>
          <CardHeader><CardTitle>{item.title}</CardTitle></CardHeader>
          <CardContent><p className="text-muted-foreground">{item.description}</p></CardContent>
        </Card>
      ))}
    </div>
  );
}
