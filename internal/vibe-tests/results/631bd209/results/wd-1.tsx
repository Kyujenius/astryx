import {useState} from 'react';
import {Button} from '@astryxdesign/core/Button';
import {Card} from '@astryxdesign/core/Card';
import {Text, Heading} from '@astryxdesign/core/Text';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Stack} from '@astryxdesign/core/Stack';
import {HStack} from '@astryxdesign/core/HStack';
import {Divider} from '@astryxdesign/core/Divider';
import {TabList} from '@astryxdesign/core/TabList';
import {Banner} from '@astryxdesign/core/Banner';

type Step = 'cart' | 'shipping' | 'payment' | 'confirmation';

const steps: {value: Step; label: string}[] = [
  {value: 'cart', label: 'Cart'},
  {value: 'shipping', label: 'Shipping'},
  {value: 'payment', label: 'Payment'},
  {value: 'confirmation', label: 'Confirmation'},
];

export default function CheckoutFlow() {
  const [currentStep, setCurrentStep] = useState<Step>('cart');

  return (
    <Stack gap="lg">
      <Heading level={1}>Checkout</Heading>
      <TabList
        value={currentStep}
        onChange={(v) => setCurrentStep(v as Step)}
        tabs={steps.map((s) => ({value: s.value, label: s.label}))}
      />
      {currentStep === 'cart' && (
        <Card>
          <Stack gap="md">
            <Heading level={2}>Cart Summary</Heading>
            <HStack justify="space-between">
              <Text>Widget Pro x2</Text>
              <Text>$49.98</Text>
            </HStack>
            <HStack justify="space-between">
              <Text>Gadget Lite x1</Text>
              <Text>$19.99</Text>
            </HStack>
            <Divider />
            <HStack justify="space-between">
              <Text weight="bold">Total</Text>
              <Text weight="bold">$69.97</Text>
            </HStack>
            <Button variant="filled" onPress={() => setCurrentStep('shipping')}>Continue to Shipping</Button>
          </Stack>
        </Card>
      )}
      {currentStep === 'shipping' && (
        <Card>
          <Stack gap="md">
            <Heading level={2}>Shipping Address</Heading>
            <TextInput label="Full name" />
            <TextInput label="Address" />
            <HStack gap="md">
              <TextInput label="City" />
              <TextInput label="Zip code" />
            </HStack>
            <Button variant="filled" onPress={() => setCurrentStep('payment')}>Continue to Payment</Button>
          </Stack>
        </Card>
      )}
      {currentStep === 'payment' && (
        <Card>
          <Stack gap="md">
            <Heading level={2}>Payment</Heading>
            <TextInput label="Card number" placeholder="1234 5678 9012 3456" />
            <HStack gap="md">
              <TextInput label="Expiry" placeholder="MM/YY" />
              <TextInput label="CVC" placeholder="123" />
            </HStack>
            <Button variant="filled" onPress={() => setCurrentStep('confirmation')}>Place Order</Button>
          </Stack>
        </Card>
      )}
      {currentStep === 'confirmation' && (
        <Card>
          <Stack gap="md" align="center">
            <Banner variant="success">Order placed successfully!</Banner>
            <Heading level={2}>Thank you!</Heading>
            <Text color="secondary">Your order #12345 has been confirmed.</Text>
          </Stack>
        </Card>
      )}
    </Stack>
  );
}
