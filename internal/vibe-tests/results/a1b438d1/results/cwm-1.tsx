import {useState} from 'react';
import {SegmentedControl} from '@astryxdesign/core/SegmentedControl';
import {SegmentedControlItem} from '@astryxdesign/core/SegmentedControl';
import {Card} from '@astryxdesign/core/Card';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {Badge} from '@astryxdesign/core/Badge';
import {Divider} from '@astryxdesign/core/Divider';

const plans = [
  {name: 'Starter', monthly: 12, annual: 10, features: ['5 projects', '10GB storage', 'Email support']},
  {name: 'Pro', monthly: 29, annual: 24, features: ['Unlimited projects', '100GB storage', 'Priority support', 'API access']},
  {name: 'Enterprise', monthly: 79, annual: 66, features: ['Unlimited everything', '1TB storage', 'Dedicated support', 'Custom integrations', 'SLA guarantee']},
];

export default function PricingTable() {
  const [billing, setBilling] = useState('monthly');

  return (
    <div className="flex flex-col items-center gap-8 p-6">
      <div className="flex flex-col items-center gap-3">
        <Heading level={2}>Choose your plan</Heading>
        <SegmentedControl value={billing} onChange={setBilling} label="Billing period">
          <SegmentedControlItem value="monthly" label="Monthly" />
          <SegmentedControlItem value="annual" label="Annual" />
        </SegmentedControl>
        {billing === 'annual' && <Badge label="Save 20%" variant="success" />}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {plans.map((plan) => (
          <Card key={plan.name} padding={4} elevation="low">
            <div className="flex flex-col gap-4">
              <Heading level={3}>{plan.name}</Heading>
              <div className="flex items-end gap-1">
                <Heading level={2}>
                  ${billing === 'monthly' ? plan.monthly : plan.annual}
                </Heading>
                <Text type="supporting">/month</Text>
              </div>
              <Divider />
              <ul className="flex flex-col gap-2">
                {plan.features.map((feature) => (
                  <li key={feature}><Text>{feature}</Text></li>
                ))}
              </ul>
              <Button
                label={`Get ${plan.name}`}
                variant={plan.name === 'Pro' ? 'primary' : 'secondary'}
                width="100%"
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
