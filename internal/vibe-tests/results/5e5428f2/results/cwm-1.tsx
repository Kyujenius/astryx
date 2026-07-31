import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';

const plans = [
  {name: 'Starter', monthly: 12, annual: 10, features: ['5 projects', '10GB storage', 'Email support']},
  {name: 'Pro', monthly: 29, annual: 24, features: ['Unlimited projects', '100GB storage', 'Priority support', 'API access']},
  {name: 'Enterprise', monthly: 79, annual: 66, features: ['Unlimited everything', '1TB storage', '24/7 support', 'Custom integrations', 'SLA']},
];

export default function PricingTable() {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex flex-col items-center gap-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Choose your plan</h2>
          <p className="text-muted-foreground">Start free, upgrade when you need more.</p>
        </div>
        <div className="inline-flex rounded-lg border p-1">
          <button
            className={`px-4 py-2 rounded-md text-sm ${billing === 'monthly' ? 'bg-primary text-primary-foreground' : ''}`}
            onClick={() => setBilling('monthly')}
          >Monthly</button>
          <button
            className={`px-4 py-2 rounded-md text-sm ${billing === 'annual' ? 'bg-primary text-primary-foreground' : ''}`}
            onClick={() => setBilling('annual')}
          >Annual (save 20%)</button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {plans.map((plan) => (
            <Card key={plan.name}>
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="flex items-end gap-1">
                  <span className="text-3xl font-bold">${billing === 'monthly' ? plan.monthly : plan.annual}</span>
                  <span className="text-muted-foreground">/mo</span>
                </div>
                <ul className="flex flex-col gap-2">
                  {plan.features.map((f) => <li key={f}>{f}</li>)}
                </ul>
                <Button className="w-full">Choose {plan.name}</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
