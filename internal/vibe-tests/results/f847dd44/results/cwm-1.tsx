import {useState} from 'react';
import {SegmentedControl} from '@astryxdesign/core/SegmentedControl';
import {SegmentedControlItem} from '@astryxdesign/core/SegmentedControl';
import {Card} from '@astryxdesign/core/Card';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {Badge} from '@astryxdesign/core/Badge';
import {HStack} from '@astryxdesign/core/HStack';
import {VStack} from '@astryxdesign/core/VStack';
import {Divider} from '@astryxdesign/core/Divider';

const plans = [
  {name: 'Starter', monthly: 9, annual: 7, features: ['5 projects', '10 GB storage', 'Email support']},
  {name: 'Pro', monthly: 29, annual: 23, features: ['Unlimited projects', '100 GB storage', 'Priority support', 'API access'], popular: true},
  {name: 'Enterprise', monthly: 99, annual: 79, features: ['Unlimited everything', '1 TB storage', 'Dedicated support', 'Custom integrations', 'SLA']},
];

export default function PricingTable() {
  const [billing, setBilling] = useState('monthly');

  return (
    <VStack gap="lg" align="center">
      <VStack gap="sm" align="center">
        <Heading level={2}>Pricing</Heading>
        <Text type="supporting">Choose the plan that fits your needs</Text>
      </VStack>
      <SegmentedControl value={billing} onChange={setBilling} label="Billing period">
        <SegmentedControlItem value="monthly" label="Monthly" />
        <SegmentedControlItem value="annual" label="Annual" />
      </SegmentedControl>
      <HStack gap="lg" wrap="wrap" align="stretch">
        {plans.map((plan) => (
          <Card key={plan.name}>
            <VStack gap="md">
              <HStack gap="sm" align="center">
                <Heading level={3}>{plan.name}</Heading>
                {plan.popular && <Badge label="Popular" variant="info" />}
              </HStack>
              <HStack gap="xs" align="end">
                <Heading level={2}>${billing === 'monthly' ? plan.monthly : plan.annual}</Heading>
                <Text type="supporting">/month</Text>
              </HStack>
              {billing === 'annual' && (
                <Text type="supporting">Billed annually (save {Math.round((1 - plan.annual / plan.monthly) * 100)}%)</Text>
              )}
              <Divider />
              <VStack gap="sm">
                {plan.features.map((f) => (
                  <Text key={f}>{f}</Text>
                ))}
              </VStack>
              <Button label={`Get ${plan.name}`} variant={plan.popular ? 'primary' : 'secondary'} />
            </VStack>
          </Card>
        ))}
      </HStack>
    </VStack>
  );
}
