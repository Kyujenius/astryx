// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';
import {useState} from 'react';
import {Card} from '@astryxdesign/core/Card';
import {Button} from '@astryxdesign/core/Button';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {HStack} from '@astryxdesign/core/HStack';
import {VStack} from '@astryxdesign/core/VStack';
import {TabList, Tab} from '@astryxdesign/core/TabList';

type Step = 'cart' | 'shipping' | 'payment' | 'confirmation';

const cartItems = [
  {name: 'Wireless Mouse', price: 29.99, qty: 1},
  {name: 'USB-C Cable', price: 12.99, qty: 2},
];

export default function CheckoutFlow() {
  const [step, setStep] = useState<Step>('cart');
  const [shipping, setShipping] = useState({name: '', address: '', city: '', zip: ''});
  const [payment, setPayment] = useState({card: '', expiry: '', cvv: ''});

  const total = cartItems.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <VStack gap={4} padding={4}>
      <Heading level={2}>Checkout</Heading>
      <TabList value={step} onChange={(v) => setStep(v as Step)}>
        <Tab value="cart" label="Cart" />
        <Tab value="shipping" label="Shipping" />
        <Tab value="payment" label="Payment" />
        <Tab value="confirmation" label="Confirmation" />
      </TabList>

      {step === 'cart' && (
        <Card padding={4}>
          <VStack gap={3}>
            <Heading level={3}>Cart Summary</Heading>
            {cartItems.map((item) => (
              <HStack key={item.name} gap={2}>
                <Text>{item.name} x{item.qty}</Text>
                <Text weight="semibold">${(item.price * item.qty).toFixed(2)}</Text>
              </HStack>
            ))}
            <Text type="large" weight="bold">Total: ${total.toFixed(2)}</Text>
            <Button label="Continue to shipping" variant="primary" onClick={() => setStep('shipping')} />
          </VStack>
        </Card>
      )}

      {step === 'shipping' && (
        <Card padding={4}>
          <VStack gap={3}>
            <Heading level={3}>Shipping Address</Heading>
            <TextInput label="Full Name" value={shipping.name} onChange={(v) => setShipping({...shipping, name: v})} isRequired />
            <TextInput label="Address" value={shipping.address} onChange={(v) => setShipping({...shipping, address: v})} isRequired />
            <HStack gap={2}>
              <TextInput label="City" value={shipping.city} onChange={(v) => setShipping({...shipping, city: v})} isRequired />
              <TextInput label="ZIP Code" value={shipping.zip} onChange={(v) => setShipping({...shipping, zip: v})} isRequired />
            </HStack>
            <Button label="Continue to payment" variant="primary" onClick={() => setStep('payment')} />
          </VStack>
        </Card>
      )}

      {step === 'payment' && (
        <Card padding={4}>
          <VStack gap={3}>
            <Heading level={3}>Payment Details</Heading>
            <TextInput label="Card Number" value={payment.card} onChange={(v) => setPayment({...payment, card: v})} isRequired />
            <HStack gap={2}>
              <TextInput label="Expiry" value={payment.expiry} onChange={(v) => setPayment({...payment, expiry: v})} isRequired />
              <TextInput label="CVV" value={payment.cvv} onChange={(v) => setPayment({...payment, cvv: v})} isRequired />
            </HStack>
            <Button label="Place order" variant="primary" onClick={() => setStep('confirmation')} />
          </VStack>
        </Card>
      )}

      {step === 'confirmation' && (
        <Card padding={4}>
          <VStack gap={3}>
            <Heading level={3}>Order Confirmed</Heading>
            <Text>Your order has been placed. A confirmation email will be sent shortly.</Text>
            <Text type="supporting">Order total: ${total.toFixed(2)}</Text>
          </VStack>
        </Card>
      )}
    </VStack>
  );
}
