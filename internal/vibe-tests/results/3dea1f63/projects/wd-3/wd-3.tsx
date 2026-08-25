import {useState} from 'react';
import {Button} from '@astryxdesign/core/Button';
import {VStack} from '@astryxdesign/core/VStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {TextInput} from '@astryxdesign/core/TextInput';
import {CheckboxInput} from '@astryxdesign/core/CheckboxInput';

type Step = 'welcome' | 'profile' | 'preferences' | 'done';

export default function OnboardingFlow() {
  const [step, setStep] = useState<Step>('welcome');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [notifications, setNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  if (step === 'welcome') {
    return (
      <div className="flex flex-col items-center gap-4 p-8">
        <Heading level={1}>Welcome to Astryx</Heading>
        <Text>Let us help you get set up in just a few steps.</Text>
        <Button label="Get Started" variant="primary" onClick={() => setStep('profile')} />
      </div>
    );
  }

  if (step === 'profile') {
    return (
      <VStack gap={4} padding={6}>
        <Heading level={2}>Profile Setup</Heading>
        <TextInput label="Full Name" value={name} onChange={setName} />
        <TextInput label="Email" value={email} onChange={setEmail} type="email" />
        <div className="flex gap-2 mt-4">
          <Button label="Back" variant="ghost" onClick={() => setStep('welcome')} />
          <Button label="Next" variant="primary" onClick={() => setStep('preferences')} />
        </div>
      </VStack>
    );
  }

  if (step === 'preferences') {
    return (
      <VStack gap={4} padding={6}>
        <Heading level={2}>Preferences</Heading>
        <CheckboxInput label="Enable email notifications" isChecked={notifications} onChange={setNotifications} />
        <CheckboxInput label="Dark mode" isChecked={darkMode} onChange={setDarkMode} />
        <div className="flex gap-2 mt-4">
          <Button label="Back" variant="ghost" onClick={() => setStep('profile')} />
          <Button label="Finish" variant="primary" onClick={() => setStep('done')} />
        </div>
      </VStack>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <Heading level={2}>All Done!</Heading>
      <Text>You are all set, {name || 'friend'}.</Text>
      <Button label="Go to Dashboard" variant="primary" onClick={() => {}} />
    </div>
  );
}
