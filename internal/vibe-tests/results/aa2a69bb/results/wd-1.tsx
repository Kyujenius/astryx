import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Badge} from '@/components/ui/badge';
import {Separator} from '@/components/ui/separator';

type Step = 'cart' | 'shipping' | 'payment' | 'confirmation';

export default function CheckoutFlow() {
  const [step, setStep] = useState<Step>('cart');
  const steps: Step[] = ['cart', 'shipping', 'payment', 'confirmation'];
  const currentIndex = steps.indexOf(step);

  return (
    <div className="flex flex-col gap-6 p-6 max-w-lg mx-auto">
      <div className="flex gap-2">
        {steps.map((s, i) => (
          <Badge key={s} variant={i <= currentIndex ? 'default' : 'secondary'}>
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </Badge>
        ))}
      </div>

      <Separator />

      {step === 'cart' && (
        <Card>
          <CardHeader><CardTitle>Cart Summary</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between"><span>Widget Pro × 2</span><span className="font-semibold">$59.98</span></div>
            <div className="flex justify-between"><span>Gadget Lite × 1</span><span className="font-semibold">$24.99</span></div>
            <Separator />
            <div className="flex justify-between font-bold"><span>Total</span><span>$84.97</span></div>
            <Button className="w-full" onClick={() => setStep('shipping')}>Continue to Shipping</Button>
          </CardContent>
        </Card>
      )}

      {step === 'shipping' && (
        <Card>
          <CardHeader><CardTitle>Shipping Address</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div><Label htmlFor="name">Full Name</Label><Input id="name" placeholder="Jane Doe" /></div>
            <div><Label htmlFor="address">Address</Label><Input id="address" placeholder="123 Main St" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label htmlFor="city">City</Label><Input id="city" placeholder="San Francisco" /></div>
              <div><Label htmlFor="zip">Zip</Label><Input id="zip" placeholder="94105" /></div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep('cart')}>Back</Button>
              <Button onClick={() => setStep('payment')}>Continue to Payment</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 'payment' && (
        <Card>
          <CardHeader><CardTitle>Payment</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div><Label htmlFor="card">Card Number</Label><Input id="card" placeholder="4242 4242 4242 4242" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label htmlFor="exp">Expiry</Label><Input id="exp" placeholder="MM/YY" /></div>
              <div><Label htmlFor="cvc">CVC</Label><Input id="cvc" placeholder="123" /></div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep('shipping')}>Back</Button>
              <Button onClick={() => setStep('confirmation')}>Place Order</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 'confirmation' && (
        <Card>
          <CardContent className="text-center py-8 space-y-3">
            <h2 className="text-2xl font-bold">Order Confirmed!</h2>
            <p className="text-muted-foreground">Your order has been placed. Confirmation email incoming.</p>
            <p className="text-sm text-muted-foreground">Order #ORD-2026-0842</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
