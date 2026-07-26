// Copyright (c) Meta Platforms, Inc. and affiliates.

import React, {useState} from 'react';
import {Stepper} from '@astryxdesign/core/Stepper';
import {Button} from '@astryxdesign/core/Button';
import {Card} from '@astryxdesign/core/Card';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Divider} from '@astryxdesign/core/Divider';

const STEPS = ['Cart', 'Shipping', 'Payment', 'Confirmation'];

export default function CheckoutFlow() {
  const [step, setStep] = useState(0);
  return (
    <div className="max-w-xl mx-auto p-8 flex flex-col gap-6">
      <Stepper steps={STEPS} activeStep={step} />
      <Card><div className="p-6">
        {step === 0 && <><Heading level={3}>Cart</Heading><div className="flex justify-between py-2"><Text>Widget x2</Text><Text>$49.98</Text></div><Divider /><div className="flex justify-between py-2"><Text type="label">Total</Text><Text type="label">$49.98</Text></div></>}
        {step === 1 && <div className="flex flex-col gap-4"><Heading level={3}>Shipping</Heading><TextInput label="Address" value="" onChange={() => {}} isRequired /></div>}
        {step === 2 && <div className="flex flex-col gap-4"><Heading level={3}>Payment</Heading><TextInput label="Card" value="" onChange={() => {}} isRequired /></div>}
        {step === 3 && <div className="text-center py-8"><Heading level={3}>Confirmed!</Heading><Text color="secondary">Thanks!</Text></div>}
      </div></Card>
      <div className="flex justify-between">
        <Button variant="ghost" onPress={() => setStep(s => s - 1)} isDisabled={step === 0}>Back</Button>
        {step < 3 && <Button variant="filled" onPress={() => setStep(s => s + 1)}>{step === 2 ? 'Place order' : 'Continue'}</Button>}
      </div>
    </div>
  );
}
