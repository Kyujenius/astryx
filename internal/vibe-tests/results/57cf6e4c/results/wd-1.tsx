import {useState} from 'react';
import {Button} from '@astryxdesign/core/Button';
import {Stack} from '@astryxdesign/core/Stack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Card} from '@astryxdesign/core/Card';
import {Divider} from '@astryxdesign/core/Divider';
import {Badge} from '@astryxdesign/core/Badge';
import {HStack} from '@astryxdesign/core/HStack';

type Step = 'cart' | 'shipping' | 'payment' | 'confirmation';

export default function CheckoutFlow() {
  const [step, setStep] = useState<Step>('cart');

  const steps: Step[] = ['cart', 'shipping', 'payment', 'confirmation'];
  const currentIndex = steps.indexOf(step);

  return (
    <Stack gap={4} padding={4}>
      <HStack gap={2} align="center">
        {steps.map((s, i) => (
          <Badge
            key={s}
            variant={i <= currentIndex ? 'accent' : 'neutral'}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </Badge>
        ))}
      </HStack>

      <Divider />

      {step === 'cart' && (
        <Card>
          <Stack gap={3}>
            <Heading level={2}>Cart Summary</Heading>
            <HStack justify="space-between">
              <Text>Widget Pro × 2</Text>
              <Text weight="semibold">$59.98</Text>
            </HStack>
            <HStack justify="space-between">
              <Text>Gadget Lite × 1</Text>
              <Text weight="semibold">$24.99</Text>
            </HStack>
            <Divider />
            <HStack justify="space-between">
              <Text weight="bold">Total</Text>
              <Text weight="bold">$84.97</Text>
            </HStack>
            <Button onPress={() => setStep('shipping')}>Continue to Shipping</Button>
          </Stack>
        </Card>
      )}

      {step === 'shipping' && (
        <Card>
          <Stack gap={3}>
            <Heading level={2}>Shipping Address</Heading>
            <TextInput label="Full Name" placeholder="Jane Doe" />
            <TextInput label="Address" placeholder="123 Main St" />
            <HStack gap={2}>
              <TextInput label="City" placeholder="San Francisco" />
              <TextInput label="Zip Code" placeholder="94105" />
            </HStack>
            <HStack gap={2}>
              <Button variant="ghost" onPress={() => setStep('cart')}>Back</Button>
              <Button onPress={() => setStep('payment')}>Continue to Payment</Button>
            </HStack>
          </Stack>
        </Card>
      )}

      {step === 'payment' && (
        <Card>
          <Stack gap={3}>
            <Heading level={2}>Payment</Heading>
            <TextInput label="Card Number" placeholder="4242 4242 4242 4242" />
            <HStack gap={2}>
              <TextInput label="Expiry" placeholder="MM/YY" />
              <TextInput label="CVC" placeholder="123" />
            </HStack>
            <HStack gap={2}>
              <Button variant="ghost" onPress={() => setStep('shipping')}>Back</Button>
              <Button onPress={() => setStep('confirmation')}>Place Order</Button>
            </HStack>
          </Stack>
        </Card>
      )}

      {step === 'confirmation' && (
        <Card>
          <Stack gap={3} align="center">
            <Heading level={2}>Order Confirmed!</Heading>
            <Text color="secondary">
              Your order has been placed successfully. You will receive a confirmation email shortly.
            </Text>
            <Text type="supporting">Order #ORD-2026-0842</Text>
          </Stack>
        </Card>
      )}
    </Stack>
  );
}
