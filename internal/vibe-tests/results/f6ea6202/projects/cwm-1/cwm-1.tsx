import {useState} from 'react';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {Card} from '@astryxdesign/core/Card';
import {Badge} from '@astryxdesign/core/Badge';
import {SegmentedControl} from '@astryxdesign/core/SegmentedControl';
import {Divider} from '@astryxdesign/core/Divider';

type Billing = 'monthly' | 'annual';

const plans = [
  {name: 'Starter', monthly: 9, annual: 7, features: ['5 projects', '1 GB storage', 'Email support']},
  {name: 'Pro', monthly: 29, annual: 24, features: ['Unlimited projects', '100 GB storage', 'Priority support', 'API access'], popular: true},
  {name: 'Enterprise', monthly: 99, annual: 79, features: ['Unlimited everything', '1 TB storage', 'Dedicated support', 'Custom integrations', 'SLA']},
];

export default function PricingTable() {
  const [billing, setBilling] = useState<Billing>('monthly');

  return (
    <div className="flex flex-col items-center gap-6 p-8">
      <Heading level={1}>Choose your plan</Heading>
      <Text color="secondary">Start free, upgrade when you need more.</Text>

      <SegmentedControl
        label="Billing period"
        options={[
          {value: 'monthly', label: 'Monthly'},
          {value: 'annual', label: 'Annual (save 20%)'},
        ]}
        value={billing}
        onChange={(val) => setBilling(val as Billing)}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
        {plans.map(plan => {
          const price = billing === 'monthly' ? plan.monthly : plan.annual;
          return (
            <Card key={plan.name} padding={4}>
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <Heading level={3}>{plan.name}</Heading>
                  {plan.popular && <Badge variant="accent">Popular</Badge>}
                </div>
                <div className="flex items-baseline gap-1">
                  <Text size="3xl" weight="bold">${price}</Text>
                  <Text color="secondary">/mo</Text>
                </div>
                {billing === 'annual' && (
                  <Text type="supporting" color="accent">Billed ${price * 12}/year</Text>
                )}
                <Divider />
                <ul className="flex flex-col gap-2">
                  {plan.features.map(f => (
                    <li key={f}><Text>✓ {f}</Text></li>
                  ))}
                </ul>
                <Button variant={plan.popular ? 'primary' : 'secondary'}>Get started</Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
