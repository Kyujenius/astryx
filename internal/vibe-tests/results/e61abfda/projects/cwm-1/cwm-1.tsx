import {useState} from 'react';
import {Card} from '@astryxdesign/core/Card';
import {Button} from '@astryxdesign/core/Button';
import {Text} from '@astryxdesign/core/Text';
import {Heading} from '@astryxdesign/core/Heading';
import {SegmentedControl} from '@astryxdesign/core/SegmentedControl';
import {Badge} from '@astryxdesign/core/Badge';

interface Plan {
  name: string;
  monthly: number;
  annual: number;
  features: string[];
  popular?: boolean;
}

const plans: Plan[] = [
  {name: 'Starter', monthly: 9, annual: 90, features: ['5 projects', '1 GB storage', 'Email support']},
  {name: 'Pro', monthly: 29, annual: 290, features: ['Unlimited projects', '100 GB storage', 'Priority support', 'API access'], popular: true},
  {name: 'Enterprise', monthly: 99, annual: 990, features: ['Unlimited everything', 'Dedicated account manager', 'SLA', 'Custom integrations']},
];

export default function PricingTable() {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');

  return (
    <div className="flex flex-col items-center gap-6">
      <Heading level={1}>Pricing</Heading>
      <SegmentedControl
        label="Billing period"
        value={billing}
        onChange={(v) => setBilling(v as 'monthly' | 'annual')}
        options={[
          {value: 'monthly', label: 'Monthly'},
          {value: 'annual', label: 'Annual (save 17%)'},
        ]}
      />
      <div className="flex gap-4 flex-wrap justify-center">
        {plans.map((plan) => (
          <Card key={plan.name} padding={4} width={280} elevation={plan.popular ? 'med' : 'none'}>
            <div className="flex items-center gap-2">
              <Heading level={3}>{plan.name}</Heading>
              {plan.popular && <Badge variant="info" label="Popular" />}
            </div>
            <Text type="display-3" display="block">
              ${billing === 'monthly' ? plan.monthly : plan.annual}
            </Text>
            <Text type="supporting" color="secondary" display="block">
              per {billing === 'monthly' ? 'month' : 'year'}
            </Text>
            {plan.features.map((f) => (
              <Text key={f} display="block">{f}</Text>
            ))}
            <Button
              label={plan.popular ? 'Get started' : 'Choose plan'}
              variant={plan.popular ? 'primary' : 'secondary'}
              width="100%"
            />
          </Card>
        ))}
      </div>
    </div>
  );
}
