// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Checkbox} from '@/components/ui/checkbox';

export default function OnboardingFlow() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="max-w-md mx-auto p-6 space-y-6">
      {step === 0 && (
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Welcome</h1>
          <p className="text-lg text-muted-foreground">Let us get you set up with your new account.</p>
          <Button onClick={() => setStep(1)}>Get started</Button>
        </div>
      )}
      {step === 1 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Profile Setup</h2>
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setStep(0)}>Back</Button>
            <Button onClick={() => setStep(2)}>Next</Button>
          </div>
        </div>
      )}
      {step === 2 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Preferences</h2>
          <div className="flex items-center gap-4">
            {['light', 'dark', 'system'].map(t => (
              <Button key={t} variant={theme === t ? 'default' : 'outline'} size="sm" onClick={() => setTheme(t)}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </Button>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="notifs" checked={notifications} onCheckedChange={(c) => setNotifications(!!c)} />
            <Label htmlFor="notifs">Enable notifications</Label>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setStep(1)}>Back</Button>
            <Button onClick={() => setStep(3)}>Finish</Button>
          </div>
        </div>
      )}
      {step === 3 && (
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold">All done!</h2>
          <p className="text-lg text-muted-foreground">Your account is ready.</p>
          <Button>Go to dashboard</Button>
        </div>
      )}
    </div>
  );
}
