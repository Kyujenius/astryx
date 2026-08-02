import React, {useState} from 'react';
import {SegmentedControl} from '@astryxdesign/core/SegmentedControl';
import {SegmentedControlItem} from '@astryxdesign/core/SegmentedControl';
import {Card} from '@astryxdesign/core/Card';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {Badge} from '@astryxdesign/core/Badge';

const plans = [
  {name: 'Starter', monthly: 29, annual: 290, features: ['5 users', '10GB storage', 'Email support']},
  {name: 'Pro', monthly: 79, annual: 790, features: ['25 users', '100GB storage', 'Priority support', 'API access']},
  {name: 'Enterprise', monthly: 199, annual: 1990, features: ['Unlimited users', '1TB storage', 'Dedicated support', 'Custom integrations']},
];

export default function PricingTable() {
  const [billing, setBilling] = useState('monthly');

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <div className="text-center mb-8">
        <Heading level={1}>Pricing</Heading>
      </div>
      <div className="flex justify-center mb-8">
        <SegmentedControl value={billing} onChange={setBilling}>
          <SegmentedControlItem value="monthly" label="Monthly" />
          <SegmentedControlItem value="annual" label="Annual" />
        </SegmentedControl>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card key={plan.name}>
            <div className="space-y-4">
              <Heading level={3}>{plan.name}</Heading>
              {billing === 'annual' && <Badge>Save 17%</Badge>}
              <Text>
                ${billing === 'monthly' ? plan.monthly : plan.annual}/{billing === 'monthly' ? 'mo' : 'yr'}
              </Text>
              <ul className="space-y-2">
                {plan.features.map((f) => (
                  <li key={f}><Text>{f}</Text></li>
                ))}
              </ul>
              <Button>Get Started</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
