import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';
import {Tabs, TabsList, TabsTrigger} from '@/components/ui/tabs';

interface Plan {
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  features: string[];
  isPopular?: boolean;
}

const plans: Plan[] = [
  {name: 'Starter', monthlyPrice: 12, annualPrice: 10, features: ['5 projects', '1GB storage', 'Email support']},
  {name: 'Pro', monthlyPrice: 24, annualPrice: 20, features: ['Unlimited projects', '10GB storage', 'Priority support', 'API access'], isPopular: true},
  {name: 'Enterprise', monthlyPrice: 48, annualPrice: 40, features: ['Unlimited everything', '100GB storage', 'Dedicated support', 'SSO', 'Custom integrations']},
];

export default function PricingTable() {
  const [billing, setBilling] = useState('monthly');

  return (
    <div className="flex flex-col items-center gap-8 p-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Pricing</h1>
        <p className="text-muted-foreground mt-2">Choose the plan that works for you</p>
      </div>
      <Tabs value={billing} onValueChange={setBilling}>
        <TabsList>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="annual">Annual</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {plans.map(plan => {
          const price = billing === 'monthly' ? plan.monthlyPrice : plan.annualPrice;
          return (
            <Card key={plan.name} className={plan.isPopular ? 'border-primary shadow-lg' : ''}>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CardTitle>{plan.name}</CardTitle>
                  {plan.isPopular && <Badge>Popular</Badge>}
                </div>
                <div className="flex items-end gap-1 mt-2">
                  <span className="text-3xl font-bold">${price}</span>
                  <span className="text-muted-foreground">/mo</span>
                </div>
                {billing === 'annual' && (
                  <p className="text-sm text-green-600">Save ${(plan.monthlyPrice - plan.annualPrice) * 12}/year</p>
                )}
              </CardHeader>
              <CardContent>
                <ul className="flex flex-col gap-2 mb-4">
                  {plan.features.map(f => <li key={f} className="text-sm">{f}</li>)}
                </ul>
                <Button className="w-full" variant={plan.isPopular ? 'default' : 'outline'}>Get Started</Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
