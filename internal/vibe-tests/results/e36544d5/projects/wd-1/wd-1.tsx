// Copyright (c) Meta Platforms, Inc. and affiliates.

import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {useState} from 'react';

export default function CheckoutFlow() {
  const [step, setStep] = useState('cart');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [card, setCard] = useState('');

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <Tabs value={step} onValueChange={setStep}>
        <TabsList className="w-full">
          <TabsTrigger value="cart">Cart</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
          <TabsTrigger value="confirmation">Done</TabsTrigger>
        </TabsList>
        <TabsContent value="cart">
          <Card>
            <CardHeader><CardTitle>Cart Summary</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between"><span>Widget Pro x2</span><span className="font-bold">$49.98</span></div>
              <div className="border-t pt-2 flex justify-between font-bold"><span>Total</span><span>$49.98</span></div>
              <Button className="w-full" onClick={() => setStep('shipping')}>Continue to Shipping</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="shipping">
          <Card>
            <CardContent className="space-y-3 pt-6">
              <div className="space-y-2"><Label>Full Name</Label><Input value={name} onChange={(e) => setName(e.target.value)} /></div>
              <div className="space-y-2"><Label>Address</Label><Input value={address} onChange={(e) => setAddress(e.target.value)} /></div>
              <Button className="w-full" onClick={() => setStep('payment')}>Continue to Payment</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="payment">
          <Card>
            <CardContent className="space-y-3 pt-6">
              <div className="space-y-2"><Label>Card Number</Label><Input value={card} onChange={(e) => setCard(e.target.value)} /></div>
              <Button className="w-full" onClick={() => setStep('confirmation')}>Place Order</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="confirmation">
          <Card><CardContent className="pt-6 text-center"><p className="text-green-600 font-bold">Order Confirmed!</p><p>Thank you for your purchase.</p></CardContent></Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
