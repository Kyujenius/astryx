// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';
import {useState} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Tabs, TabsList, TabsTrigger, TabsContent} from '@/components/ui/tabs';

type Step = 'cart' | 'shipping' | 'payment' | 'confirmation';

const cartItems = [
  {name: 'Wireless Mouse', price: 29.99, qty: 1},
  {name: 'USB-C Cable', price: 12.99, qty: 2},
];

export default function CheckoutFlow() {
  const [step, setStep] = useState<Step>('cart');
  const [shipping, setShipping] = useState({name: '', address: '', city: '', zip: ''});
  const [payment, setPayment] = useState({card: '', expiry: '', cvv: ''});

  const total = cartItems.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <div className="p-8 max-w-2xl mx-auto space-y-4">
      <h2 className="text-2xl font-bold">Checkout</h2>
      <Tabs value={step} onValueChange={(v) => setStep(v as Step)}>
        <TabsList>
          <TabsTrigger value="cart">Cart</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
          <TabsTrigger value="confirmation">Confirmation</TabsTrigger>
        </TabsList>
      </Tabs>

      {step === 'cart' && (
        <Card>
          <CardHeader><CardTitle>Cart Summary</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {cartItems.map((item) => (
              <div key={item.name} className="flex justify-between">
                <span>{item.name} x{item.qty}</span>
                <span className="font-semibold">${(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
            <p className="text-lg font-bold">Total: ${total.toFixed(2)}</p>
            <Button onClick={() => setStep('shipping')}>Continue to shipping</Button>
          </CardContent>
        </Card>
      )}

      {step === 'shipping' && (
        <Card>
          <CardHeader><CardTitle>Shipping Address</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div><Label>Full Name</Label><Input value={shipping.name} onChange={(e) => setShipping({...shipping, name: e.target.value})} /></div>
            <div><Label>Address</Label><Input value={shipping.address} onChange={(e) => setShipping({...shipping, address: e.target.value})} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>City</Label><Input value={shipping.city} onChange={(e) => setShipping({...shipping, city: e.target.value})} /></div>
              <div><Label>ZIP Code</Label><Input value={shipping.zip} onChange={(e) => setShipping({...shipping, zip: e.target.value})} /></div>
            </div>
            <Button onClick={() => setStep('payment')}>Continue to payment</Button>
          </CardContent>
        </Card>
      )}

      {step === 'payment' && (
        <Card>
          <CardHeader><CardTitle>Payment Details</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div><Label>Card Number</Label><Input value={payment.card} onChange={(e) => setPayment({...payment, card: e.target.value})} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Expiry</Label><Input value={payment.expiry} onChange={(e) => setPayment({...payment, expiry: e.target.value})} /></div>
              <div><Label>CVV</Label><Input value={payment.cvv} onChange={(e) => setPayment({...payment, cvv: e.target.value})} /></div>
            </div>
            <Button onClick={() => setStep('confirmation')}>Place order</Button>
          </CardContent>
        </Card>
      )}

      {step === 'confirmation' && (
        <Card>
          <CardHeader><CardTitle>Order Confirmed</CardTitle></CardHeader>
          <CardContent>
            <p>Your order has been placed. A confirmation email will be sent shortly.</p>
            <p className="text-sm text-muted-foreground mt-2">Order total: ${total.toFixed(2)}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
