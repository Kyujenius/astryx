import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Checkbox} from '@/components/ui/checkbox';

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
        <h1 className="text-3xl font-bold">Welcome</h1>
        <p className="text-muted-foreground">Let us set you up in a few steps.</p>
        <Button onClick={() => setStep('profile')}>Get Started</Button>
      </div>
    );
  }

  if (step === 'profile') {
    return (
      <div className="space-y-4 p-6 max-w-md">
        <h2 className="text-2xl font-semibold">Profile Setup</h2>
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={() => setStep('welcome')}>Back</Button>
          <Button onClick={() => setStep('preferences')}>Next</Button>
        </div>
      </div>
    );
  }

  if (step === 'preferences') {
    return (
      <div className="space-y-4 p-6 max-w-md">
        <h2 className="text-2xl font-semibold">Preferences</h2>
        <div className="flex items-center gap-2">
          <Checkbox id="notif" checked={notifications} onCheckedChange={(c) => setNotifications(!!c)} />
          <Label htmlFor="notif">Email notifications</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="dark" checked={darkMode} onCheckedChange={(c) => setDarkMode(!!c)} />
          <Label htmlFor="dark">Dark mode</Label>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={() => setStep('profile')}>Back</Button>
          <Button onClick={() => setStep('done')}>Finish</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <h2 className="text-2xl font-semibold">All Done!</h2>
      <p className="text-muted-foreground">Welcome, {name || 'friend'}.</p>
      <Button>Go to Dashboard</Button>
    </div>
  );
}
