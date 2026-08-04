// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {HStack} from '@astryxdesign/core/HStack';
import {VStack} from '@astryxdesign/core/VStack';

const plans = [
  {name: 'Free', price: '$0', period: '/mo'},
  {name: 'Starter', price: '$19', period: '/mo'},
  {name: 'Pro', price: '$49', period: '/mo'},
  {name: 'Enterprise', price: 'Custom', period: ''},
];

export default function ComparisonHeader() {
  return (
    <HStack gap={0}>
      {plans.map((plan) => (
        <VStack key={plan.name} gap={1} padding={4}>
          <Heading level={3}>{plan.name}</Heading>
          <Heading level={2} type={plan.name === 'Enterprise' ? 'display-2' : undefined}>
            {plan.price}
            {plan.period && <Text type="supporting">{plan.period}</Text>}
          </Heading>
        </VStack>
      ))}
    </HStack>
  );
}
