import {useState} from 'react';
import {SegmentedControl} from '@astryxdesign/core/SegmentedControl';
import {SegmentedControlItem} from '@astryxdesign/core/SegmentedControl';
import {Card} from '@astryxdesign/core/Card';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Text} from '@astryxdesign/core/Text';
import {Heading} from '@astryxdesign/core/Heading';
import {Button} from '@astryxdesign/core/Button';
import {Badge} from '@astryxdesign/core/Badge';
import {Grid} from '@astryxdesign/core/Grid';

interface Plan {
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  features: string[];
  isPopular?: boolean;
}

const plans: Plan[] = [
  {name: 'Starter', monthlyPrice: 12, annualPrice: 10, features: ['5 projects', '1GB storage', 'Email support']},
  {name: 'Pro', monthlyPrice: 24, annualPrice: 20, features: ['Unlimited projects', '10GB storage', 'Priority support', 'API access'], isPopular: true},
  {name: 'Enterprise', monthlyPrice: 48, annualPrice: 40, features: ['Unlimited everything', '100GB storage', 'Dedicated support', 'SSO', 'Custom integrations']},
];

export default function PricingTable() {
  const [billing, setBilling] = useState('monthly');

  return (
    <VStack gap={6} padding={4}>
      <VStack gap={2} align="center">
        <Heading level={1}>Pricing</Heading>
        <Text type="large" color="secondary">Choose the plan that works for you</Text>
        <SegmentedControl value={billing} onChange={setBilling} label="Billing period">
          <SegmentedControlItem value="monthly">Monthly</SegmentedControlItem>
          <SegmentedControlItem value="annual">Annual</SegmentedControlItem>
        </SegmentedControl>
      </VStack>
      <Grid columns={3} gap={4}>
        {plans.map((plan) => {
          const price = billing === 'monthly' ? plan.monthlyPrice : plan.annualPrice;
          return (
            <Card key={plan.name} padding={4} elevation={plan.isPopular ? 'med' : 'none'}>
              <VStack gap={3}>
                <HStack gap={2} align="center">
                  <Heading level={3}>{plan.name}</Heading>
                  {plan.isPopular && <Badge variant="accent">Popular</Badge>}
                </HStack>
                <HStack gap={1} align="end">
                  <Heading level={2}>${price}</Heading>
                  <Text color="secondary">/mo</Text>
                </HStack>
                {billing === 'annual' && <Text type="supporting" color="accent">Save ${(plan.monthlyPrice - plan.annualPrice) * 12}/year</Text>}
                <VStack gap={1}>
                  {plan.features.map(f => <Text key={f}>{f}</Text>)}
                </VStack>
                <Button label="Get Started" variant={plan.isPopular ? 'primary' : 'secondary'} />
              </VStack>
            </Card>
          );
        })}
      </Grid>
    </VStack>
  );
}
