import {useState} from 'react';
import {Card} from '@astryxdesign/core/Card';
import {Button} from '@astryxdesign/core/Button';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {SegmentedControl} from '@astryxdesign/core/SegmentedControl';

const plans = [
  {name: 'Starter', monthly: 12, annual: 10, features: ['5 projects', '10GB storage', 'Email support']},
  {name: 'Pro', monthly: 29, annual: 24, features: ['Unlimited projects', '100GB storage', 'Priority support', 'API access']},
  {name: 'Enterprise', monthly: 79, annual: 66, features: ['Unlimited everything', '1TB storage', '24/7 support', 'Custom integrations', 'SLA']},
];

export default function PricingTable() {
  const [billing, setBilling] = useState('monthly');

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex flex-col items-center gap-6">
        <div className="text-center">
          <Heading level={2}>Choose your plan</Heading>
          <Text color="secondary">Start free, upgrade when you need more.</Text>
        </div>
        <SegmentedControl
          value={billing}
          onChange={setBilling}
          options={[
            {value: 'monthly', label: 'Monthly'},
            {value: 'annual', label: 'Annual (save 20%)'},
          ]}
        />
        <div className="flex gap-4">
          {plans.map((plan) => (
            <Card key={plan.name} padding={4} width={280}>
              <div className="flex flex-col gap-3">
                <Heading level={3}>{plan.name}</Heading>
                <div className="flex items-end gap-1">
                  <Heading level={2}>
                    ${billing === 'monthly' ? plan.monthly : plan.annual}
                  </Heading>
                  <Text color="secondary">/mo</Text>
                </div>
                <div className="flex flex-col gap-1">
                  {plan.features.map((f) => (
                    <Text key={f}>{f}</Text>
                  ))}
                </div>
                <Button label={`Choose ${plan.name}`} variant="primary" width="100%" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
