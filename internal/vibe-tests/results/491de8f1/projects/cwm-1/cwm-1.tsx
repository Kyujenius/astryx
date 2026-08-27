import {useState} from 'react';
import {Card} from '@astryxdesign/core/Card';
import {Button} from '@astryxdesign/core/Button';
import {Badge} from '@astryxdesign/core/Badge';

const plans = [
  {name: 'Starter', monthly: 12, annual: 120, features: ['5 projects', '10GB storage', 'Email support']},
  {name: 'Pro', monthly: 29, annual: 290, features: ['Unlimited projects', '100GB storage', 'Priority support', 'API access']},
  {name: 'Enterprise', monthly: 99, annual: 990, features: ['Unlimited everything', '1TB storage', 'Dedicated support', 'SSO', 'Custom contracts']},
];

export default function PricingTable() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <div className="flex flex-col gap-6 p-6 items-center">
      <div className="flex flex-col gap-2 items-center">
        <h1 className="text-3xl font-bold">Pricing</h1>
        <div className="flex gap-2 items-center">
          <Button label="Monthly" variant={!isAnnual ? 'primary' : 'ghost'} onClick={() => setIsAnnual(false)} />
          <Button label="Annual" variant={isAnnual ? 'primary' : 'ghost'} onClick={() => setIsAnnual(true)} />
          {isAnnual && <Badge label="Save 17%" variant="success" />}
        </div>
      </div>
      <div className="flex gap-4 flex-wrap justify-center">
        {plans.map(plan => (
          <Card key={plan.name} padding={5} width={300} elevation="low">
            <div className="flex flex-col gap-3">
              <h3 className="text-lg font-semibold">{plan.name}</h3>
              <div className="flex gap-1 items-end">
                <span className="text-2xl font-bold">${isAnnual ? plan.annual : plan.monthly}</span>
                <span className="text-sm text-gray-500">/{isAnnual ? 'year' : 'month'}</span>
              </div>
              <ul className="flex flex-col gap-1">
                {plan.features.map(f => <li key={f} className="text-sm">{f}</li>)}
              </ul>
              <Button label="Get started" variant="primary" width="100%" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
