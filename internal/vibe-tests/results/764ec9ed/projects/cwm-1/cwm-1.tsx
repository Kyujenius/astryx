// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';
import {useState} from 'react';
import {Card} from '@astryxdesign/core/Card';
import {Button} from '@astryxdesign/core/Button';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {HStack} from '@astryxdesign/core/HStack';
import {VStack} from '@astryxdesign/core/VStack';
import {SegmentedControl} from '@astryxdesign/core/SegmentedControl';

const plans = [
  {name: 'Starter', monthly: 9, annual: 7, features: ['5 projects', '1GB storage', 'Email support']},
  {name: 'Pro', monthly: 29, annual: 23, features: ['25 projects', '10GB storage', 'Priority support', 'API access']},
  {name: 'Enterprise', monthly: 99, annual: 79, features: ['Unlimited projects', '100GB storage', '24/7 support', 'Custom integrations', 'SSO']},
];

export default function PricingTable() {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');

  return (
    <VStack gap={4} padding={4}>
      <VStack gap={2}>
        <Heading level={2} justify="center">Choose your plan</Heading>
        <HStack gap={2}>
          <SegmentedControl
            value={billing}
            onChange={(v) => setBilling(v as 'monthly' | 'annual')}
          >
            <SegmentedControl.Item value="monthly" label="Monthly" />
            <SegmentedControl.Item value="annual" label="Annual (save 20%)" />
          </SegmentedControl>
        </HStack>
      </VStack>
      <HStack gap={3}>
        {plans.map((plan) => (
          <Card key={plan.name} padding={4}>
            <VStack gap={3}>
              <Heading level={3}>{plan.name}</Heading>
              <Text type="display-2">
                ${billing === 'monthly' ? plan.monthly : plan.annual}
                <Text type="supporting">/mo</Text>
              </Text>
              <VStack gap={1}>
                {plan.features.map((f) => (
                  <Text key={f}>{f}</Text>
                ))}
              </VStack>
              <Button
                label={plan.name === 'Enterprise' ? 'Contact sales' : 'Get started'}
                variant={plan.name === 'Pro' ? 'primary' : 'secondary'}
              />
            </VStack>
          </Card>
        ))}
      </HStack>
    </VStack>
  );
}
