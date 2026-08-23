import {useState} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';

type Step = 'cart' | 'shipping' | 'payment' | 'confirmation';
const STEPS: Step[] = ['cart', 'shipping', 'payment', 'confirmation'];

export default function CheckoutFlow() {
  const [step, setStep] = useState<Step>('cart');
  const [shipping, setShipping] = useState({name: '', address: '', city: '', zip: ''});
  const [payment, setPayment] = useState({card: '', expiry: '', cvv: ''});
  const currentIndex = STEPS.indexOf(step);
  const next = () => setStep(STEPS[currentIndex + 1]);
  const back = () => setStep(STEPS[currentIndex - 1]);

  return (
    <div className="max-w-lg mx-auto p-6">
      <div className="flex gap-2 mb-6">
        {STEPS.map((_, i) => (
          <div key={i} className={`flex-1 h-1 rounded ${i <= currentIndex ? 'bg-primary' : 'bg-muted'}`} />
        ))}
      </div>
      <Card>
        <CardHeader><CardTitle>{step === 'cart' ? 'Cart Summary' : step === 'shipping' ? 'Shipping' : step === 'payment' ? 'Payment' : 'Order Confirmed'}</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {step === 'cart' && (
            <>
              <p>Widget Pro x2 - $49.98</p>
              <p>Gadget Mini x1 - $19.99</p>
              <p className="font-bold text-lg">Total: $69.97</p>
              <Button onClick={next} className="w-full">Continue to Shipping</Button>
            </>
          )}
          {step === 'shipping' && (
            <>
              <div><Label htmlFor="name">Full Name</Label><Input id="name" value={shipping.name} onChange={(e) => setShipping({...shipping, name: e.target.value})} /></div>
              <div><Label htmlFor="address">Address</Label><Input id="address" value={shipping.address} onChange={(e) => setShipping({...shipping, address: e.target.value})} /></div>
              <div><Label htmlFor="city">City</Label><Input id="city" value={shipping.city} onChange={(e) => setShipping({...shipping, city: e.target.value})} /></div>
              <div><Label htmlFor="zip">ZIP</Label><Input id="zip" value={shipping.zip} onChange={(e) => setShipping({...shipping, zip: e.target.value})} /></div>
              <div className="flex justify-between"><Button variant="ghost" onClick={back}>Back</Button><Button onClick={next}>Continue</Button></div>
            </>
          )}
          {step === 'payment' && (
            <>
              <div><Label htmlFor="card">Card Number</Label><Input id="card" value={payment.card} onChange={(e) => setPayment({...payment, card: e.target.value})} /></div>
              <div><Label htmlFor="expiry">Expiry</Label><Input id="expiry" value={payment.expiry} onChange={(e) => setPayment({...payment, expiry: e.target.value})} /></div>
              <div><Label htmlFor="cvv">CVV</Label><Input id="cvv" value={payment.cvv} onChange={(e) => setPayment({...payment, cvv: e.target.value})} /></div>
              <div className="flex justify-between"><Button variant="ghost" onClick={back}>Back</Button><Button onClick={next}>Place Order</Button></div>
            </>
          )}
          {step === 'confirmation' && <p>Your order has been placed. You will receive a confirmation email shortly.</p>}
        </CardContent>
      </Card>
    </div>
  );
}
