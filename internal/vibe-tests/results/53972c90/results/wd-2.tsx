import * as React from 'react';
import {Button} from '../components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '../components/ui/card';
import {Input} from '../components/ui/input';
import {Label} from '../components/ui/label';
import {Progress} from '../components/ui/progress';

const steps = ['Personal Info', 'Contact', 'Review'];

export default function FormWizard() {
  const [step, setStep] = React.useState(0);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');

  const progress = ((step + 1) / steps.length) * 100;

  return (
    <div className="max-w-lg space-y-4 p-4">
      <h2 className="text-2xl font-semibold">Registration</h2>
      <Progress value={progress} className="w-full" />
      <p className="text-sm text-muted-foreground">
        Step {step + 1} of {steps.length}: {steps[step]}
      </p>
      <Card>
        <CardHeader>
          <CardTitle>{steps[step]}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {step === 0 && (
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
          )}
          {step === 1 && (
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
          )}
          {step === 2 && (
            <div className="space-y-1">
              <p className="text-sm">Name: {name}</p>
              <p className="text-sm">Email: {email}</p>
            </div>
          )}
        </CardContent>
      </Card>
      <div className="flex gap-3">
        <Button variant="outline" onClick={() => setStep((s) => s - 1)} disabled={step === 0}>
          Back
        </Button>
        <Button onClick={() => { if (step < steps.length - 1) setStep((s) => s + 1); }}>
          {step === steps.length - 1 ? 'Submit' : 'Next'}
        </Button>
      </div>
    </div>
  );
}
