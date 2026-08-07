import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Progress} from '@/components/ui/progress';

const steps = ['Personal', 'Contact', 'Review'];

export default function FormWizard() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({firstName: '', lastName: '', email: '', phone: ''});

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <Progress value={((step + 1) / steps.length) * 100} />
      <div className="flex justify-between">
        {steps.map((s, i) => (
          <span key={s} className={`text-sm ${i === step ? 'font-semibold text-primary' : 'text-muted-foreground'}`}>
            {i + 1}. {s}
          </span>
        ))}
      </div>
      <Card>
        <CardHeader><CardTitle>{steps[step]}</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {step === 0 && (<>
            <div><Label>First name</Label><Input value={form.firstName} onChange={e => setForm(f => ({...f, firstName: e.target.value}))} /></div>
            <div><Label>Last name</Label><Input value={form.lastName} onChange={e => setForm(f => ({...f, lastName: e.target.value}))} /></div>
          </>)}
          {step === 1 && (<>
            <div><Label>Email</Label><Input type="email" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} /></div>
            <div><Label>Phone</Label><Input value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))} /></div>
          </>)}
          {step === 2 && <p className="text-sm">{form.firstName} {form.lastName} - {form.email} - {form.phone}</p>}
        </CardContent>
      </Card>
      <div className="flex justify-between">
        <Button variant="outline" disabled={step === 0} onClick={() => setStep(s => s - 1)}>Back</Button>
        <Button onClick={() => step < 2 && setStep(s => s + 1)}>{step === 2 ? 'Submit' : 'Next'}</Button>
      </div>
    </div>
  );
}
