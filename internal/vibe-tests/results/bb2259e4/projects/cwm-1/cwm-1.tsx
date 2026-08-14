import {Card} from '@astryxdesign/core/Card';
import {Grid} from '@astryxdesign/core/Grid';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Text} from '@astryxdesign/core/Text';
import {Heading} from '@astryxdesign/core/Heading';
import {Button} from '@astryxdesign/core/Button';
import {SegmentedControl} from '@astryxdesign/core/SegmentedControl';
import {Divider} from '@astryxdesign/core/Divider';
import {Badge} from '@astryxdesign/core/Badge';
import {useState} from 'react';

const plans = [
  {
    name: 'Starter',
    monthly: 12,
    annual: 10,
    features: ['5 projects', '10GB storage', 'Email support'],
  },
  {
    name: 'Pro',
    monthly: 29,
    annual: 24,
    features: ['Unlimited projects', '100GB storage', 'Priority support', 'API access'],
    popular: true,
  },
  {
    name: 'Enterprise',
    monthly: 79,
    annual: 66,
    features: ['Everything in Pro', '1TB storage', 'Dedicated account manager', 'SLA'],
  },
];

export default function PricingTable() {
  const [billing, setBilling] = useState('monthly');

  return (
    <VStack gap={4}>
      <VStack gap={2} align="center">
        <Heading level={2}>Choose your plan</Heading>
        <SegmentedControl
          value={billing}
          onChange={setBilling}
          options={[
            {value: 'monthly', label: 'Monthly'},
            {value: 'annual', label: 'Annual'},
          ]}
        />
        {billing === 'annual' && (
          <Badge color="green">Save up to 20%</Badge>
        )}
      </VStack>
      <Grid columns={{minWidth: 280, max: 3}} gap={3}>
        {plans.map((plan) => (
          <Card key={plan.name} padding={4}>
            <VStack gap={3}>
              <HStack gap={2} align="center">
                <Heading level={3}>{plan.name}</Heading>
                {plan.popular && <Badge color="blue">Popular</Badge>}
              </HStack>
              <HStack align="end" gap={0.5}>
                <Heading level={2}>
                  ${billing === 'monthly' ? plan.monthly : plan.annual}
                </Heading>
                <Text color="secondary">/month</Text>
              </HStack>
              {billing === 'annual' && (
                <Text type="supporting" color="secondary">
                  Billed annually
                </Text>
              )}
              <Divider />
              <VStack gap={1}>
                {plan.features.map((feature) => (
                  <Text key={feature}>✓ {feature}</Text>
                ))}
              </VStack>
              <Button variant={plan.popular ? 'primary' : 'secondary'} width="full">
                Get started
              </Button>
            </VStack>
          </Card>
        ))}
      </Grid>
    </VStack>
  );
}
