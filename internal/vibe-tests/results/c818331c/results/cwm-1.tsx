import {useState} from 'react';
import {Card} from '@astryxdesign/core/Card';
import {Button} from '@astryxdesign/core/Button';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {SegmentedControl, SegmentedControlItem} from '@astryxdesign/core/SegmentedControl';

const PLANS = [
  {name: 'Starter', monthly: 9, annual: 90, features: ['5 projects', '1 GB storage', 'Email support']},
  {name: 'Pro', monthly: 29, annual: 290, features: ['50 projects', '10 GB storage', 'Priority support']},
  {name: 'Enterprise', monthly: 99, annual: 990, features: ['Unlimited projects', '100 GB storage', 'Dedicated support']},
];

export default function PricingTable() {
  const [billing, setBilling] = useState('monthly');

  return (
    <div className="flex flex-col items-center gap-6 p-8">
      <Heading level={2}>Pricing</Heading>
      <SegmentedControl label="Billing period" value={billing} onChange={setBilling}>
        <SegmentedControlItem value="monthly" label="Monthly" />
        <SegmentedControlItem value="annual" label="Annual" />
      </SegmentedControl>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PLANS.map((plan) => (
          <Card key={plan.name} padding={4} width={280}>
            <div className="flex flex-col gap-3">
              <Heading level={3}>{plan.name}</Heading>
              <Text type="display-2">
                ${billing === 'monthly' ? plan.monthly : plan.annual}
              </Text>
              <Text type="supporting" color="secondary">
                {billing === 'monthly' ? '/month' : '/year'}
              </Text>
              <ul className="list-none p-0 space-y-1">
                {plan.features.map((f) => (
                  <li key={f}><Text>{f}</Text></li>
                ))}
              </ul>
              <Button label="Get started" variant="primary" width="100%" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
