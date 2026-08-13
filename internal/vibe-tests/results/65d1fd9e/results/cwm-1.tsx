import {useState} from 'react';
import {Card} from '@astryxdesign/core/Card';
import {Button} from '@astryxdesign/core/Button';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {SegmentedControl, SegmentedControlItem} from '@astryxdesign/core/SegmentedControl';
import {HStack} from '@astryxdesign/core/HStack';
import {VStack} from '@astryxdesign/core/VStack';

const PLANS = [
  {name: 'Starter', monthly: 9, annual: 90, features: ['5 projects', '1 GB storage', 'Email support']},
  {name: 'Pro', monthly: 29, annual: 290, features: ['50 projects', '10 GB storage', 'Priority support']},
  {name: 'Enterprise', monthly: 99, annual: 990, features: ['Unlimited projects', '100 GB storage', 'Dedicated support']},
];

export default function PricingTable() {
  const [billing, setBilling] = useState('monthly');

  return (
    <VStack gap={4}>
      <Heading level={2} justify="center">Pricing</Heading>
      <HStack gap={2} justify="center">
        <SegmentedControl label="Billing period" value={billing} onChange={setBilling}>
          <SegmentedControlItem value="monthly" label="Monthly" />
          <SegmentedControlItem value="annual" label="Annual" />
        </SegmentedControl>
      </HStack>
      <HStack gap={3} justify="center">
        {PLANS.map((plan) => (
          <Card key={plan.name} padding={4} width={260}>
            <VStack gap={2}>
              <Heading level={3}>{plan.name}</Heading>
              <Text type="display-2">
                ${billing === 'monthly' ? plan.monthly : plan.annual}
              </Text>
              <Text type="supporting" color="secondary">
                {billing === 'monthly' ? '/month' : '/year'}
              </Text>
              {plan.features.map((f) => (
                <Text key={f}>{f}</Text>
              ))}
              <Button label="Get started" variant="primary" width="100%" />
            </VStack>
          </Card>
        ))}
      </HStack>
    </VStack>
  );
}
