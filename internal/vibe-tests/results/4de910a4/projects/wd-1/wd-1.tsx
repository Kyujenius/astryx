// Copyright (c) Meta Platforms, Inc. and affiliates.

import React, {useState} from 'react';
import {Stepper} from '@astryxdesign/core/Stepper';
import {Button} from '@astryxdesign/core/Button';
import {Card} from '@astryxdesign/core/Card';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Divider} from '@astryxdesign/core/Divider';
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  container: { maxWidth: 640, marginInline: 'auto', padding: 32, display: 'flex', flexDirection: 'column', gap: 24 },
  actions: { display: 'flex', justifyContent: 'space-between' },
  item: { display: 'flex', justifyContent: 'space-between', paddingBlock: 8 },
});

const STEPS = ['Cart', 'Shipping', 'Payment', 'Confirmation'];

export default function CheckoutFlow() {
  const [step, setStep] = useState(0);
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [card, setCard] = useState('');

  return (
    <div {...stylex.props(styles.container)}>
      <Stepper steps={STEPS} activeStep={step} />
      <Card>
        <div style={{padding: 24}}>
          {step === 0 && (<>
            <Heading level={3}>Cart summary</Heading>
            <div {...stylex.props(styles.item)}><Text>Widget Pro x2</Text><Text>$49.98</Text></div>
            <div {...stylex.props(styles.item)}><Text>Gadget Mini</Text><Text>$19.99</Text></div>
            <Divider />
            <div {...stylex.props(styles.item)}><Text type="label">Total</Text><Text type="label">$69.97</Text></div>
          </>)}
          {step === 1 && (<div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
            <Heading level={3}>Shipping</Heading>
            <TextInput label="Address" value={address} onChange={setAddress} isRequired />
            <TextInput label="City" value={city} onChange={setCity} isRequired />
          </div>)}
          {step === 2 && (<div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
            <Heading level={3}>Payment</Heading>
            <TextInput label="Card number" value={card} onChange={setCard} isRequired />
          </div>)}
          {step === 3 && (<div style={{textAlign: 'center', padding: 32}}>
            <Heading level={3}>Order confirmed!</Heading>
            <Text color="secondary">Thank you for your purchase.</Text>
          </div>)}
        </div>
      </Card>
      <div {...stylex.props(styles.actions)}>
        <Button variant="ghost" onPress={() => setStep(s => s - 1)} isDisabled={step === 0}>Back</Button>
        {step < 3 && <Button variant="filled" onPress={() => setStep(s => s + 1)}>{step === 2 ? 'Place order' : 'Continue'}</Button>}
      </div>
    </div>
  );
}
