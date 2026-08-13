import {useState} from 'react';
import {Card} from '@astryxdesign/core/Card';
import {Button} from '@astryxdesign/core/Button';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';

const STEPS = ['Cart', 'Shipping', 'Payment', 'Confirmation'];

export default function CheckoutFlow() {
  const [step, setStep] = useState(0);
  const [shipping, setShipping] = useState({name: '', address: '', city: ''});
  const [payment, setPayment] = useState({card: '', expiry: '', cvv: ''});

  const next = () => setStep((s) => Math.min(s + 1, 3));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <div className="flex flex-col gap-4 max-w-md mx-auto">
      <div className="flex gap-3">
        {STEPS.map((label, i) => (
          <Text key={label} weight={i === step ? 'bold' : 'normal'} color={i === step ? 'primary' : 'secondary'}>
            {i + 1}. {label}
          </Text>
        ))}
      </div>

      {step === 0 && (
        <Card padding={4}>
          <div className="flex flex-col gap-3">
            <Heading level={3}>Cart Summary</Heading>
            <Text>Wireless Headphones x 1 - $79.99</Text>
            <Text>USB-C Hub x 2 - $99.98</Text>
            <Text weight="bold">Total: $179.97</Text>
            <Button label="Continue to shipping" variant="primary" onClick={next} />
          </div>
        </Card>
      )}

      {step === 1 && (
        <Card padding={4}>
          <div className="flex flex-col gap-3">
            <Heading level={3}>Shipping</Heading>
            <TextInput label="Full name" value={shipping.name} onChange={(v) => setShipping({...shipping, name: v})} isRequired />
            <TextInput label="Address" value={shipping.address} onChange={(v) => setShipping({...shipping, address: v})} isRequired />
            <TextInput label="City" value={shipping.city} onChange={(v) => setShipping({...shipping, city: v})} isRequired />
            <div className="flex gap-2">
              <Button label="Back" variant="secondary" onClick={back} />
              <Button label="Continue to payment" variant="primary" onClick={next} />
            </div>
          </div>
        </Card>
      )}

      {step === 2 && (
        <Card padding={4}>
          <div className="flex flex-col gap-3">
            <Heading level={3}>Payment</Heading>
            <TextInput label="Card number" value={payment.card} onChange={(v) => setPayment({...payment, card: v})} isRequired />
            <div className="flex gap-2">
              <TextInput label="Expiry" value={payment.expiry} onChange={(v) => setPayment({...payment, expiry: v})} isRequired />
              <TextInput label="CVV" value={payment.cvv} onChange={(v) => setPayment({...payment, cvv: v})} isRequired />
            </div>
            <div className="flex gap-2">
              <Button label="Back" variant="secondary" onClick={back} />
              <Button label="Place order" variant="primary" onClick={next} />
            </div>
          </div>
        </Card>
      )}

      {step === 3 && (
        <Card padding={4}>
          <div className="flex flex-col gap-3">
            <Heading level={3}>Order Confirmed</Heading>
            <Text>Your order has been placed. You will receive a confirmation email shortly.</Text>
          </div>
        </Card>
      )}
    </div>
  );
}
