import React from 'react';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {HStack} from '@astryxdesign/core/HStack';
import {VStack} from '@astryxdesign/core/VStack';
import {Badge} from '@astryxdesign/core/Badge';
import {Card} from '@astryxdesign/core/Card';
import {StackItem} from '@astryxdesign/core/Stack';

const plans = [
  {name: 'Starter', price: '$9', period: '/month', highlight: false},
  {name: 'Pro', price: '$29', period: '/month', highlight: false},
  {name: 'Enterprise', price: 'Custom', period: '', highlight: true},
];

export default function PricingHeader() {
  return (
    <HStack gap={3} wrap="wrap" hAlign="center">
      {plans.map(plan => (
        <StackItem key={plan.name} size="fill">
          <Card
            padding={4}
            variant={plan.highlight ? 'blue' : 'default'}
            elevation={plan.highlight ? 'med' : 'none'}
          >
            <VStack gap={2} hAlign="center">
              {plan.highlight && <Badge label="Most Popular" variant="blue" />}
              <Heading level={3} justify="center">{plan.name}</Heading>
              <HStack gap={0.5} vAlign="end" hAlign="center">
                <Heading level={2}>{plan.price}</Heading>
                {plan.period && <Text type="supporting">{plan.period}</Text>}
              </HStack>
              {plan.name === 'Enterprise' && (
                <Text type="supporting" justify="center">Contact sales for pricing</Text>
              )}
            </VStack>
          </Card>
        </StackItem>
      ))}
    </HStack>
  );
}
