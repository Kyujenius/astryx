import {useState} from 'react';
import {Button} from '@astryxdesign/core/Button';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Card} from '@astryxdesign/core/Card';
import {Badge} from '@astryxdesign/core/Badge';
import {Divider} from '@astryxdesign/core/Divider';

type Step = 'cart' | 'shipping' | 'payment' | 'confirmation';

export default function CheckoutFlow() {
  const [step, setStep] = useState<Step>('cart');
  const steps: Step[] = ['cart', 'shipping', 'payment', 'confirmation'];
  const currentIndex = steps.indexOf(step);

  return (
    <div className="flex flex-col gap-6 p-6 max-w-lg mx-auto">
      <div className="flex gap-2 items-center">
        {steps.map((s, i) => (
          <Badge key={s} variant={i <= currentIndex ? 'accent' : 'neutral'}>
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </Badge>
        ))}
      </div>

      <Divider />

      {step === 'cart' && (
        <Card>
          <div className="flex flex-col gap-4">
            <Heading level={2}>Cart Summary</Heading>
            <div className="flex justify-between">
              <Text>Widget Pro × 2</Text>
              <Text weight="semibold">$59.98</Text>
            </div>
            <div className="flex justify-between">
              <Text>Gadget Lite × 1</Text>
              <Text weight="semibold">$24.99</Text>
            </div>
            <Divider />
            <div className="flex justify-between">
              <Text weight="bold">Total</Text>
              <Text weight="bold">$84.97</Text>
            </div>
            <Button onPress={() => setStep('shipping')}>Continue to Shipping</Button>
          </div>
        </Card>
      )}

      {step === 'shipping' && (
        <Card>
          <div className="flex flex-col gap-4">
            <Heading level={2}>Shipping Address</Heading>
            <TextInput label="Full Name" placeholder="Jane Doe" />
            <TextInput label="Address" placeholder="123 Main St" />
            <div className="grid grid-cols-2 gap-3">
              <TextInput label="City" placeholder="San Francisco" />
              <TextInput label="Zip Code" placeholder="94105" />
            </div>
            <div className="flex gap-3">
              <Button variant="ghost" onPress={() => setStep('cart')}>Back</Button>
              <Button onPress={() => setStep('payment')}>Continue to Payment</Button>
            </div>
          </div>
        </Card>
      )}

      {step === 'payment' && (
        <Card>
          <div className="flex flex-col gap-4">
            <Heading level={2}>Payment</Heading>
            <TextInput label="Card Number" placeholder="4242 4242 4242 4242" />
            <div className="grid grid-cols-2 gap-3">
              <TextInput label="Expiry" placeholder="MM/YY" />
              <TextInput label="CVC" placeholder="123" />
            </div>
            <div className="flex gap-3">
              <Button variant="ghost" onPress={() => setStep('shipping')}>Back</Button>
              <Button onPress={() => setStep('confirmation')}>Place Order</Button>
            </div>
          </div>
        </Card>
      )}

      {step === 'confirmation' && (
        <Card>
          <div className="flex flex-col gap-4 items-center text-center">
            <Heading level={2}>Order Confirmed!</Heading>
            <Text color="secondary">Your order has been placed. Confirmation email incoming.</Text>
            <Text type="supporting">Order #ORD-2026-0842</Text>
          </div>
        </Card>
      )}
    </div>
  );
}
