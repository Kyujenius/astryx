// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {TextInput} from '@astryxdesign/core/TextInput';
import {CheckboxInput} from '@astryxdesign/core/CheckboxInput';
import {SegmentedControl, SegmentedControlItem} from '@astryxdesign/core/SegmentedControl';

export default function OnboardingFlow() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="max-w-md mx-auto p-6 flex flex-col gap-6">
      {step === 0 && (
        <div className="flex flex-col items-center gap-4">
          <Heading level={1}>Welcome</Heading>
          <Text type="large">Let us get you set up with your new account.</Text>
          <Button label="Get started" variant="primary" onClick={() => setStep(1)} />
        </div>
      )}
      {step === 1 && (
        <div className="flex flex-col gap-4">
          <Heading level={2}>Profile Setup</Heading>
          <TextInput label="Name" value={name} onChange={setName} placeholder="Your name" />
          <TextInput label="Email" value={email} onChange={setEmail} type="email" placeholder="you@example.com" />
          <div className="flex justify-end gap-2">
            <Button label="Back" variant="ghost" onClick={() => setStep(0)} />
            <Button label="Next" variant="primary" onClick={() => setStep(2)} />
          </div>
        </div>
      )}
      {step === 2 && (
        <div className="flex flex-col gap-4">
          <Heading level={2}>Preferences</Heading>
          <SegmentedControl label="Theme" value={theme} onChange={setTheme}>
            <SegmentedControlItem value="light">Light</SegmentedControlItem>
            <SegmentedControlItem value="dark">Dark</SegmentedControlItem>
            <SegmentedControlItem value="system">System</SegmentedControlItem>
          </SegmentedControl>
          <CheckboxInput label="Enable notifications" value={notifications} onChange={setNotifications} />
          <div className="flex justify-end gap-2">
            <Button label="Back" variant="ghost" onClick={() => setStep(1)} />
            <Button label="Finish" variant="primary" onClick={() => setStep(3)} />
          </div>
        </div>
      )}
      {step === 3 && (
        <div className="flex flex-col items-center gap-4">
          <Heading level={2}>All done!</Heading>
          <Text type="large">Your account is ready. Enjoy using the app.</Text>
          <Button label="Go to dashboard" variant="primary" onClick={() => {}} />
        </div>
      )}
    </div>
  );
}
