import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';

type Step = 'cart' | 'shipping' | 'payment' | 'confirmation';

export default function CheckoutFlow() {
  const [step, setStep] = useState<Step>('cart');
  const [shipping, setShipping] = useState({name: '', address: '', city: '', zip: ''});
  const [payment, setPayment] = useState({card: '', expiry: '', cvv: ''});
  const total = 119.97;

  return (
    <div className="max-w-lg mx-auto py-8">
      {step === 'cart' && (
        <Card>
          <CardHeader><CardTitle>Cart Summary</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            <p>Widget Pro x2 - $99.98</p>
            <p>Gadget Lite x1 - $19.99</p>
            <p className="font-bold">Total: ${total}</p>
            <Button onClick={() => setStep('shipping')}>Continue to Shipping</Button>
          </CardContent>
        </Card>
      )}
      {step === 'shipping' && (
        <Card>
          <CardHeader><CardTitle>Shipping</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div><Label>Full Name</Label><Input value={shipping.name} onChange={(e) => setShipping({...shipping, name: e.target.value})} /></div>
            <div><Label>Address</Label><Input value={shipping.address} onChange={(e) => setShipping({...shipping, address: e.target.value})} /></div>
            <div><Label>City</Label><Input value={shipping.city} onChange={(e) => setShipping({...shipping, city: e.target.value})} /></div>
            <div><Label>ZIP</Label><Input value={shipping.zip} onChange={(e) => setShipping({...shipping, zip: e.target.value})} /></div>
            <Button onClick={() => setStep('payment')}>Continue to Payment</Button>
          </CardContent>
        </Card>
      )}
      {step === 'payment' && (
        <Card>
          <CardHeader><CardTitle>Payment</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div><Label>Card Number</Label><Input value={payment.card} onChange={(e) => setPayment({...payment, card: e.target.value})} /></div>
            <div><Label>Expiry</Label><Input value={payment.expiry} onChange={(e) => setPayment({...payment, expiry: e.target.value})} /></div>
            <div><Label>CVV</Label><Input type="password" value={payment.cvv} onChange={(e) => setPayment({...payment, cvv: e.target.value})} /></div>
            <Button onClick={() => setStep('confirmation')}>Place Order</Button>
          </CardContent>
        </Card>
      )}
      {step === 'confirmation' && (
        <Card>
          <CardHeader><CardTitle>Order Confirmed</CardTitle></CardHeader>
          <CardContent>
            <p>Thank you! Your order of ${total} will be shipped soon.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
