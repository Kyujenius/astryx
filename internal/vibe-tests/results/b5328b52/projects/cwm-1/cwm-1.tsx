import {useState} from 'react';
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from './components/ui/card';
import {Button} from './components/ui/button';
import {Badge} from './components/ui/badge';
import {Tabs, TabsList, TabsTrigger} from './components/ui/tabs';

const plans = [
  {name: 'Starter', monthly: 12, annual: 10, features: ['5 projects', '10GB storage', 'Email support']},
  {name: 'Pro', monthly: 29, annual: 24, features: ['Unlimited projects', '100GB storage', 'Priority support', 'API access'], popular: true},
  {name: 'Enterprise', monthly: 79, annual: 66, features: ['Unlimited everything', '1TB storage', 'Dedicated support', 'Custom integrations', 'SLA guarantee']},
];

export default function PricingTable() {
  const [billing, setBilling] = useState('monthly');

  return (
    <div className="flex flex-col items-center gap-8 p-6">
      <div className="flex flex-col items-center gap-3">
        <h2 className="text-3xl font-bold">Choose your plan</h2>
        <Tabs value={billing} onValueChange={setBilling}>
          <TabsList>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="annual">Annual</TabsTrigger>
          </TabsList>
        </Tabs>
        {billing === 'annual' && <Badge variant="secondary">Save 20%</Badge>}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {plans.map((plan) => (
          <Card key={plan.name} className={plan.popular ? 'border-primary' : ''}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {plan.name}
                {plan.popular && <Badge>Popular</Badge>}
              </CardTitle>
              <div className="flex items-end gap-1">
                <span className="text-3xl font-bold">
                  ${billing === 'monthly' ? plan.monthly : plan.annual}
                </span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <span className="text-green-500">&#10003;</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant={plan.popular ? 'default' : 'outline'}>
                Get {plan.name}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
