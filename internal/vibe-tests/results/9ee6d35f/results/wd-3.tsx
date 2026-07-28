// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {Button} from '@astryxdesign/core/Button';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {TextInput} from '@astryxdesign/core/TextInput';
import {CheckboxInput} from '@astryxdesign/core/CheckboxInput';
import {Card} from '@astryxdesign/core/Card';

type Step = 'welcome' | 'profile' | 'preferences' | 'done';

export default function OnboardingFlow() {
  const [step, setStep] = useState<Step>('welcome');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [notifications, setNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const stepIndex = ['welcome', 'profile', 'preferences', 'done'].indexOf(step);

  return (
    <div className="flex flex-col items-center min-h-screen p-8">
      <div className="flex gap-2 mb-8">
        {[0, 1, 2, 3].map(i => (
          <div key={i} className={`w-3 h-3 rounded-full ${i <= stepIndex ? 'bg-blue-500' : 'bg-gray-200'}`} />
        ))}
      </div>
      <Card padding={6} maxWidth={480}>
        {step === 'welcome' && (
          <div className="flex flex-col items-center gap-4 text-center">
            <Heading level={1}>Welcome</Heading>
            <Text>Let us get you set up. This will only take a minute.</Text>
            <Button label="Get Started" variant="primary" onClick={() => setStep('profile')} />
          </div>
        )}
        {step === 'profile' && (
          <div className="flex flex-col gap-4">
            <Heading level={2}>Profile Setup</Heading>
            <TextInput label="Full Name" value={name} onChange={setName} isRequired />
            <TextInput label="Email" type="email" value={email} onChange={setEmail} isRequired />
            <div className="flex justify-end gap-2 mt-4">
              <Button label="Back" variant="ghost" onClick={() => setStep('welcome')} />
              <Button label="Next" variant="primary" onClick={() => setStep('preferences')} />
            </div>
          </div>
        )}
        {step === 'preferences' && (
          <div className="flex flex-col gap-4">
            <Heading level={2}>Preferences</Heading>
            <CheckboxInput label="Enable email notifications" value={notifications} onChange={setNotifications} />
            <CheckboxInput label="Dark mode" value={darkMode} onChange={setDarkMode} />
            <div className="flex justify-end gap-2 mt-4">
              <Button label="Back" variant="ghost" onClick={() => setStep('profile')} />
              <Button label="Finish" variant="primary" onClick={() => setStep('done')} />
            </div>
          </div>
        )}
        {step === 'done' && (
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="text-5xl">\u2705</div>
            <Heading level={2}>All Done!</Heading>
            <Text>You are all set, {name || 'friend'}. Enjoy the app.</Text>
          </div>
        )}
      </Card>
    </div>
  );
}
