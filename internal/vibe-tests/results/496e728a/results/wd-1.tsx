import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {useState} from 'react';

type Step = 'cart' | 'shipping' | 'payment' | 'confirmation';
const STEPS: Step[] = ['cart', 'shipping', 'payment', 'confirmation'];

export default function CheckoutFlow() {
  const [currentStep, setCurrentStep] = useState<Step>('cart');
  const stepIndex = STEPS.indexOf(currentStep);

  const next = () => {
    if (stepIndex < STEPS.length - 1) setCurrentStep(STEPS[stepIndex + 1]);
  };
  const back = () => {
    if (stepIndex > 0) setCurrentStep(STEPS[stepIndex - 1]);
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <div className="flex gap-2">
        {STEPS.map((step, i) => (
          <div
            key={step}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
              i <= stepIndex ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            }`}
          >
            {i + 1}
          </div>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {currentStep === 'cart' && 'Cart Summary'}
            {currentStep === 'shipping' && 'Shipping'}
            {currentStep === 'payment' && 'Payment'}
            {currentStep === 'confirmation' && 'Order Confirmed'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentStep === 'cart' && <p>Review your items before proceeding.</p>}
          {currentStep === 'shipping' && (
            <>
              <div><Label htmlFor="name">Full Name</Label><Input id="name" placeholder="Jane Doe" /></div>
              <div><Label htmlFor="address">Address</Label><Input id="address" placeholder="123 Main St" /></div>
              <div><Label htmlFor="city">City</Label><Input id="city" placeholder="San Francisco" /></div>
              <div><Label htmlFor="zip">Zip</Label><Input id="zip" placeholder="94102" /></div>
            </>
          )}
          {currentStep === 'payment' && (
            <>
              <div><Label htmlFor="card">Card Number</Label><Input id="card" placeholder="4242 4242 4242 4242" /></div>
              <div><Label htmlFor="exp">Expiry</Label><Input id="exp" placeholder="MM/YY" /></div>
              <div><Label htmlFor="cvc">CVC</Label><Input id="cvc" placeholder="123" /></div>
            </>
          )}
          {currentStep === 'confirmation' && <p>Thank you for your purchase.</p>}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        {stepIndex > 0 && currentStep !== 'confirmation' && (
          <Button variant="outline" onClick={back}>Back</Button>
        )}
        {currentStep !== 'confirmation' && (
          <Button onClick={next}>{currentStep === 'payment' ? 'Place Order' : 'Continue'}</Button>
        )}
      </div>
    </div>
  );
}
