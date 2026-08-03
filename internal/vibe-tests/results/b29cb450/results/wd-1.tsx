// Copyright (c) Meta Platforms, Inc. and affiliates.

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

  if (step === 'cart') {
    return (
      <Card>
        <CardHeader><CardTitle>Cart Summary</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between"><span>Widget Pro x2</span><span>$49.98</span></div>
          <div className="flex justify-between"><span>Gadget Plus x1</span><span>$29.99</span></div>
          <div className="flex justify-between border-t pt-2 font-semibold"><span>Total</span><span>$79.97</span></div>
          <Button className="w-full" onClick={() => setStep('shipping')}>Continue to Shipping</Button>
        </CardContent>
      </Card>
    );
  }

  if (step === 'shipping') {
    return (
      <Card>
        <CardHeader><CardTitle>Shipping</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div><Label htmlFor="name">Full Name</Label><Input id="name" value={shipping.name} onChange={e => setShipping(s => ({...s, name: e.target.value}))} /></div>
          <div><Label htmlFor="address">Address</Label><Input id="address" value={shipping.address} onChange={e => setShipping(s => ({...s, address: e.target.value}))} /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><Label htmlFor="city">City</Label><Input id="city" value={shipping.city} onChange={e => setShipping(s => ({...s, city: e.target.value}))} /></div>
            <div><Label htmlFor="zip">ZIP</Label><Input id="zip" value={shipping.zip} onChange={e => setShipping(s => ({...s, zip: e.target.value}))} /></div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setStep('cart')}>Back</Button>
            <Button onClick={() => setStep('payment')}>Continue to Payment</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (step === 'payment') {
    return (
      <Card>
        <CardHeader><CardTitle>Payment</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div><Label htmlFor="card">Card Number</Label><Input id="card" value={payment.card} onChange={e => setPayment(s => ({...s, card: e.target.value}))} /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><Label htmlFor="expiry">Expiry</Label><Input id="expiry" placeholder="MM/YY" value={payment.expiry} onChange={e => setPayment(s => ({...s, expiry: e.target.value}))} /></div>
            <div><Label htmlFor="cvv">CVV</Label><Input id="cvv" value={payment.cvv} onChange={e => setPayment(s => ({...s, cvv: e.target.value}))} /></div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setStep('shipping')}>Back</Button>
            <Button onClick={() => setStep('confirmation')}>Place Order</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader><CardTitle>Order Confirmed</CardTitle></CardHeader>
      <CardContent className="text-center py-8 space-y-2">
        <p>Your order has been placed. A confirmation email will arrive shortly.</p>
        <p className="text-sm text-muted-foreground">Order #ORD-2026-0803</p>
      </CardContent>
    </Card>
  );
}
