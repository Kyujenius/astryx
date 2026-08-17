import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';
import {Tabs, TabsList, TabsTrigger} from '@/components/ui/tabs';

interface Plan {
  name: string;
  monthly: number;
  annual: number;
  features: string[];
  popular?: boolean;
}

const plans: Plan[] = [
  {name: 'Starter', monthly: 9, annual: 90, features: ['5 projects', '1 GB storage', 'Email support']},
  {name: 'Pro', monthly: 29, annual: 290, features: ['Unlimited projects', '100 GB storage', 'Priority support', 'API access'], popular: true},
  {name: 'Enterprise', monthly: 99, annual: 990, features: ['Unlimited everything', 'Dedicated account manager', 'SLA', 'Custom integrations']},
];

export default function PricingTable() {
  const [billing, setBilling] = useState('monthly');

  return (
    <div className="flex flex-col items-center gap-8 py-12">
      <h1 className="text-3xl font-bold">Pricing</h1>
      <Tabs value={billing} onValueChange={setBilling}>
        <TabsList>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="annual">Annual (save 17%)</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="flex gap-4 flex-wrap justify-center">
        {plans.map((plan) => (
          <Card key={plan.name} className={`w-72 ${plan.popular ? 'shadow-lg border-primary' : ''}`}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <CardTitle>{plan.name}</CardTitle>
                {plan.popular && <Badge>Popular</Badge>}
              </div>
              <p className="text-3xl font-bold">${billing === 'monthly' ? plan.monthly : plan.annual}</p>
              <p className="text-sm text-muted-foreground">per {billing === 'monthly' ? 'month' : 'year'}</p>
            </CardHeader>
            <CardContent className="space-y-2">
              {plan.features.map((f) => <p key={f}>{f}</p>)}
              <Button className="w-full" variant={plan.popular ? 'default' : 'outline'}>
                {plan.popular ? 'Get started' : 'Choose plan'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
