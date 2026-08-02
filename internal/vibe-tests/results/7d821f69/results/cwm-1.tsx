import React, {useState} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Badge} from '@/components/ui/badge';
import {Tabs, TabsList, TabsTrigger} from '@/components/ui/tabs';

const plans = [
  {name: 'Starter', monthly: 29, annual: 290, features: ['5 users', '10GB storage', 'Email support']},
  {name: 'Pro', monthly: 79, annual: 790, features: ['25 users', '100GB storage', 'Priority support', 'API access']},
  {name: 'Enterprise', monthly: 199, annual: 1990, features: ['Unlimited users', '1TB storage', 'Dedicated support', 'Custom integrations']},
];

export default function PricingTable() {
  const [billing, setBilling] = useState('monthly');

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Pricing</h1>
      <div className="flex justify-center mb-8">
        <Tabs value={billing} onValueChange={setBilling}>
          <TabsList>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="annual">Annual</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card key={plan.name}>
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              {billing === 'annual' && <Badge>Save 17%</Badge>}
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-2xl font-bold">
                ${billing === 'monthly' ? plan.monthly : plan.annual}/{billing === 'monthly' ? 'mo' : 'yr'}
              </p>
              <ul className="space-y-2">
                {plan.features.map((f) => <li key={f}>{f}</li>)}
              </ul>
              <Button className="w-full">Get Started</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
