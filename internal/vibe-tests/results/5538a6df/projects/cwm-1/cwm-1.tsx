// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Badge} from '@/components/ui/badge';
import {Tabs, TabsList, TabsTrigger} from '@/components/ui/tabs';

const plans = [
  {name: 'Starter', monthly: 12, annual: 10, features: ['5 projects', '10GB storage', 'Email support']},
  {name: 'Pro', monthly: 29, annual: 24, features: ['Unlimited projects', '100GB storage', 'Priority support', 'Analytics'], popular: true},
  {name: 'Enterprise', monthly: 79, annual: 66, features: ['Everything in Pro', '1TB storage', 'Dedicated support', 'Custom integrations', 'SLA']},
];

export default function PricingTable() {
  const [billing, setBilling] = useState('monthly');

  return (
    <div className="flex flex-col items-center gap-8 p-8">
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-3xl font-bold">Simple, transparent pricing</h2>
        <Tabs value={billing} onValueChange={setBilling}>
          <TabsList>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="annual">Annual</TabsTrigger>
          </TabsList>
        </Tabs>
        {billing === 'annual' && <Badge variant="secondary">Save up to 20%</Badge>}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
        {plans.map(plan => (
          <Card key={plan.name} className={plan.popular ? 'border-primary shadow-lg' : ''}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <CardTitle>{plan.name}</CardTitle>
                {plan.popular && <Badge>Popular</Badge>}
              </div>
              <div className="flex items-end gap-1">
                <span className="text-4xl font-bold">${billing === 'monthly' ? plan.monthly : plan.annual}</span>
                <span className="text-muted-foreground">/mo</span>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <ul className="flex flex-col gap-2">
                {plan.features.map(f => (
                  <li key={f} className="text-sm">{f}</li>
                ))}
              </ul>
              <Button variant={plan.popular ? 'default' : 'outline'} className="w-full">Get started</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
