import {Card, CardContent, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Tabs, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {Badge} from '@/components/ui/badge';
import {useState} from 'react';

const plans = [
  {name: 'Starter', monthly: 12, annual: 10, features: ['5 projects', '10GB storage', 'Email support']},
  {name: 'Pro', monthly: 29, annual: 24, features: ['Unlimited projects', '100GB storage', 'Priority support', 'API access'], popular: true},
  {name: 'Enterprise', monthly: 79, annual: 66, features: ['Everything in Pro', '1TB storage', 'Dedicated manager', 'SLA']},
];

export default function PricingTable() {
  const [billing, setBilling] = useState('monthly');

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold">Pricing</h2>
        <Tabs value={billing} onValueChange={setBilling} className="w-fit mx-auto">
          <TabsList>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="annual">Annual</TabsTrigger>
          </TabsList>
        </Tabs>
        {billing === 'annual' && (
          <Badge variant="secondary" className="bg-green-100 text-green-800">Save up to 20%</Badge>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card key={plan.name} className={plan.popular ? 'border-primary shadow-md' : ''}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <CardTitle>{plan.name}</CardTitle>
                {plan.popular && <Badge>Popular</Badge>}
              </div>
              <div className="flex items-end gap-1 mt-2">
                <span className="text-3xl font-bold">${billing === 'monthly' ? plan.monthly : plan.annual}</span>
                <span className="text-muted-foreground">/mo</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <span className="text-green-500">✓</span> {f}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant={plan.popular ? 'default' : 'outline'}>
                Get started
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
