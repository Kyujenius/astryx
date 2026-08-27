import {useState} from 'react';
import {Card} from '@astryxdesign/core/Card';
import {Button} from '@astryxdesign/core/Button';
import {HStack} from '@astryxdesign/core/HStack';
import {VStack} from '@astryxdesign/core/VStack';
import {Heading, Text} from '@astryxdesign/core/Text';
import {Badge} from '@astryxdesign/core/Badge';

const plans = [
  {name: 'Starter', monthly: 12, annual: 120, features: ['5 projects', '10GB storage', 'Email support']},
  {name: 'Pro', monthly: 29, annual: 290, features: ['Unlimited projects', '100GB storage', 'Priority support', 'API access']},
  {name: 'Enterprise', monthly: 99, annual: 990, features: ['Unlimited everything', '1TB storage', 'Dedicated support', 'SSO', 'Custom contracts']},
];

export default function PricingTable() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <VStack gap={6} padding={6}>
      <VStack gap={2} hAlign="center">
        <Heading level={1}>Pricing</Heading>
        <HStack gap={2} vAlign="center">
          <Button
            label="Monthly"
            variant={!isAnnual ? 'primary' : 'ghost'}
            onClick={() => setIsAnnual(false)}
          />
          <Button
            label="Annual"
            variant={isAnnual ? 'primary' : 'ghost'}
            onClick={() => setIsAnnual(true)}
          />
          {isAnnual && <Badge label="Save 17%" variant="success" />}
        </HStack>
      </VStack>
      <HStack gap={4} wrap="wrap" hAlign="center">
        {plans.map(plan => (
          <Card key={plan.name} padding={5} width={300} elevation="low">
            <VStack gap={3}>
              <Heading level={3}>{plan.name}</Heading>
              <HStack gap={1} vAlign="end">
                <Heading level={2}>${isAnnual ? plan.annual : plan.monthly}</Heading>
                <Text color="secondary">/{isAnnual ? 'year' : 'month'}</Text>
              </HStack>
              <VStack gap={1}>
                {plan.features.map(f => (
                  <Text key={f}>{f}</Text>
                ))}
              </VStack>
              <Button label="Get started" variant="primary" width="100%" />
            </VStack>
          </Card>
        ))}
      </HStack>
    </VStack>
  );
}
