import {useState} from 'react';
import {SegmentedControl} from '@astryxdesign/core/SegmentedControl';
import {SegmentedControlItem} from '@astryxdesign/core/SegmentedControl';
import {Card} from '@astryxdesign/core/Card';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Divider} from '@astryxdesign/core/Divider';

interface Plan {
  name: string;
  monthly: number;
  annual: number;
  features: string[];
  highlighted?: boolean;
}

const plans: Plan[] = [
  {name: 'Starter', monthly: 9, annual: 90, features: ['5 projects', '1 GB storage', 'Email support']},
  {name: 'Pro', monthly: 29, annual: 290, features: ['Unlimited projects', '100 GB storage', 'Priority support', 'API access'], highlighted: true},
  {name: 'Enterprise', monthly: 99, annual: 990, features: ['Unlimited everything', 'Dedicated support', 'Custom integrations', 'SLA']},
];

export default function PricingTable() {
  const [billing, setBilling] = useState('monthly');

  return (
    <VStack gap={4} align="center">
      <Heading level={1}>Choose your plan</Heading>
      <SegmentedControl value={billing} onChange={setBilling} label="Billing period">
        <SegmentedControlItem value="monthly" label="Monthly" />
        <SegmentedControlItem value="annual" label="Annual" />
      </SegmentedControl>
      {billing === 'annual' && <Text color="success">Save up to 17% with annual billing</Text>}
      <HStack gap={3} align="stretch">
        {plans.map(plan => (
          <Card key={plan.name} style={{flex: 1, padding: 24}}>
            <VStack gap={3}>
              <Heading level={3}>{plan.name}</Heading>
              <Text size="xl" weight="bold">
                ${billing === 'monthly' ? plan.monthly : plan.annual}
                <Text size="sm" color="secondary">/{billing === 'monthly' ? 'mo' : 'yr'}</Text>
              </Text>
              <Divider />
              <VStack gap={1}>
                {plan.features.map(f => (
                  <Text key={f} size="sm">{f}</Text>
                ))}
              </VStack>
              <Button variant={plan.highlighted ? 'filled' : 'outlined'} style={{marginTop: 'auto'}}>
                Get Started
              </Button>
            </VStack>
          </Card>
        ))}
      </HStack>
    </VStack>
  );
}
