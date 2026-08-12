import {useState} from 'react';
import {Card} from '@astryxdesign/core/Card';
import {Button} from '@astryxdesign/core/Button';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';

type Step = 'cart' | 'shipping' | 'payment' | 'confirmation';

export default function CheckoutFlow() {
  const [step, setStep] = useState<Step>('cart');
  const [shipping, setShipping] = useState({name: '', address: '', city: ''});
  const [payment, setPayment] = useState({card: '', expiry: '', cvv: ''});

  return (
    <Card width="100%" padding={5}>
      {step === 'cart' && (
        <div>
          <Heading level={2}>Cart Summary</Heading>
          <Text as="p" display="block">Widget x2 - $29.98</Text>
          <Text as="p" display="block">Gadget x1 - $49.99</Text>
          <Text type="large" weight="bold" as="p" display="block">Total: $79.97</Text>
          <Button label="Continue to Shipping" variant="primary" onClick={() => setStep('shipping')} />
        </div>
      )}
      {step === 'shipping' && (
        <div>
          <Heading level={2}>Shipping</Heading>
          <TextInput label="Full Name" value={shipping.name} onChange={(v) => setShipping(s => ({...s, name: v}))} />
          <TextInput label="Address" value={shipping.address} onChange={(v) => setShipping(s => ({...s, address: v}))} />
          <TextInput label="City" value={shipping.city} onChange={(v) => setShipping(s => ({...s, city: v}))} />
          <Button label="Continue to Payment" variant="primary" onClick={() => setStep('payment')} />
        </div>
      )}
      {step === 'payment' && (
        <div>
          <Heading level={2}>Payment</Heading>
          <TextInput label="Card Number" value={payment.card} onChange={(v) => setPayment(s => ({...s, card: v}))} />
          <TextInput label="Expiry" value={payment.expiry} onChange={(v) => setPayment(s => ({...s, expiry: v}))} />
          <TextInput label="CVV" value={payment.cvv} onChange={(v) => setPayment(s => ({...s, cvv: v}))} />
          <Button label="Place Order" variant="primary" onClick={() => setStep('confirmation')} />
        </div>
      )}
      {step === 'confirmation' && (
        <div>
          <Heading level={2}>Order Confirmed</Heading>
          <Text as="p" display="block">Thank you for your purchase. Your order has been placed.</Text>
        </div>
      )}
    </Card>
  );
}
