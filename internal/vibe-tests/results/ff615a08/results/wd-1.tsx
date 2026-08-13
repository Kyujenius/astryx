import {useState} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from '../components/ui/card';
import {Button} from '../components/ui/button';
import {Input} from '../components/ui/input';
import {Label} from '../components/ui/label';

type Step = 'cart' | 'shipping' | 'payment' | 'confirmation';

export default function CheckoutFlow() {
  const [step, setStep] = useState<Step>('cart');
  const [shipping, setShipping] = useState({name: '', address: '', city: ''});
  const [payment, setPayment] = useState({card: '', expiry: '', cvv: ''});

  return (
    <div className="max-w-lg mx-auto py-8">
      <Card>
        {step === 'cart' && (
          <CardContent className="space-y-4 pt-6">
            <CardHeader className="p-0"><CardTitle>Cart Summary</CardTitle></CardHeader>
            <p>Widget x2 - $29.98</p>
            <p>Gadget x1 - $49.99</p>
            <p className="font-bold text-lg">Total: $79.97</p>
            <Button onClick={() => setStep('shipping')}>Continue to Shipping</Button>
          </CardContent>
        )}
        {step === 'shipping' && (
          <CardContent className="space-y-4 pt-6">
            <CardHeader className="p-0"><CardTitle>Shipping</CardTitle></CardHeader>
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" value={shipping.name} onChange={(e) => setShipping(s => ({...s, name: e.target.value}))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" value={shipping.address} onChange={(e) => setShipping(s => ({...s, address: e.target.value}))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" value={shipping.city} onChange={(e) => setShipping(s => ({...s, city: e.target.value}))} />
            </div>
            <Button onClick={() => setStep('payment')}>Continue to Payment</Button>
          </CardContent>
        )}
        {step === 'payment' && (
          <CardContent className="space-y-4 pt-6">
            <CardHeader className="p-0"><CardTitle>Payment</CardTitle></CardHeader>
            <div className="space-y-2">
              <Label htmlFor="card">Card Number</Label>
              <Input id="card" value={payment.card} onChange={(e) => setPayment(s => ({...s, card: e.target.value}))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expiry">Expiry</Label>
              <Input id="expiry" value={payment.expiry} onChange={(e) => setPayment(s => ({...s, expiry: e.target.value}))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input id="cvv" value={payment.cvv} onChange={(e) => setPayment(s => ({...s, cvv: e.target.value}))} />
            </div>
            <Button onClick={() => setStep('confirmation')}>Place Order</Button>
          </CardContent>
        )}
        {step === 'confirmation' && (
          <CardContent className="space-y-4 pt-6 text-center">
            <CardHeader className="p-0"><CardTitle>Order Confirmed</CardTitle></CardHeader>
            <p>Thank you for your purchase. Your order has been placed.</p>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
