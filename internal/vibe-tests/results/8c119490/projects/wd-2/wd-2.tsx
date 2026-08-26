import {useState} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Progress} from '@/components/ui/progress';

const steps = ['Personal Info', 'Address', 'Review'];

export default function FormWizard() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{steps[step]}</CardTitle>
        <Progress value={((step + 1) / steps.length) * 100} className="mt-2" />
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {step === 0 && (
          <>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </>
        )}
        {step === 1 && (
          <>
            <div className="space-y-2">
              <Label htmlFor="addr">Address</Label>
              <Input id="addr" value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" value={city} onChange={(e) => setCity(e.target.value)} />
            </div>
          </>
        )}
        {step === 2 && (
          <div className="space-y-1 text-sm">
            <p>Name: {name}</p>
            <p>Email: {email}</p>
            <p>Address: {address}, {city}</p>
          </div>
        )}
        <div className="flex justify-end gap-2">
          {step > 0 && <Button variant="outline" onClick={() => setStep(step - 1)}>Back</Button>}
          {step < 2 ? (
            <Button onClick={() => setStep(step + 1)}>Next</Button>
          ) : (
            <Button onClick={() => alert('Submitted!')}>Submit</Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
