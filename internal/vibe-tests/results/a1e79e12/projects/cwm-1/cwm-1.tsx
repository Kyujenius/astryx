import {useState} from 'react';
import {Button} from './components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from './components/ui/card';
import {Badge} from './components/ui/badge';
import {Tabs, TabsList, TabsTrigger} from './components/ui/tabs';
import {Separator} from './components/ui/separator';

const plans = [
  {name: 'Starter', monthly: 12, annual: 10, features: ['5 projects', '10GB storage', 'Email support']},
  {name: 'Pro', monthly: 29, annual: 24, features: ['Unlimited projects', '100GB storage', 'Priority support', 'API access'], popular: true},
  {name: 'Enterprise', monthly: 79, annual: 66, features: ['Unlimited everything', '1TB storage', 'Dedicated support', 'Custom integrations', 'SSO']},
];

export default function PricingTable() {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');

  return (
    <div className="space-y-8 text-center">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold">Choose your plan</h2>
        <p className="text-muted-foreground">Start free, upgrade when you need to.</p>
      </div>
      <Tabs value={billing} onValueChange={(v) => setBilling(v as 'monthly' | 'annual')} className="inline-flex">
        <TabsList>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="annual">Annual (save 20%)</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card key={plan.name} className={plan.popular ? 'border-primary' : ''}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <CardTitle>{plan.name}</CardTitle>
                {plan.popular && <Badge>Popular</Badge>}
              </div>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="text-4xl font-bold">${billing === 'monthly' ? plan.monthly : plan.annual}</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent>
              <Separator className="mb-4" />
              <ul className="space-y-2 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="text-sm">{f}</li>
                ))}
              </ul>
              <Button className="w-full" variant={plan.popular ? 'default' : 'outline'}>Get started</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
