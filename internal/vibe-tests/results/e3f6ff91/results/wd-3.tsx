// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {Stack} from '@astryxdesign/core/Stack';
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

  const steps = [
    // Welcome
    <Stack key="welcome" gap={4} hAlign="center">
      <Heading level={1}>Welcome</Heading>
      <Text type="large">Let us get you set up with your new account.</Text>
      <Button label="Get started" variant="primary" onClick={() => setStep(1)} />
    </Stack>,
    // Profile
    <Stack key="profile" gap={4}>
      <Heading level={2}>Profile Setup</Heading>
      <TextInput label="Name" value={name} onChange={setName} placeholder="Your name" />
      <TextInput label="Email" value={email} onChange={setEmail} type="email" placeholder="you@example.com" />
      <Stack direction="horizontal" gap={2} hAlign="end">
        <Button label="Back" variant="ghost" onClick={() => setStep(0)} />
        <Button label="Next" variant="primary" onClick={() => setStep(2)} />
      </Stack>
    </Stack>,
    // Preferences
    <Stack key="prefs" gap={4}>
      <Heading level={2}>Preferences</Heading>
      <SegmentedControl label="Theme" value={theme} onChange={setTheme}>
        <SegmentedControlItem value="light">Light</SegmentedControlItem>
        <SegmentedControlItem value="dark">Dark</SegmentedControlItem>
        <SegmentedControlItem value="system">System</SegmentedControlItem>
      </SegmentedControl>
      <CheckboxInput
        label="Enable notifications"
        value={notifications}
        onChange={setNotifications}
      />
      <Stack direction="horizontal" gap={2} hAlign="end">
        <Button label="Back" variant="ghost" onClick={() => setStep(1)} />
        <Button label="Finish" variant="primary" onClick={() => setStep(3)} />
      </Stack>
    </Stack>,
    // Done
    <Stack key="done" gap={4} hAlign="center">
      <Heading level={2}>All done!</Heading>
      <Text type="large">Your account is ready. Enjoy using the app.</Text>
      <Button label="Go to dashboard" variant="primary" onClick={() => {}} />
    </Stack>,
  ];

  return (
    <Stack gap={4} padding={4} maxWidth={480}>
      {steps[step]}
    </Stack>
  );
}
