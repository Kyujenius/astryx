import {useState} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';

const STEPS = ['Cart', 'Shipping', 'Payment', 'Confirmation'];

export default function CheckoutFlow() {
  const [step, setStep] = useState(0);
  const [shipping, setShipping] = useState({name: '', address: '', city: ''});
  const [payment, setPayment] = useState({card: '', expiry: '', cvv: ''});

  const next = () => setStep((s) => Math.min(s + 1, 3));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <div className="max-w-md mx-auto flex flex-col gap-4">
      <div className="flex gap-3 text-sm">
        {STEPS.map((label, i) => (
          <span key={label} className={i === step ? 'font-bold' : 'text-muted-foreground'}>
            {i + 1}. {label}
          </span>
        ))}
      </div>

      {step === 0 && (
        <Card>
          <CardHeader><CardTitle>Cart Summary</CardTitle></CardHeader>
          <CardContent className="flex flex-col gap-2">
            <p>Wireless Headphones x 1 - $79.99</p>
            <p>USB-C Hub x 2 - $99.98</p>
            <p className="font-bold">Total: $179.97</p>
            <Button onClick={next}>Continue to shipping</Button>
          </CardContent>
        </Card>
      )}

      {step === 1 && (
        <Card>
          <CardHeader><CardTitle>Shipping</CardTitle></CardHeader>
          <CardContent className="flex flex-col gap-3">
            <div><Label htmlFor="s-name">Full name</Label><Input id="s-name" value={shipping.name} onChange={(e) => setShipping({...shipping, name: e.target.value})} required /></div>
            <div><Label htmlFor="s-addr">Address</Label><Input id="s-addr" value={shipping.address} onChange={(e) => setShipping({...shipping, address: e.target.value})} required /></div>
            <div><Label htmlFor="s-city">City</Label><Input id="s-city" value={shipping.city} onChange={(e) => setShipping({...shipping, city: e.target.value})} required /></div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={back}>Back</Button>
              <Button onClick={next}>Continue to payment</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader><CardTitle>Payment</CardTitle></CardHeader>
          <CardContent className="flex flex-col gap-3">
            <div><Label htmlFor="p-card">Card number</Label><Input id="p-card" value={payment.card} onChange={(e) => setPayment({...payment, card: e.target.value})} required /></div>
            <div className="flex gap-2">
              <div className="flex-1"><Label htmlFor="p-exp">Expiry</Label><Input id="p-exp" value={payment.expiry} onChange={(e) => setPayment({...payment, expiry: e.target.value})} required /></div>
              <div className="w-20"><Label htmlFor="p-cvv">CVV</Label><Input id="p-cvv" value={payment.cvv} onChange={(e) => setPayment({...payment, cvv: e.target.value})} required /></div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={back}>Back</Button>
              <Button onClick={next}>Place order</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardHeader><CardTitle>Order Confirmed</CardTitle></CardHeader>
          <CardContent>
            <p>Your order has been placed. You will receive a confirmation email shortly.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
