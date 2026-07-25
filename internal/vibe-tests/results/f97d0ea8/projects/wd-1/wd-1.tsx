// Copyright (c) Meta Platforms, Inc. and affiliates.

import {VStack, HStack} from '@astryxdesign/core/Stack';
import {Button} from '@astryxdesign/core/Button';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Card} from '@astryxdesign/core/Card';
import {SegmentedControl, SegmentedControlItem} from '@astryxdesign/core/SegmentedControl';
import {Banner} from '@astryxdesign/core/Banner';
import {useState} from 'react';

type Step = 'cart' | 'shipping' | 'payment' | 'confirmation';

export default function CheckoutFlow() {
  const [step, setStep] = useState<Step>('cart');
  const [shippingName, setShippingName] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [cardNumber, setCardNumber] = useState('');

  return (
    <VStack gap={4} padding={4} maxWidth={600}>
      <Heading level={2}>Checkout</Heading>
      <SegmentedControl value={step} onChange={(v) => setStep(v as Step)} label="Checkout steps">
        <SegmentedControlItem value="cart" label="Cart" />
        <SegmentedControlItem value="shipping" label="Shipping" />
        <SegmentedControlItem value="payment" label="Payment" />
        <SegmentedControlItem value="confirmation" label="Confirmation" />
      </SegmentedControl>

      {step === 'cart' && (
        <Card>
          <VStack gap={3}>
            <Heading level={3}>Cart Summary</Heading>
            <HStack gap={3} vAlign="center">
              <Text>Widget Pro x2</Text>
              <Text weight="semibold">$49.98</Text>
            </HStack>
            <HStack gap={3} vAlign="center">
              <Text>Gadget Mini x1</Text>
              <Text weight="semibold">$19.99</Text>
            </HStack>
            <Text type="large" weight="bold">Total: $69.97</Text>
            <Button label="Continue to shipping" variant="primary" onClick={() => setStep('shipping')} />
          </VStack>
        </Card>
      )}

      {step === 'shipping' && (
        <Card>
          <VStack gap={3}>
            <Heading level={3}>Shipping Details</Heading>
            <TextInput label="Full name" value={shippingName} onChange={setShippingName} isRequired />
            <TextInput label="Address" value={shippingAddress} onChange={setShippingAddress} isRequired />
            <Button label="Continue to payment" variant="primary" onClick={() => setStep('payment')} />
          </VStack>
        </Card>
      )}

      {step === 'payment' && (
        <Card>
          <VStack gap={3}>
            <Heading level={3}>Payment</Heading>
            <TextInput label="Card number" value={cardNumber} onChange={setCardNumber} isRequired />
            <Button label="Place order" variant="primary" onClick={() => setStep('confirmation')} />
          </VStack>
        </Card>
      )}

      {step === 'confirmation' && (
        <Card>
          <VStack gap={3}>
            <Banner status="success" title="Order placed" description="Your order has been confirmed." />
            <Text>Thank you for your purchase.</Text>
          </VStack>
        </Card>
      )}
    </VStack>
  );
}
