import React, {useState} from 'react';
import {Stepper} from '@astryxdesign/core/Stepper';
import {StepperStep} from '@astryxdesign/core/Stepper';
import {Button} from '@astryxdesign/core/Button';
import {Card} from '@astryxdesign/core/Card';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';

export default function CheckoutFlow() {
  const [step, setStep] = useState(0);

  return (
    <div>
      <Stepper activeStep={step}>
        <StepperStep label="Cart" />
        <StepperStep label="Shipping" />
        <StepperStep label="Payment" />
        <StepperStep label="Confirmation" />
      </Stepper>

      <Card>
        {step === 0 && (
          <div>
            <Heading level={2}>Cart Summary</Heading>
            <Text>Your items are ready for checkout.</Text>
          </div>
        )}
        {step === 1 && (
          <div>
            <Heading level={2}>Shipping</Heading>
            <TextInput label="Address" value="" onChange={() => {}} />
            <TextInput label="City" value="" onChange={() => {}} />
          </div>
        )}
        {step === 2 && (
          <div>
            <Heading level={2}>Payment</Heading>
            <TextInput label="Card Number" value="" onChange={() => {}} />
            <TextInput label="Expiry" value="" onChange={() => {}} />
          </div>
        )}
        {step === 3 && (
          <div>
            <Heading level={2}>Confirmation</Heading>
            <Text>Your order has been placed successfully.</Text>
          </div>
        )}
      </Card>

      <div style={{display: 'flex', gap: '8px', marginTop: '16px'}}>
        {step > 0 && (
          <Button variant="outlined" onPress={() => setStep(step - 1)}>
            Back
          </Button>
        )}
        {step < 3 && (
          <Button onPress={() => setStep(step + 1)}>
            {step === 2 ? 'Place Order' : 'Continue'}
          </Button>
        )}
      </div>
    </div>
  );
}
