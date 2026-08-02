import React, {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';

const steps = ['Cart', 'Shipping', 'Payment', 'Confirmation'];

export default function CheckoutFlow() {
  const [step, setStep] = useState(0);

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="flex justify-between">
        {steps.map((s, i) => (
          <div key={s} className={`flex items-center ${i <= step ? 'text-primary' : 'text-muted-foreground'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${i <= step ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
              {i + 1}
            </div>
            <span className="ml-2 text-sm">{s}</span>
          </div>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{steps[step]}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {step === 0 && <p>Your items are ready for checkout.</p>}
          {step === 1 && (
            <>
              <div><Label>Address</Label><Input /></div>
              <div><Label>City</Label><Input /></div>
            </>
          )}
          {step === 2 && (
            <>
              <div><Label>Card Number</Label><Input /></div>
              <div><Label>Expiry</Label><Input /></div>
            </>
          )}
          {step === 3 && <p>Your order has been placed successfully.</p>}
        </CardContent>
      </Card>

      <div className="flex gap-3">
        {step > 0 && <Button variant="outline" onClick={() => setStep(step - 1)}>Back</Button>}
        {step < 3 && <Button onClick={() => setStep(step + 1)}>{step === 2 ? 'Place Order' : 'Continue'}</Button>}
      </div>
    </div>
  );
}
