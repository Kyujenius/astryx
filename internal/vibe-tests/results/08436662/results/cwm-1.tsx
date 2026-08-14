import {Card} from '@astryxdesign/core/Card';
import {VStack} from '@astryxdesign/core/VStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {SegmentedControl} from '@astryxdesign/core/SegmentedControl';
import {Divider} from '@astryxdesign/core/Divider';
import {useState} from 'react';

const plans = [
  {name: 'Starter', monthly: 12, annual: 10, features: ['5 projects', '10GB storage', 'Email support']},
  {name: 'Pro', monthly: 29, annual: 24, features: ['Unlimited projects', '100GB storage', 'Priority support', 'API access'], popular: true},
  {name: 'Enterprise', monthly: 79, annual: 66, features: ['Everything in Pro', '1TB storage', 'Dedicated manager', 'SLA']},
];

export default function PricingTable() {
  const [billing, setBilling] = useState('monthly');

  return (
    <div className="max-w-5xl mx-auto p-8">
      <VStack gap={4} align="center">
        <Heading level={2}>Simple, transparent pricing</Heading>
        <SegmentedControl
          value={billing}
          onChange={setBilling}
          options={[
            {value: 'monthly', label: 'Monthly'},
            {value: 'annual', label: 'Annual'},
          ]}
        />
        {billing === 'annual' && (
          <span className="inline-block bg-green-100 text-green-800 text-sm px-2 py-0.5 rounded-full">
            Save up to 20%
          </span>
        )}
      </VStack>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {plans.map((plan) => (
          <Card key={plan.name} padding={4}>
            <VStack gap={3}>
              <div className="flex items-center gap-2">
                <Heading level={3}>{plan.name}</Heading>
                {plan.popular && (
                  <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-0.5 rounded">
                    Popular
                  </span>
                )}
              </div>
              <div className="flex items-end gap-1">
                <span className="text-3xl font-bold">
                  ${billing === 'monthly' ? plan.monthly : plan.annual}
                </span>
                <Text color="secondary">/mo</Text>
              </div>
              <Divider />
              <ul className="space-y-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <span className="text-green-500">✓</span> {f}
                  </li>
                ))}
              </ul>
              <Button variant={plan.popular ? 'primary' : 'secondary'} width="full">
                Get started
              </Button>
            </VStack>
          </Card>
        ))}
      </div>
    </div>
  );
}
