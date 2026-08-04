// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';
import {useState} from 'react';
import {Card, CardContent, CardHeader, CardTitle, CardFooter} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Tabs, TabsList, TabsTrigger} from '@/components/ui/tabs';

const plans = [
  {name: 'Starter', monthly: 9, annual: 7, features: ['5 projects', '1GB storage', 'Email support']},
  {name: 'Pro', monthly: 29, annual: 23, features: ['25 projects', '10GB storage', 'Priority support', 'API access']},
  {name: 'Enterprise', monthly: 99, annual: 79, features: ['Unlimited projects', '100GB storage', '24/7 support', 'Custom integrations', 'SSO']},
];

export default function PricingTable() {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');

  return (
    <div className="flex flex-col items-center gap-8 p-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">Choose your plan</h2>
        <Tabs value={billing} onValueChange={(v) => setBilling(v as 'monthly' | 'annual')}>
          <TabsList>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="annual">Annual (save 20%)</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card key={plan.name} className={plan.name === 'Pro' ? 'border-primary' : ''}>
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <div className="text-4xl font-bold">
                ${billing === 'monthly' ? plan.monthly : plan.annual}
                <span className="text-sm font-normal text-muted-foreground">/mo</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span>&#10003;</span> {f}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant={plan.name === 'Pro' ? 'default' : 'outline'}>
                {plan.name === 'Enterprise' ? 'Contact sales' : 'Get started'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
