import {useState} from 'react';
import {SegmentedControl} from '@astryxdesign/core/SegmentedControl';
import {SegmentedControlItem} from '@astryxdesign/core/SegmentedControl';
import {Card} from '@astryxdesign/core/Card';
import {Stack} from '@astryxdesign/core/Stack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {Badge} from '@astryxdesign/core/Badge';
import {Divider} from '@astryxdesign/core/Divider';
import {Grid} from '@astryxdesign/core/Grid';

const plans = [
  {name: 'Starter', monthly: 12, annual: 10, features: ['5 projects', '10GB storage', 'Email support']},
  {name: 'Pro', monthly: 29, annual: 24, features: ['Unlimited projects', '100GB storage', 'Priority support', 'API access']},
  {name: 'Enterprise', monthly: 79, annual: 66, features: ['Unlimited everything', '1TB storage', 'Dedicated support', 'Custom integrations', 'SLA guarantee']},
];

export default function PricingTable() {
  const [billing, setBilling] = useState('monthly');

  return (
    <Stack direction="vertical" gap={6} padding={4} hAlign="center">
      <Stack direction="vertical" gap={2} hAlign="center">
        <Heading level={2}>Choose your plan</Heading>
        <SegmentedControl value={billing} onChange={setBilling} label="Billing period">
          <SegmentedControlItem value="monthly" label="Monthly" />
          <SegmentedControlItem value="annual" label="Annual" />
        </SegmentedControl>
        {billing === 'annual' && <Badge label="Save 20%" variant="success" />}
      </Stack>
      <Grid columns={3} gap={4}>
        {plans.map((plan) => (
          <Card key={plan.name} padding={4} elevation="low">
            <Stack direction="vertical" gap={3}>
              <Heading level={3}>{plan.name}</Heading>
              <Stack direction="horizontal" gap={1} vAlign="end">
                <Heading level={2}>
                  ${billing === 'monthly' ? plan.monthly : plan.annual}
                </Heading>
                <Text type="supporting">/month</Text>
              </Stack>
              <Divider />
              <Stack direction="vertical" gap={2}>
                {plan.features.map((feature) => (
                  <Text key={feature}>{feature}</Text>
                ))}
              </Stack>
              <Button
                label={`Get ${plan.name}`}
                variant={plan.name === 'Pro' ? 'primary' : 'secondary'}
                width="100%"
              />
            </Stack>
          </Card>
        ))}
      </Grid>
    </Stack>
  );
}
