// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {Card} from '@astryxdesign/core/Card';
import {Button} from '@astryxdesign/core/Button';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';

type Step = 'cart' | 'shipping' | 'payment' | 'confirmation';

export default function CheckoutFlow() {
  const [step, setStep] = useState<Step>('cart');
  const [shipping, setShipping] = useState({name: '', address: '', city: '', zip: ''});
  const [payment, setPayment] = useState({card: '', expiry: '', cvv: ''});

  if (step === 'cart') {
    return (
      <Card padding={4}>
        <div className="flex flex-col gap-4">
          <Heading level={2}>Cart Summary</Heading>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between"><Text>Widget Pro x2</Text><Text>$49.98</Text></div>
            <div className="flex justify-between"><Text>Gadget Plus x1</Text><Text>$29.99</Text></div>
            <div className="flex justify-between border-t pt-2 mt-2"><Text type="label">Total</Text><Text type="label">$79.97</Text></div>
          </div>
          <Button label="Continue to Shipping" variant="primary" onClick={() => setStep('shipping')} />
        </div>
      </Card>
    );
  }

  if (step === 'shipping') {
    return (
      <Card padding={4}>
        <div className="flex flex-col gap-4">
          <Heading level={2}>Shipping</Heading>
          <TextInput label="Full Name" value={shipping.name} onChange={(v) => setShipping(s => ({...s, name: v}))} />
          <TextInput label="Address" value={shipping.address} onChange={(v) => setShipping(s => ({...s, address: v}))} />
          <div className="grid grid-cols-2 gap-3">
            <TextInput label="City" value={shipping.city} onChange={(v) => setShipping(s => ({...s, city: v}))} />
            <TextInput label="ZIP Code" value={shipping.zip} onChange={(v) => setShipping(s => ({...s, zip: v}))} />
          </div>
          <div className="flex gap-3">
            <Button label="Back" variant="secondary" onClick={() => setStep('cart')} />
            <Button label="Continue to Payment" variant="primary" onClick={() => setStep('payment')} />
          </div>
        </div>
      </Card>
    );
  }

  if (step === 'payment') {
    return (
      <Card padding={4}>
        <div className="flex flex-col gap-4">
          <Heading level={2}>Payment</Heading>
          <TextInput label="Card Number" value={payment.card} onChange={(v) => setPayment(s => ({...s, card: v}))} />
          <div className="grid grid-cols-2 gap-3">
            <TextInput label="Expiry" value={payment.expiry} onChange={(v) => setPayment(s => ({...s, expiry: v}))} placeholder="MM/YY" />
            <TextInput label="CVV" value={payment.cvv} onChange={(v) => setPayment(s => ({...s, cvv: v}))} />
          </div>
          <div className="flex gap-3">
            <Button label="Back" variant="secondary" onClick={() => setStep('shipping')} />
            <Button label="Place Order" variant="primary" onClick={() => setStep('confirmation')} />
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card padding={4}>
      <div className="flex flex-col gap-4 items-center text-center py-8">
        <Heading level={2}>Order Confirmed</Heading>
        <Text>Your order has been placed. A confirmation email will arrive shortly.</Text>
        <Text type="supporting">Order #ORD-2026-0803</Text>
      </div>
    </Card>
  );
}
