import {useState} from 'react';
import {Stack} from '@astryxdesign/core/Stack';
import {HStack} from '@astryxdesign/core/HStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {Card} from '@astryxdesign/core/Card';
import {Badge} from '@astryxdesign/core/Badge';
import {Divider} from '@astryxdesign/core/Divider';
import {SegmentedControl} from '@astryxdesign/core/SegmentedControl';

type Billing = 'monthly' | 'annual';

const plans = [
  {
    name: 'Starter',
    monthly: 9,
    annual: 7,
    features: ['5 projects', '1 GB storage', 'Email support'],
  },
  {
    name: 'Pro',
    monthly: 29,
    annual: 24,
    features: ['Unlimited projects', '100 GB storage', 'Priority support', 'API access'],
    popular: true,
  },
  {
    name: 'Enterprise',
    monthly: 99,
    annual: 79,
    features: ['Unlimited everything', '1 TB storage', 'Dedicated support', 'Custom integrations', 'SLA'],
  },
];

export default function PricingTable() {
  const [billing, setBilling] = useState<Billing>('monthly');

  return (
    <Stack gap={4} padding={4} align="center">
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

      <HStack gap={3} wrap="wrap" justify="center">
        {plans.map(plan => {
          const price = billing === 'monthly' ? plan.monthly : plan.annual;
          return (
            <Card key={plan.name} width={300} padding={4}>
              <Stack gap={3}>
                <HStack justify="space-between" align="center">
                  <Heading level={3}>{plan.name}</Heading>
                  {plan.popular && <Badge variant="accent">Popular</Badge>}
                </HStack>
                <HStack align="baseline" gap={0.5}>
                  <Text size="3xl" weight="bold">${price}</Text>
                  <Text color="secondary">/mo</Text>
                </HStack>
                {billing === 'annual' && (
                  <Text type="supporting" color="accent">
                    Billed ${price * 12}/year
                  </Text>
                )}
                <Divider />
                <Stack gap={1}>
                  {plan.features.map(f => (
                    <Text key={f}>✓ {f}</Text>
                  ))}
                </Stack>
                <Button variant={plan.popular ? 'primary' : 'secondary'}>
                  Get started
                </Button>
              </Stack>
            </Card>
          );
        })}
      </HStack>
    </Stack>
  );
}
