import React, {useState} from 'react';
import {Card} from '@astryxdesign/core/Card';
import {Button} from '@astryxdesign/core/Button';
import {TextInput} from '@astryxdesign/core/TextInput';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Divider} from '@astryxdesign/core/Divider';
import {Badge} from '@astryxdesign/core/Badge';
import {StackItem} from '@astryxdesign/core/Stack';

type Step = 'cart' | 'shipping' | 'payment' | 'confirmation';

const steps: {key: Step; label: string}[] = [
  {key: 'cart', label: 'Cart'},
  {key: 'shipping', label: 'Shipping'},
  {key: 'payment', label: 'Payment'},
  {key: 'confirmation', label: 'Confirmation'},
];

export default function CheckoutFlow() {
  const [currentStep, setCurrentStep] = useState<Step>('cart');
  const [shippingName, setShippingName] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [cardNumber, setCardNumber] = useState('');

  const stepIndex = steps.findIndex(s => s.key === currentStep);

  const goNext = () => {
    if (stepIndex < steps.length - 1) {
      setCurrentStep(steps[stepIndex + 1].key);
    }
  };

  const goBack = () => {
    if (stepIndex > 0) {
      setCurrentStep(steps[stepIndex - 1].key);
    }
  };

  return (
    <Card padding={4} maxWidth={560}>
      <VStack gap={4}>
        <HStack gap={2} hAlign="center">
          {steps.map((step, i) => (
            <React.Fragment key={step.key}>
              <Badge
                label={step.label}
                variant={i === stepIndex ? 'blue' : i < stepIndex ? 'success' : 'neutral'}
              />
              {i < steps.length - 1 && <Text color="disabled">-</Text>}
            </React.Fragment>
          ))}
        </HStack>
        <Divider />

        {currentStep === 'cart' && (
          <VStack gap={3}>
            <Heading level={2}>Cart Summary</Heading>
            <HStack gap={2} vAlign="center">
              <StackItem size="fill">
                <Text>Wireless Headphones x1</Text>
              </StackItem>
              <Text weight="semibold">$299.99</Text>
            </HStack>
            <HStack gap={2} vAlign="center">
              <StackItem size="fill">
                <Text>USB-C Cable x2</Text>
              </StackItem>
              <Text weight="semibold">$19.98</Text>
            </HStack>
            <Divider />
            <HStack gap={2} vAlign="center">
              <StackItem size="fill">
                <Text weight="bold">Total</Text>
              </StackItem>
              <Text weight="bold">$319.97</Text>
            </HStack>
          </VStack>
        )}

        {currentStep === 'shipping' && (
          <VStack gap={3}>
            <Heading level={2}>Shipping Details</Heading>
            <TextInput label="Full Name" value={shippingName} onChange={setShippingName} isRequired />
            <TextInput label="Address" value={shippingAddress} onChange={setShippingAddress} isRequired />
          </VStack>
        )}

        {currentStep === 'payment' && (
          <VStack gap={3}>
            <Heading level={2}>Payment</Heading>
            <TextInput label="Card Number" value={cardNumber} onChange={setCardNumber} isRequired />
          </VStack>
        )}

        {currentStep === 'confirmation' && (
          <VStack gap={3} hAlign="center">
            <Heading level={2}>Order Confirmed</Heading>
            <Text>Your order has been placed. You will receive a confirmation email shortly.</Text>
          </VStack>
        )}

        <HStack gap={2} hAlign="end">
          {stepIndex > 0 && currentStep !== 'confirmation' && (
            <Button label="Back" variant="ghost" onClick={goBack} />
          )}
          {currentStep !== 'confirmation' && (
            <Button label={stepIndex === steps.length - 2 ? 'Place Order' : 'Continue'} variant="primary" onClick={goNext} />
          )}
        </HStack>
      </VStack>
    </Card>
  );
}
