import {useState} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Badge} from '@/components/ui/badge';
import {Separator} from '@/components/ui/separator';

const plans = [
  {name: 'Starter', monthly: 9, annual: 7, features: ['5 projects', '10 GB storage', 'Email support']},
  {name: 'Pro', monthly: 29, annual: 23, features: ['Unlimited projects', '100 GB storage', 'Priority support', 'API access'], popular: true},
  {name: 'Enterprise', monthly: 99, annual: 79, features: ['Unlimited everything', '1 TB storage', 'Dedicated support', 'Custom integrations', 'SLA']},
];

export default function PricingTable() {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">Pricing</h2>
        <p className="text-muted-foreground">Choose the plan that fits your needs</p>
      </div>
      <div className="inline-flex rounded-lg border p-1">
        <Button variant={billing === 'monthly' ? 'default' : 'ghost'} size="sm" onClick={() => setBilling('monthly')}>Monthly</Button>
        <Button variant={billing === 'annual' ? 'default' : 'ghost'} size="sm" onClick={() => setBilling('annual')}>Annual</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card key={plan.name} className={plan.popular ? 'border-primary' : ''}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <CardTitle>{plan.name}</CardTitle>
                {plan.popular && <Badge>Popular</Badge>}
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold">${billing === 'monthly' ? plan.monthly : plan.annual}</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              {billing === 'annual' && (
                <p className="text-sm text-muted-foreground">Save {Math.round((1 - plan.annual / plan.monthly) * 100)}%</p>
              )}
            </CardHeader>
            <CardContent>
              <Separator className="mb-4" />
              <ul className="space-y-2 mb-6">
                {plan.features.map((f) => (<li key={f} className="text-sm">{f}</li>))}
              </ul>
              <Button className="w-full" variant={plan.popular ? 'default' : 'outline'}>Get {plan.name}</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
