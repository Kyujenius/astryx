// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
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

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        {step === 'welcome' && (
          <>
            <CardHeader className="text-center">
              <CardTitle>Welcome</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              <p className="text-muted-foreground">Let us get you set up.</p>
              <Button onClick={() => setStep('profile')}>Get Started</Button>
            </CardContent>
          </>
        )}
        {step === 'profile' && (
          <>
            <CardHeader><CardTitle>Profile Setup</CardTitle></CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={name} onChange={e => setName(e.target.value)} />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="ghost" onClick={() => setStep('welcome')}>Back</Button>
                <Button onClick={() => setStep('preferences')}>Next</Button>
              </div>
            </CardContent>
          </>
        )}
        {step === 'preferences' && (
          <>
            <CardHeader><CardTitle>Preferences</CardTitle></CardHeader>
            <CardContent className="flex flex-col gap-4">
              <label className="flex items-center gap-2">
                <Checkbox checked={notifications} onCheckedChange={(c) => setNotifications(!!c)} />
                Email notifications
              </label>
              <label className="flex items-center gap-2">
                <Checkbox checked={darkMode} onCheckedChange={(c) => setDarkMode(!!c)} />
                Dark mode
              </label>
              <div className="flex justify-end gap-2">
                <Button variant="ghost" onClick={() => setStep('profile')}>Back</Button>
                <Button onClick={() => setStep('done')}>Finish</Button>
              </div>
            </CardContent>
          </>
        )}
        {step === 'done' && (
          <>
            <CardHeader className="text-center"><CardTitle>All Done!</CardTitle></CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">You are all set, {name || 'friend'}.</p>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
}
