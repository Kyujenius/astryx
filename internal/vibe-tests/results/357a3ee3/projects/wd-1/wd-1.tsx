import {useState} from 'react';
import {Card} from '@astryxdesign/core/Card';
import {Button} from '@astryxdesign/core/Button';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  container: {
    maxWidth: 600,
    margin: '0 auto',
    padding: 24,
  },
  steps: {
    display: 'flex',
    gap: 8,
    marginBottom: 24,
  },
  step: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#e0e0e0',
  },
  stepActive: {
    backgroundColor: '#0066cc',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 16,
  },
});

type Step = 'cart' | 'shipping' | 'payment' | 'confirmation';
const STEPS: Step[] = ['cart', 'shipping', 'payment', 'confirmation'];

export default function CheckoutFlow() {
  const [step, setStep] = useState<Step>('cart');
  const [shipping, setShipping] = useState({name: '', address: '', city: '', zip: ''});
  const [payment, setPayment] = useState({card: '', expiry: '', cvv: ''});

  const currentIndex = STEPS.indexOf(step);

  const next = () => setStep(STEPS[currentIndex + 1]);
  const back = () => setStep(STEPS[currentIndex - 1]);

  return (
    <div {...stylex.props(styles.container)}>
      <div {...stylex.props(styles.steps)}>
        {STEPS.map((_, i) => (
          <div key={i} {...stylex.props(styles.step, i <= currentIndex && styles.stepActive)} />
        ))}
      </div>

      <Card padding={4}>
        {step === 'cart' && (
          <div {...stylex.props(styles.form)}>
            <Heading level={2}>Cart Summary</Heading>
            <Text>Widget Pro x2 - $49.98</Text>
            <Text>Gadget Mini x1 - $19.99</Text>
            <Text type="large" weight="bold">Total: $69.97</Text>
            <div {...stylex.props(styles.actions)}>
              <span />
              <Button label="Continue to Shipping" variant="primary" onClick={next} />
            </div>
          </div>
        )}

        {step === 'shipping' && (
          <div {...stylex.props(styles.form)}>
            <Heading level={2}>Shipping</Heading>
            <TextInput label="Full Name" value={shipping.name} onChange={(v) => setShipping({...shipping, name: v})} />
            <TextInput label="Address" value={shipping.address} onChange={(v) => setShipping({...shipping, address: v})} />
            <TextInput label="City" value={shipping.city} onChange={(v) => setShipping({...shipping, city: v})} />
            <TextInput label="ZIP Code" value={shipping.zip} onChange={(v) => setShipping({...shipping, zip: v})} />
            <div {...stylex.props(styles.actions)}>
              <Button label="Back" variant="ghost" onClick={back} />
              <Button label="Continue to Payment" variant="primary" onClick={next} />
            </div>
          </div>
        )}

        {step === 'payment' && (
          <div {...stylex.props(styles.form)}>
            <Heading level={2}>Payment</Heading>
            <TextInput label="Card Number" value={payment.card} onChange={(v) => setPayment({...payment, card: v})} />
            <TextInput label="Expiry" value={payment.expiry} onChange={(v) => setPayment({...payment, expiry: v})} />
            <TextInput label="CVV" value={payment.cvv} onChange={(v) => setPayment({...payment, cvv: v})} />
            <div {...stylex.props(styles.actions)}>
              <Button label="Back" variant="ghost" onClick={back} />
              <Button label="Place Order" variant="primary" onClick={next} />
            </div>
          </div>
        )}

        {step === 'confirmation' && (
          <div {...stylex.props(styles.form)}>
            <Heading level={2}>Order Confirmed</Heading>
            <Text>Your order has been placed. You will receive a confirmation email shortly.</Text>
          </div>
        )}
      </Card>
    </div>
  );
}
