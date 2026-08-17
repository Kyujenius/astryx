import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Checkbox} from '@/components/ui/checkbox';

type Step = 'welcome' | 'profile' | 'preferences' | 'done';

export default function OnboardingFlow() {
  const [step, setStep] = useState<Step>('welcome');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [notifications, setNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="max-w-md mx-auto p-4">
      <Card>
        <CardContent className="p-6">
          {step === 'welcome' && (
            <div className="flex flex-col items-center gap-4 text-center">
              <CardHeader><CardTitle>Welcome</CardTitle></CardHeader>
              <p className="text-muted-foreground">Let us get you set up in a few quick steps.</p>
              <Button onClick={() => setStep('profile')}>Get Started</Button>
            </div>
          )}
          {step === 'profile' && (
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold">Profile Setup</h2>
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" onClick={() => setStep('welcome')}>Back</Button>
                <Button onClick={() => setStep('preferences')}>Next</Button>
              </div>
            </div>
          )}
          {step === 'preferences' && (
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold">Preferences</h2>
              <label className="flex items-center gap-2">
                <Checkbox checked={notifications} onCheckedChange={(v) => setNotifications(!!v)} />
                Enable notifications
              </label>
              <label className="flex items-center gap-2">
                <Checkbox checked={darkMode} onCheckedChange={(v) => setDarkMode(!!v)} />
                Dark mode
              </label>
              <div className="flex gap-2">
                <Button variant="ghost" onClick={() => setStep('profile')}>Back</Button>
                <Button onClick={() => setStep('done')}>Finish</Button>
              </div>
            </div>
          )}
          {step === 'done' && (
            <div className="flex flex-col items-center gap-4 text-center">
              <h2 className="text-xl font-semibold">All Done!</h2>
              <p className="text-muted-foreground">You are all set, {name || 'friend'}. Enjoy the app.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
