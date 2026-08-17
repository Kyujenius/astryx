import {useState} from 'react';
import {SegmentedControl} from '@astryxdesign/core/SegmentedControl';
import {SegmentedControlItem} from '@astryxdesign/core/SegmentedControl';
import {Card} from '@astryxdesign/core/Card';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {Divider} from '@astryxdesign/core/Divider';

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
  const [billing, setBilling] = useState('monthly');

  return (
    <div className="flex flex-col items-center gap-6">
      <Heading level={1}>Choose your plan</Heading>
      <SegmentedControl value={billing} onChange={setBilling} label="Billing period">
        <SegmentedControlItem value="monthly" label="Monthly" />
        <SegmentedControlItem value="annual" label="Annual" />
      </SegmentedControl>
      {billing === 'annual' && <Text color="success">Save up to 17% with annual billing</Text>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        {plans.map(plan => (
          <Card key={plan.name}>
            <div className="p-6 flex flex-col gap-3 h-full">
              <Heading level={3}>{plan.name}</Heading>
              <div className="text-2xl font-bold">
                ${billing === 'monthly' ? plan.monthly : plan.annual}
                <span className="text-sm text-gray-500 font-normal">/{billing === 'monthly' ? 'mo' : 'yr'}</span>
              </div>
              <Divider />
              <ul className="flex flex-col gap-1 flex-1">
                {plan.features.map(f => (
                  <li key={f} className="text-sm">{f}</li>
                ))}
              </ul>
              <Button variant={plan.highlighted ? 'filled' : 'outlined'}>Get Started</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
