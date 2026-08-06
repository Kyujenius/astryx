import {Card} from '@astryxdesign/core/Card';
import {Button} from '@astryxdesign/core/Button';
import {SegmentedControl, SegmentedControlItem} from '@astryxdesign/core/SegmentedControl';
import {Stack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import {Badge} from '@astryxdesign/core/Badge';
import {Divider} from '@astryxdesign/core/Divider';
import {useState} from 'react';

const plans = [
  {name: 'Starter', monthly: 12, annual: 10, features: ['5 projects', '10 GB storage', 'Email support']},
  {name: 'Pro', monthly: 29, annual: 24, features: ['Unlimited projects', '100 GB', 'Priority support', 'API access'], popular: true},
  {name: 'Enterprise', monthly: 79, annual: 66, features: ['Unlimited everything', 'Dedicated support', 'Custom integrations', 'SLA']},
];

export default function PricingTable() {
  const [billing, setBilling] = useState('monthly');
  return (
    <Stack gap={4} align="center">
      <SegmentedControl label="Billing period" value={billing} onChange={setBilling}>
        <SegmentedControlItem value="monthly" label="Monthly" />
        <SegmentedControlItem value="annual" label="Annual (save 17%)" />
      </SegmentedControl>
      <Stack direction="row" gap={3}>
        {plans.map(plan => (
          <Card key={plan.name} padding={4} elevation={plan.popular ? 'med' : 'none'}>
            <Stack gap={3}>
              <Stack direction="row" gap={1} align="center">
                <Text variant="headingMd">{plan.name}</Text>
                {plan.popular && <Badge variant="info">Popular</Badge>}
              </Stack>
              <Text variant="displaySm">${billing === 'monthly' ? plan.monthly : plan.annual}/mo</Text>
              <Divider />
              <Stack gap={1}>{plan.features.map(f => <Text key={f} variant="bodySm">{f}</Text>)}</Stack>
              <Button label={`Choose ${plan.name}`} variant={plan.popular ? 'primary' : 'secondary'} />
            </Stack>
          </Card>
        ))}
      </Stack>
    </Stack>
  );
}