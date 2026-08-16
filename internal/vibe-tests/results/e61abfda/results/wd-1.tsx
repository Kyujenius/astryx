import {useState} from 'react';
import {Card} from '@astryxdesign/core/Card';
import {Button} from '@astryxdesign/core/Button';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Text} from '@astryxdesign/core/Text';
import {Heading} from '@astryxdesign/core/Heading';

type Step = 'cart' | 'shipping' | 'payment' | 'confirmation';

export default function CheckoutFlow() {
  const [step, setStep] = useState<Step>('cart');
  const [shipping, setShipping] = useState({name: '', address: '', city: '', zip: ''});
  const [payment, setPayment] = useState({card: '', expiry: '', cvv: ''});

  const total = 119.97;

  return (
    <div className="max-w-lg mx-auto py-8">
      <div className="flex gap-2 mb-6">
        {(['cart', 'shipping', 'payment', 'confirmation'] as Step[]).map((s) => (
          <div key={s} className={`h-1 flex-1 rounded ${s === step ? 'bg-blue-600' : 'bg-gray-200'}`} />
        ))}
      </div>
      {step === 'cart' && (
        <Card padding={4}>
          <Heading level={2}>Cart Summary</Heading>
          <div className="flex flex-col gap-2 my-4">
            <Text display="block">Widget Pro x2 - $99.98</Text>
            <Text display="block">Gadget Lite x1 - $19.99</Text>
          </div>
          <Text type="label" display="block">Total: ${total}</Text>
          <Button label="Continue to Shipping" variant="primary" onClick={() => setStep('shipping')} />
        </Card>
      )}
      {step === 'shipping' && (
        <Card padding={4}>
          <Heading level={2}>Shipping</Heading>
          <div className="flex flex-col gap-3 my-4">
            <TextInput label="Full Name" value={shipping.name} onChange={(v) => setShipping({...shipping, name: v})} />
            <TextInput label="Address" value={shipping.address} onChange={(v) => setShipping({...shipping, address: v})} />
            <TextInput label="City" value={shipping.city} onChange={(v) => setShipping({...shipping, city: v})} />
            <TextInput label="ZIP" value={shipping.zip} onChange={(v) => setShipping({...shipping, zip: v})} />
          </div>
          <Button label="Continue to Payment" variant="primary" onClick={() => setStep('payment')} />
        </Card>
      )}
      {step === 'payment' && (
        <Card padding={4}>
          <Heading level={2}>Payment</Heading>
          <div className="flex flex-col gap-3 my-4">
            <TextInput label="Card Number" value={payment.card} onChange={(v) => setPayment({...payment, card: v})} />
            <TextInput label="Expiry" value={payment.expiry} onChange={(v) => setPayment({...payment, expiry: v})} />
            <TextInput label="CVV" type="password" value={payment.cvv} onChange={(v) => setPayment({...payment, cvv: v})} />
          </div>
          <Button label="Place Order" variant="primary" onClick={() => setStep('confirmation')} />
        </Card>
      )}
      {step === 'confirmation' && (
        <Card padding={4}>
          <Heading level={2}>Order Confirmed</Heading>
          <Text display="block" className="mt-4">Your order of ${total} will be shipped soon.</Text>
        </Card>
      )}
    </div>
  );
}
