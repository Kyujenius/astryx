import {useState} from 'react';
import {Card} from '@astryxdesign/core/Card';
import {Text, Heading} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {SegmentedControl} from '@astryxdesign/core/SegmentedControl';
import {Stack} from '@astryxdesign/core/Stack';
import {HStack} from '@astryxdesign/core/HStack';
import {Grid} from '@astryxdesign/core/Grid';
import {Badge} from '@astryxdesign/core/Badge';
import {Divider} from '@astryxdesign/core/Divider';

const plans = [
  {name: 'Starter', monthly: 12, annual: 10, features: ['5 projects', '10GB storage', 'Email support']},
  {name: 'Pro', monthly: 29, annual: 24, features: ['Unlimited projects', '100GB storage', 'Priority support', 'API access'], popular: true},
  {name: 'Enterprise', monthly: 79, annual: 66, features: ['Unlimited everything', '1TB storage', 'Dedicated support', 'Custom integrations', 'SSO']},
];

export default function PricingTable() {
  const [billing, setBilling] = useState('monthly');

  return (
    <Stack gap="lg" align="center">
      <Stack gap="sm" align="center">
        <Heading level={2}>Choose your plan</Heading>
        <Text color="secondary">Start free, upgrade when you need to.</Text>
      </Stack>
      <SegmentedControl
        value={billing}
        onChange={setBilling}
        options={[
          {value: 'monthly', label: 'Monthly'},
          {value: 'annual', label: 'Annual (save 20%)'},
        ]}
      />
      <Grid columns={3} gap="md">
        {plans.map((plan) => (
          <Card key={plan.name}>
            <Stack gap="md">
              <HStack gap="sm" align="center">
                <Heading level={3}>{plan.name}</Heading>
                {plan.popular && <Badge>Popular</Badge>}
              </HStack>
              <HStack align="baseline" gap="xs">
                <Heading level={2}>
                  ${billing === 'monthly' ? plan.monthly : plan.annual}
                </Heading>
                <Text color="secondary">/month</Text>
              </HStack>
              {billing === 'annual' && (
                <Text size="sm" color="secondary">Billed annually</Text>
              )}
              <Divider />
              <Stack gap="xs">
                {plan.features.map((feature) => (
                  <Text key={feature} size="sm">{feature}</Text>
                ))}
              </Stack>
              <Button variant={plan.popular ? 'filled' : 'outlined'} isFullWidth>
                Get started
              </Button>
            </Stack>
          </Card>
        ))}
      </Grid>
    </Stack>
  );
}
