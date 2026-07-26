// Copyright (c) Meta Platforms, Inc. and affiliates.

import React, {useState} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Separator} from '@/components/ui/separator';

const STEPS = ['Cart', 'Shipping', 'Payment', 'Confirmation'];

export default function CheckoutFlow() {
  const [step, setStep] = useState(0);

  return (
    <div className="max-w-xl mx-auto p-8 space-y-6">
      <div className="flex justify-between">
        {STEPS.map((s, i) => (
          <div key={s} className={`flex items-center gap-2 ${i <= step ? 'text-primary' : 'text-muted-foreground'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${i <= step ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>{i + 1}</div>
            <span className="text-sm hidden sm:inline">{s}</span>
          </div>
        ))}
      </div>
      <Card>
        <CardHeader><CardTitle>{STEPS[step]}</CardTitle></CardHeader>
        <CardContent>
          {step === 0 && (<div className="space-y-2">
            <div className="flex justify-between"><span>Widget Pro x2</span><span>$49.98</span></div>
            <div className="flex justify-between"><span>Gadget Mini</span><span>$19.99</span></div>
            <Separator /><div className="flex justify-between font-semibold"><span>Total</span><span>$69.97</span></div>
          </div>)}
          {step === 1 && (<div className="space-y-4"><div className="space-y-2"><Label>Address</Label><Input required /></div><div className="space-y-2"><Label>City</Label><Input required /></div></div>)}
          {step === 2 && (<div className="space-y-4"><div className="space-y-2"><Label>Card number</Label><Input required /></div><div className="space-y-2"><Label>Expiry</Label><Input required /></div></div>)}
          {step === 3 && (<div className="text-center py-8"><h3 className="text-xl font-semibold">Order confirmed!</h3><p className="text-muted-foreground">Thank you for your purchase.</p></div>)}
        </CardContent>
      </Card>
      <div className="flex justify-between">
        <Button variant="ghost" onClick={() => setStep(s => s - 1)} disabled={step === 0}>Back</Button>
        {step < 3 && <Button onClick={() => setStep(s => s + 1)}>{step === 2 ? 'Place order' : 'Continue'}</Button>}
      </div>
    </div>
  );
}
