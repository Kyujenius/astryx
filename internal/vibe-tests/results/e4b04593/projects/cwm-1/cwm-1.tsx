import {useState} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Badge} from '@/components/ui/badge';
import {Tabs, TabsList, TabsTrigger} from '@/components/ui/tabs';

const plans = [
  {name: 'Starter', monthly: 9, annual: 7, features: ['5 projects', '10GB storage', 'Email support']},
  {name: 'Pro', monthly: 29, annual: 24, features: ['Unlimited projects', '100GB storage', 'Priority support', 'Custom domains']},
  {name: 'Enterprise', monthly: 99, annual: 79, features: ['Everything in Pro', '1TB storage', 'Dedicated support', 'SSO', 'SLA']},
];

export default function PricingTable() {
  const [billing, setBilling] = useState('monthly');

  return (
    <div className="space-y-8 p-4">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold">Pricing</h2>
        <Tabs value={billing} onValueChange={setBilling} className="inline-flex">
          <TabsList>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="annual">Annual</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="flex gap-4 justify-center flex-wrap">
        {plans.map((plan) => (
          <Card key={plan.name} className="w-[280px]">
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <div className="flex items-end gap-1">
                <span className="text-3xl font-bold">${billing === 'monthly' ? plan.monthly : plan.annual}</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              {billing === 'annual' && (
                <Badge variant="secondary">Save {Math.round((1 - plan.annual / plan.monthly) * 100)}%</Badge>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {plan.features.map((f) => <li key={f} className="text-sm">{f}</li>)}
              </ul>
              <Button className="w-full" variant={plan.name === 'Pro' ? 'default' : 'outline'}>
                Choose {plan.name}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
