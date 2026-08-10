// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {Card} from '@astryxdesign/core/Card';
import {SegmentedControl} from '@astryxdesign/core/SegmentedControl';
import {SegmentedControlItem} from '@astryxdesign/core/SegmentedControl';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {Badge} from '@astryxdesign/core/Badge';

const plans = [
  {name: 'Starter', monthly: 12, annual: 10, features: ['5 projects', '10GB storage', 'Email support']},
  {name: 'Pro', monthly: 29, annual: 24, features: ['Unlimited projects', '100GB storage', 'Priority support', 'Analytics'], popular: true},
  {name: 'Enterprise', monthly: 79, annual: 66, features: ['Everything in Pro', '1TB storage', 'Dedicated support', 'Custom integrations', 'SLA']},
];

export default function PricingTable() {
  const [billing, setBilling] = useState('monthly');

  return (
    <VStack gap={4} padding={4}>
      <VStack gap={2} hAlign="center">
        <Heading level={2}>Simple, transparent pricing</Heading>
        <SegmentedControl value={billing} onChange={setBilling} label="Billing period">
          <SegmentedControlItem value="monthly">Monthly</SegmentedControlItem>
          <SegmentedControlItem value="annual">Annual</SegmentedControlItem>
        </SegmentedControl>
        {billing === 'annual' && <Badge variant="success" label="Save up to 20%" />}
      </VStack>
      <HStack gap={3} hAlign="center">
        {plans.map(plan => (
          <Card key={plan.name} padding={4} elevation={plan.popular ? 'med' : 'low'} width={280}>
            <VStack gap={3}>
              <HStack gap={1} vAlign="center">
                <Heading level={4}>{plan.name}</Heading>
                {plan.popular && <Badge variant="info" label="Popular" />}
              </HStack>
              <HStack gap={0.5} vAlign="end">
                <Heading level={2}>${billing === 'monthly' ? plan.monthly : plan.annual}</Heading>
                <Text type="supporting" color="secondary">/mo</Text>
              </HStack>
              <VStack gap={1}>
                {plan.features.map(f => (
                  <Text key={f} type="body">{f}</Text>
                ))}
              </VStack>
              <Button label="Get started" variant={plan.popular ? 'primary' : 'secondary'} width="100%" />
            </VStack>
          </Card>
        ))}
      </HStack>
    </VStack>
  );
}
