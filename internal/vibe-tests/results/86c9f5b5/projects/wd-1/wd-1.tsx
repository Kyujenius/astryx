import {Card} from '@astryxdesign/core/Card';
import {Button} from '@astryxdesign/core/Button';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {useState} from 'react';

type Step = 'cart' | 'shipping' | 'payment' | 'confirmation';
const STEPS: Step[] = ['cart', 'shipping', 'payment', 'confirmation'];

export default function CheckoutFlow() {
  const [currentStep, setCurrentStep] = useState<Step>('cart');
  const stepIndex = STEPS.indexOf(currentStep);

  const next = () => {
    if (stepIndex < STEPS.length - 1) setCurrentStep(STEPS[stepIndex + 1]);
  };
  const back = () => {
    if (stepIndex > 0) setCurrentStep(STEPS[stepIndex - 1]);
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <div className="flex gap-2 mb-6">
        {STEPS.map((step, i) => (
          <div
            key={step}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
              i <= stepIndex ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}
          >
            {i + 1}
          </div>
        ))}
      </div>

      <Card>
        {currentStep === 'cart' && (
          <>
            <Heading level={2}>Cart Summary</Heading>
            <Text>Review your items before proceeding.</Text>
          </>
        )}
        {currentStep === 'shipping' && (
          <div className="flex flex-col gap-4">
            <Heading level={2}>Shipping</Heading>
            <TextInput label="Full Name" placeholder="Jane Doe" />
            <TextInput label="Address" placeholder="123 Main St" />
            <TextInput label="City" placeholder="San Francisco" />
            <TextInput label="Zip Code" placeholder="94102" />
          </div>
        )}
        {currentStep === 'payment' && (
          <div className="flex flex-col gap-4">
            <Heading level={2}>Payment</Heading>
            <TextInput label="Card Number" placeholder="4242 4242 4242 4242" />
            <TextInput label="Expiry" placeholder="MM/YY" />
            <TextInput label="CVC" placeholder="123" />
          </div>
        )}
        {currentStep === 'confirmation' && (
          <>
            <Heading level={2}>Order Confirmed</Heading>
            <Text>Thank you for your purchase.</Text>
          </>
        )}
      </Card>

      <div className="flex justify-between mt-6">
        {stepIndex > 0 && currentStep !== 'confirmation' && (
          <Button variant="outlined" onPress={back}>Back</Button>
        )}
        {currentStep !== 'confirmation' && (
          <Button variant="filled" onPress={next}>
            {currentStep === 'payment' ? 'Place Order' : 'Continue'}
          </Button>
        )}
      </div>
    </div>
  );
}
