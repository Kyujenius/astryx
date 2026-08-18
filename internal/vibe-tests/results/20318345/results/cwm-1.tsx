import {Card} from '@astryxdesign/core/Card';
import {Button} from '@astryxdesign/core/Button';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {useState} from 'react';

const plans = [
  { name: 'Starter', monthly: 12, annual: 120, features: ['5 projects', '10GB storage', 'Email support'] },
  { name: 'Pro', monthly: 29, annual: 290, features: ['Unlimited projects', '100GB storage', 'Priority support', 'API access'] },
  { name: 'Enterprise', monthly: 99, annual: 990, features: ['Unlimited everything', 'Dedicated support', 'Custom integrations', 'SSO', 'SLA'] },
];

export default function PricingTable() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <VStack gap={4} hAlign="center" padding={4}>
      <Heading level={2}>Choose your plan</Heading>
      <HStack gap={2} vAlign="center">
        <Text weight={!isAnnual ? 'bold' : 'normal'}>Monthly</Text>
        <button
          role="switch"
          aria-checked={isAnnual}
          onClick={() => setIsAnnual(!isAnnual)}
          style={{ width: 48, height: 24, borderRadius: 12, background: isAnnual ? 'var(--color-accent)' : 'var(--color-border)', position: 'relative', border: 'none', cursor: 'pointer' }}
        >
          <span style={{ position: 'absolute', top: 2, left: isAnnual ? 26 : 2, width: 20, height: 20, borderRadius: 10, background: 'white', transition: 'left 0.2s' }} />
        </button>
        <Text weight={isAnnual ? 'bold' : 'normal'}>Annual</Text>
      </HStack>
      <HStack gap={4} wrap="wrap" hAlign="center">
        {plans.map((plan) => (
          <Card key={plan.name} padding={4} elevation="low" width={280}>
            <VStack gap={3}>
              <Heading level={3}>{plan.name}</Heading>
              <HStack gap={0.5} vAlign="end">
                <Heading level={2}>${isAnnual ? plan.annual : plan.monthly}</Heading>
                <Text color="secondary">/{isAnnual ? 'year' : 'month'}</Text>
              </HStack>
              <VStack gap={1}>
                {plan.features.map((f) => (
                  <Text key={f}>✓ {f}</Text>
                ))}
              </VStack>
              <Button label={`Choose ${plan.name}`} variant="primary" width="100%" />
            </VStack>
          </Card>
        ))}
      </HStack>
    </VStack>
  );
}
