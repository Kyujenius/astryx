import {Stack} from '@astryxdesign/core/Stack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {Card} from '@astryxdesign/core/Card';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Selector} from '@astryxdesign/core/Selector';
import {TabList, Tab} from '@astryxdesign/core/TabList';
import {Badge} from '@astryxdesign/core/Badge';
import {Icon} from '@astryxdesign/core/Icon';
import {useState} from 'react';

type Step = 'cart' | 'shipping' | 'payment' | 'confirmation';

const STEPS: Step[] = ['cart', 'shipping', 'payment', 'confirmation'];

export default function CheckoutFlow() {
  const [step, setStep] = useState<Step>('cart');
  const [shippingName, setShippingName] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [shippingCity, setShippingCity] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [cardNumber, setCardNumber] = useState('');

  const goNext = () => {
    const idx = STEPS.indexOf(step);
    if (idx < STEPS.length - 1) setStep(STEPS[idx + 1]);
  };

  const goBack = () => {
    const idx = STEPS.indexOf(step);
    if (idx > 0) setStep(STEPS[idx - 1]);
  };

  return (
    <Stack gap={4}>
      <Heading level={1}>Checkout</Heading>
      <TabList value={step} onChange={(v) => setStep(v as Step)}>
        <Tab value="cart" label="Cart" />
        <Tab value="shipping" label="Shipping" />
        <Tab value="payment" label="Payment" />
        <Tab value="confirmation" label="Confirmation" />
      </TabList>

      {step === 'cart' && (
        <Card>
          <Stack gap={4}>
            <Heading level={2}>Cart Summary</Heading>
            <Stack gap={2}>
              <Stack gap={1} direction="row" justify="space-between">
                <Text type="body">Widget Pro</Text>
                <Text type="body">$49.99</Text>
              </Stack>
              <Stack gap={1} direction="row" justify="space-between">
                <Text type="body">Premium Cable</Text>
                <Text type="body">$12.99</Text>
              </Stack>
              <Stack gap={1} direction="row" justify="space-between">
                <Text type="label">Total</Text>
                <Text type="label">$62.98</Text>
              </Stack>
            </Stack>
            <Button label="Continue to Shipping" variant="primary" onClick={goNext} />
          </Stack>
        </Card>
      )}

      {step === 'shipping' && (
        <Card>
          <Stack gap={4}>
            <Heading level={2}>Shipping Address</Heading>
            <TextInput label="Full name" value={shippingName} onChange={setShippingName} />
            <TextInput label="Address" value={shippingAddress} onChange={setShippingAddress} />
            <TextInput label="City" value={shippingCity} onChange={setShippingCity} />
            <Stack gap={2} direction="row">
              <Button label="Back" variant="ghost" onClick={goBack} />
              <Button label="Continue to Payment" variant="primary" onClick={goNext} />
            </Stack>
          </Stack>
        </Card>
      )}

      {step === 'payment' && (
        <Card>
          <Stack gap={4}>
            <Heading level={2}>Payment</Heading>
            <Selector
              label="Payment method"
              value={paymentMethod}
              onChange={setPaymentMethod}
              options={[
                {value: 'credit', label: 'Credit Card'},
                {value: 'debit', label: 'Debit Card'},
                {value: 'paypal', label: 'PayPal'},
              ]}
            />
            {paymentMethod !== 'paypal' && (
              <TextInput label="Card number" value={cardNumber} onChange={setCardNumber} />
            )}
            <Stack gap={2} direction="row">
              <Button label="Back" variant="ghost" onClick={goBack} />
              <Button label="Place Order" variant="primary" onClick={goNext} />
            </Stack>
          </Stack>
        </Card>
      )}

      {step === 'confirmation' && (
        <Card>
          <Stack gap={4} align="center">
            <Icon name="check-circle" />
            <Heading level={2}>Order Confirmed</Heading>
            <Text type="body">
              Your order has been placed. You will receive a confirmation email shortly.
            </Text>
            <Badge label="Order #12345" variant="success" />
          </Stack>
        </Card>
      )}
    </Stack>
  );
}
