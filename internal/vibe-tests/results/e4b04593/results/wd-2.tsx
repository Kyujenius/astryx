import {useState} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Progress} from '@/components/ui/progress';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';

const steps = ['Personal Info', 'Contact Details', 'Review'];

export default function FormWizard() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const progress = ((step + 1) / steps.length) * 100;

  return (
    <Card className="w-[480px]">
      <CardHeader>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Step {step + 1} of {steps.length}</p>
          <Progress value={progress} />
        </div>
        <CardTitle>{steps[step]}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {step === 0 && (
          <div className="space-y-2">
            <Label htmlFor="name">Full name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
          </div>
        )}
        {step === 1 && (
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
          </div>
        )}
        {step === 2 && (
          <div className="space-y-2">
            <p>Name: {name}</p>
            <p>Email: {email}</p>
          </div>
        )}
        <div className="flex justify-end gap-2">
          {step > 0 && <Button variant="outline" onClick={() => setStep(step - 1)}>Back</Button>}
          {step < steps.length - 1 ? (
            <Button onClick={() => setStep(step + 1)}>Next</Button>
          ) : (
            <Button>Submit</Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
