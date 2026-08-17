import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Separator} from '@/components/ui/separator';

interface Plan {
  name: string;
  monthly: number;
  annual: number;
  features: string[];
  highlighted?: boolean;
}

const plans: Plan[] = [
  {name: 'Starter', monthly: 9, annual: 90, features: ['5 projects', '1 GB storage', 'Email support']},
  {name: 'Pro', monthly: 29, annual: 290, features: ['Unlimited projects', '100 GB storage', 'Priority support', 'API access'], highlighted: true},
  {name: 'Enterprise', monthly: 99, annual: 990, features: ['Unlimited everything', 'Dedicated support', 'Custom integrations', 'SLA']},
];

export default function PricingTable() {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');

  return (
    <div className="flex flex-col items-center gap-6 p-8">
      <h1 className="text-3xl font-bold">Choose your plan</h1>
      <div className="flex rounded-lg border p-1 gap-1">
        <button
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${billing === 'monthly' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
          onClick={() => setBilling('monthly')}
        >
          Monthly
        </button>
        <button
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${billing === 'annual' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
          onClick={() => setBilling('annual')}
        >
          Annual
        </button>
      </div>
      {billing === 'annual' && <p className="text-sm text-green-600">Save up to 17% with annual billing</p>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
        {plans.map(plan => (
          <Card key={plan.name} className={plan.highlighted ? 'border-primary' : ''}>
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="text-3xl font-bold">
                ${billing === 'monthly' ? plan.monthly : plan.annual}
                <span className="text-sm text-muted-foreground font-normal">/{billing === 'monthly' ? 'mo' : 'yr'}</span>
              </div>
              <Separator />
              <ul className="space-y-2">
                {plan.features.map(f => (
                  <li key={f} className="text-sm">{f}</li>
                ))}
              </ul>
              <Button variant={plan.highlighted ? 'default' : 'outline'} className="mt-auto">
                Get Started
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
