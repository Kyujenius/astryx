// Copyright (c) Meta Platforms, Inc. and affiliates.

import {VStack, HStack} from '@astryxdesign/core/Stack';
import {Button} from '@astryxdesign/core/Button';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Card} from '@astryxdesign/core/Card';
import {TabList, Tab} from '@astryxdesign/core/TabList';
import {Banner} from '@astryxdesign/core/Banner';
import {useState} from 'react';

type Step = 'cart' | 'shipping' | 'payment' | 'confirmation';

export default function CheckoutFlow() {
  const [step, setStep] = useState<Step>('cart');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [cardNum, setCardNum] = useState('');

  return (
    <div className="max-w-2xl mx-auto p-4">
      <VStack gap={4}>
        <Heading level={2}>Checkout</Heading>
        <TabList value={step} onChange={(v) => setStep(v as Step)}>
          <Tab value="cart" label="Cart" />
          <Tab value="shipping" label="Shipping" />
          <Tab value="payment" label="Payment" />
          <Tab value="confirmation" label="Done" />
        </TabList>

        {step === 'cart' && (
          <Card>
            <VStack gap={3}>
              <Heading level={3}>Cart Summary</Heading>
              <div className="flex justify-between">
                <Text>Widget Pro x2</Text>
                <Text weight="bold">$49.98</Text>
              </div>
              <div className="flex justify-between border-t pt-2">
                <Text weight="semibold">Total</Text>
                <Text weight="bold">$49.98</Text>
              </div>
              <Button label="Continue to shipping" variant="primary" onClick={() => setStep('shipping')} />
            </VStack>
          </Card>
        )}

        {step === 'shipping' && (
          <Card>
            <VStack gap={3}>
              <Heading level={3}>Shipping</Heading>
              <TextInput label="Full name" value={name} onChange={setName} isRequired />
              <TextInput label="Address" value={address} onChange={setAddress} isRequired />
              <Button label="Continue to payment" variant="primary" onClick={() => setStep('payment')} />
            </VStack>
          </Card>
        )}

        {step === 'payment' && (
          <Card>
            <VStack gap={3}>
              <Heading level={3}>Payment</Heading>
              <TextInput label="Card number" value={cardNum} onChange={setCardNum} isRequired />
              <Button label="Place order" variant="primary" onClick={() => setStep('confirmation')} />
            </VStack>
          </Card>
        )}

        {step === 'confirmation' && (
          <Card>
            <VStack gap={3}>
              <Banner status="success" title="Order confirmed" />
              <Text>Thank you for your purchase.</Text>
            </VStack>
          </Card>
        )}
      </VStack>
    </div>
  );
}
