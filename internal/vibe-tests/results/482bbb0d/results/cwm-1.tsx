import {useState} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Tabs, TabsList, TabsTrigger} from '@/components/ui/tabs';

const PLANS = [
  {name: 'Starter', monthly: 9, annual: 90, features: ['5 projects', '1 GB storage', 'Email support']},
  {name: 'Pro', monthly: 29, annual: 290, features: ['50 projects', '10 GB storage', 'Priority support']},
  {name: 'Enterprise', monthly: 99, annual: 990, features: ['Unlimited projects', '100 GB storage', 'Dedicated support']},
];

export default function PricingTable() {
  const [billing, setBilling] = useState('monthly');

  return (
    <div className="flex flex-col items-center gap-6 p-8">
      <h2 className="text-3xl font-bold">Pricing</h2>
      <Tabs value={billing} onValueChange={setBilling}>
        <TabsList>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="annual">Annual</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PLANS.map((plan) => (
          <Card key={plan.name} className="w-[260px]">
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <p className="text-3xl font-bold">
                ${billing === 'monthly' ? plan.monthly : plan.annual}
                <span className="text-sm text-muted-foreground font-normal">
                  {billing === 'monthly' ? '/month' : '/year'}
                </span>
              </p>
              <ul className="space-y-1 text-sm">
                {plan.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <Button className="w-full">Get started</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
