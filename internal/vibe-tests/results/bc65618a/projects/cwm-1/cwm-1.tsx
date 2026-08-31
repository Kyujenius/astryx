import {useState} from 'react';
import {Card} from '@astryxdesign/core/Card';
import {Button} from '@astryxdesign/core/Button';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {SegmentedControl} from '@astryxdesign/core/SegmentedControl';
import {Badge} from '@astryxdesign/core/Badge';

const plans = [
  {name: 'Starter', monthly: 9, annual: 7, features: ['5 projects', '10GB storage', 'Email support']},
  {name: 'Pro', monthly: 29, annual: 24, features: ['Unlimited projects', '100GB storage', 'Priority support', 'Custom domains']},
  {name: 'Enterprise', monthly: 99, annual: 79, features: ['Everything in Pro', '1TB storage', 'Dedicated support', 'SSO', 'SLA']},
];

export default function PricingTable() {
  const [billing, setBilling] = useState('monthly');

  return (
    <VStack gap={4}>
      <VStack gap={2} padding={2}>
        <Heading level={2} justify="center">Pricing</Heading>
        <HStack hAlign="center">
          <SegmentedControl
            value={billing}
            onChange={setBilling}
            options={[
              {value: 'monthly', label: 'Monthly'},
              {value: 'annual', label: 'Annual'},
            ]}
          />
        </HStack>
      </VStack>
      <HStack gap={3} hAlign="center" wrap="wrap">
        {plans.map((plan) => (
          <Card key={plan.name} width={280} padding={4}>
            <VStack gap={3}>
              <VStack gap={1}>
                <Heading level={3}>{plan.name}</Heading>
                <HStack gap={1} vAlign="end">
                  <Heading level={2}>
                    ${billing === 'monthly' ? plan.monthly : plan.annual}
                  </Heading>
                  <Text color="secondary">/month</Text>
                </HStack>
                {billing === 'annual' && (
                  <Badge color="green">Save {Math.round((1 - plan.annual / plan.monthly) * 100)}%</Badge>
                )}
              </VStack>
              <VStack gap={1}>
                {plan.features.map((feature) => (
                  <Text key={feature}>{feature}</Text>
                ))}
              </VStack>
              <Button label={`Choose ${plan.name}`} variant={plan.name === 'Pro' ? 'primary' : 'secondary'} width="100%" />
            </VStack>
          </Card>
        ))}
      </HStack>
    </VStack>
  );
}
