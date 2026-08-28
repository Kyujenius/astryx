import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';
import {Separator} from '@/components/ui/separator';
import {Tabs, TabsList, TabsTrigger} from '@/components/ui/tabs';

const plans = [
  {name: 'Starter', monthly: 9, annual: 7, features: ['5 projects', '1 GB storage', 'Email support']},
  {name: 'Pro', monthly: 29, annual: 24, features: ['Unlimited projects', '100 GB storage', 'Priority support', 'API access'], popular: true},
  {name: 'Enterprise', monthly: 99, annual: 79, features: ['Unlimited everything', '1 TB storage', 'Dedicated support', 'Custom integrations', 'SLA']},
];

export default function PricingTable() {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');

  return (
    <div className="flex flex-col items-center gap-8 p-8">
      <h1 className="text-3xl font-bold">Choose your plan</h1>
      <p className="text-muted-foreground">Start free, upgrade when you need more.</p>

      <Tabs value={billing} onValueChange={(v) => setBilling(v as 'monthly' | 'annual')}>
        <TabsList>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="annual">Annual (save 20%)</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {plans.map(plan => {
          const price = billing === 'monthly' ? plan.monthly : plan.annual;
          return (
            <Card key={plan.name} className={plan.popular ? 'border-primary' : ''}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>{plan.name}</CardTitle>
                  {plan.popular && <Badge>Popular</Badge>}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold">${price}</span>
                  <span className="text-muted-foreground">/mo</span>
                </div>
                {billing === 'annual' && (
                  <p className="text-sm text-primary">Billed ${price * 12}/year</p>
                )}
                <Separator />
                <ul className="space-y-2">
                  {plan.features.map(f => (
                    <li key={f} className="text-sm">✓ {f}</li>
                  ))}
                </ul>
                <Button className="w-full" variant={plan.popular ? 'default' : 'outline'}>
                  Get started
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
