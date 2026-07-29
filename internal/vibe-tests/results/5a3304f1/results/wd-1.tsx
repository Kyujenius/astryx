import {Card} from '@astryxdesign/core/Card';
import {Button} from '@astryxdesign/core/Button';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import stylex from '@stylexjs/stylex';
import {useState} from 'react';

const styles = stylex.create({
  container: {
    maxWidth: 600,
    margin: '0 auto',
    padding: 24,
  },
  stepIndicator: {
    display: 'flex',
    gap: 8,
    marginBottom: 24,
  },
  stepDot: {
    width: 32,
    height: 32,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e0e0e0',
    fontSize: 14,
  },
  activeStep: {
    backgroundColor: '#0066cc',
    color: '#fff',
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
});

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
    <div {...stylex.props(styles.container)}>
      <div {...stylex.props(styles.stepIndicator)}>
        {STEPS.map((step, i) => (
          <div key={step} {...stylex.props(styles.stepDot, i <= stepIndex && styles.activeStep)}>
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
          <div {...stylex.props(styles.form)}>
            <Heading level={2}>Shipping</Heading>
            <TextInput label="Full Name" placeholder="Jane Doe" />
            <TextInput label="Address" placeholder="123 Main St" />
            <TextInput label="City" placeholder="San Francisco" />
            <TextInput label="Zip Code" placeholder="94102" />
          </div>
        )}
        {currentStep === 'payment' && (
          <div {...stylex.props(styles.form)}>
            <Heading level={2}>Payment</Heading>
            <TextInput label="Card Number" placeholder="4242 4242 4242 4242" />
            <TextInput label="Expiry" placeholder="MM/YY" />
            <TextInput label="CVC" placeholder="123" />
          </div>
        )}
        {currentStep === 'confirmation' && (
          <>
            <Heading level={2}>Order Confirmed</Heading>
            <Text>Thank you for your purchase. You will receive a confirmation email shortly.</Text>
          </>
        )}
      </Card>

      <div {...stylex.props(styles.actions)}>
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
