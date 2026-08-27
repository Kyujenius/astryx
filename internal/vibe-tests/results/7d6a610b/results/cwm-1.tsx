import {useState} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Badge} from '@/components/ui/badge';

const plans = [
  {name: 'Starter', monthly: 12, annual: 120, features: ['5 projects', '10GB storage', 'Email support']},
  {name: 'Pro', monthly: 29, annual: 290, features: ['Unlimited projects', '100GB storage', 'Priority support', 'API access']},
  {name: 'Enterprise', monthly: 99, annual: 990, features: ['Unlimited everything', '1TB storage', 'Dedicated support', 'SSO', 'Custom contracts']},
];

export default function PricingTable() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <div className="flex flex-col gap-8 p-8 items-center">
      <div className="flex flex-col gap-2 items-center">
        <h1 className="text-3xl font-bold">Pricing</h1>
        <div className="flex gap-2 items-center">
          <Button variant={!isAnnual ? 'default' : 'outline'} onClick={() => setIsAnnual(false)}>Monthly</Button>
          <Button variant={isAnnual ? 'default' : 'outline'} onClick={() => setIsAnnual(true)}>Annual</Button>
          {isAnnual && <Badge>Save 17%</Badge>}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map(plan => (
          <Card key={plan.name}>
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <div className="flex items-end gap-1">
                <span className="text-3xl font-bold">${isAnnual ? plan.annual : plan.monthly}</span>
                <span className="text-muted-foreground">/{isAnnual ? 'year' : 'month'}</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="flex flex-col gap-2 mb-4">
                {plan.features.map(f => <li key={f} className="text-sm">{f}</li>)}
              </ul>
              <Button className="w-full">Get started</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
