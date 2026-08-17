import {useState} from 'react';
import {Card} from '@astryxdesign/core/Card';
import {Button} from '@astryxdesign/core/Button';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Text} from '@astryxdesign/core/Text';
import {Heading} from '@astryxdesign/core/Heading';

type Step = 'cart' | 'shipping' | 'payment' | 'confirmation';

interface CartItem {
  name: string;
  price: number;
  qty: number;
}

export default function CheckoutFlow() {
  const [step, setStep] = useState<Step>('cart');
  const [shipping, setShipping] = useState({name: '', address: '', city: '', zip: ''});
  const [payment, setPayment] = useState({card: '', expiry: '', cvv: ''});

  const items: CartItem[] = [
    {name: 'Widget Pro', price: 49.99, qty: 2},
    {name: 'Gadget Lite', price: 19.99, qty: 1},
  ];
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);

  if (step === 'cart') {
    return (
      <Card padding={4} width={480}>
        <Heading level={2}>Cart Summary</Heading>
        {items.map((item) => (
          <Text key={item.name} display="block">
            {item.name} x{item.qty} - ${(item.price * item.qty).toFixed(2)}
          </Text>
        ))}
        <Text type="label" display="block">Total: ${total.toFixed(2)}</Text>
        <Button label="Continue to Shipping" variant="primary" onClick={() => setStep('shipping')} />
      </Card>
    );
  }

  if (step === 'shipping') {
    return (
      <Card padding={4} width={480}>
        <Heading level={2}>Shipping</Heading>
        <TextInput label="Full Name" value={shipping.name} onChange={(v) => setShipping({...shipping, name: v})} />
        <TextInput label="Address" value={shipping.address} onChange={(v) => setShipping({...shipping, address: v})} />
        <TextInput label="City" value={shipping.city} onChange={(v) => setShipping({...shipping, city: v})} />
        <TextInput label="ZIP Code" value={shipping.zip} onChange={(v) => setShipping({...shipping, zip: v})} />
        <Button label="Continue to Payment" variant="primary" onClick={() => setStep('payment')} />
      </Card>
    );
  }

  if (step === 'payment') {
    return (
      <Card padding={4} width={480}>
        <Heading level={2}>Payment</Heading>
        <TextInput label="Card Number" value={payment.card} onChange={(v) => setPayment({...payment, card: v})} />
        <TextInput label="Expiry (MM/YY)" value={payment.expiry} onChange={(v) => setPayment({...payment, expiry: v})} />
        <TextInput label="CVV" type="password" value={payment.cvv} onChange={(v) => setPayment({...payment, cvv: v})} />
        <Text type="label" display="block">Total: ${total.toFixed(2)}</Text>
        <Button label="Place Order" variant="primary" onClick={() => setStep('confirmation')} />
      </Card>
    );
  }

  return (
    <Card padding={4} width={480}>
      <Heading level={2}>Order Confirmed</Heading>
      <Text display="block">Thank you for your purchase!</Text>
      <Text type="supporting" display="block">
        Your order of ${total.toFixed(2)} will be shipped to {shipping.address}, {shipping.city} {shipping.zip}.
      </Text>
    </Card>
  );
}
