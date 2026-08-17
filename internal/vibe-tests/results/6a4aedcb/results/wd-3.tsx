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

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <div className="p-8">
          {step === 'welcome' && (
            <div className="flex flex-col items-center gap-4">
              <Heading level={1}>Welcome</Heading>
              <Text>Let us get you set up in a few quick steps.</Text>
              <Button onClick={() => setStep('profile')}>Get Started</Button>
            </div>
          )}
          {step === 'profile' && (
            <div className="flex flex-col gap-3">
              <Heading level={2}>Profile Setup</Heading>
              <TextInput label="Name" value={name} onChange={setName} placeholder="Your name" />
              <TextInput label="Email" value={email} onChange={setEmail} placeholder="you@example.com" />
              <div className="flex gap-2 mt-2">
                <Button variant="ghost" onClick={() => setStep('welcome')}>Back</Button>
                <Button onClick={() => setStep('preferences')}>Next</Button>
              </div>
            </div>
          )}
          {step === 'preferences' && (
            <div className="flex flex-col gap-3">
              <Heading level={2}>Preferences</Heading>
              <CheckboxInput label="Enable notifications" isSelected={notifications} onChange={setNotifications} />
              <CheckboxInput label="Dark mode" isSelected={darkMode} onChange={setDarkMode} />
              <div className="flex gap-2 mt-2">
                <Button variant="ghost" onClick={() => setStep('profile')}>Back</Button>
                <Button onClick={() => setStep('done')}>Finish</Button>
              </div>
            </div>
          )}
          {step === 'done' && (
            <div className="flex flex-col items-center gap-4">
              <Heading level={2}>All Done!</Heading>
              <Text>You are all set, {name || 'friend'}. Enjoy the app.</Text>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
