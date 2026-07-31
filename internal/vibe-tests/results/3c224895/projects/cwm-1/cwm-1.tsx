import {useState} from 'react';
import {Card} from '@astryxdesign/core/Card';
import {Button} from '@astryxdesign/core/Button';
import {HStack} from '@astryxdesign/core/HStack';
import {VStack} from '@astryxdesign/core/VStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {SegmentedControl} from '@astryxdesign/core/SegmentedControl';
import * as stylex from '@stylexjs/stylex';

const styles = stylex.create({
  container: {
    padding: '32px',
    maxWidth: '900px',
    margin: '0 auto',
  },
  header: {
    textAlign: 'center',
    marginBottom: '32px',
  },
});

const plans = [
  {name: 'Starter', monthly: 12, annual: 10, features: ['5 projects', '10GB storage', 'Email support']},
  {name: 'Pro', monthly: 29, annual: 24, features: ['Unlimited projects', '100GB storage', 'Priority support', 'API access']},
  {name: 'Enterprise', monthly: 79, annual: 66, features: ['Unlimited everything', '1TB storage', '24/7 support', 'Custom integrations', 'SLA']},
];

export default function PricingTable() {
  const [billing, setBilling] = useState('monthly');

  return (
    <div {...stylex.props(styles.container)}>
      <VStack gap={4} hAlign="center">
        <div {...stylex.props(styles.header)}>
          <Heading level={2}>Choose your plan</Heading>
          <Text color="secondary">Start free, upgrade when you need more.</Text>
        </div>
        <SegmentedControl
          value={billing}
          onChange={setBilling}
          options={[
            {value: 'monthly', label: 'Monthly'},
            {value: 'annual', label: 'Annual (save 20%)'},
          ]}
        />
        <HStack gap={4}>
          {plans.map((plan) => (
            <Card key={plan.name} padding={4} width={280}>
              <VStack gap={3}>
                <Heading level={3}>{plan.name}</Heading>
                <HStack gap={0.5} vAlign="end">
                  <Heading level={2}>
                    ${billing === 'monthly' ? plan.monthly : plan.annual}
                  </Heading>
                  <Text color="secondary">/mo</Text>
                </HStack>
                <VStack gap={1}>
                  {plan.features.map((f) => (
                    <Text key={f}>{f}</Text>
                  ))}
                </VStack>
                <Button label={`Choose ${plan.name}`} variant="primary" width="100%" />
              </VStack>
            </Card>
          ))}
        </HStack>
      </VStack>
    </div>
  );
}
