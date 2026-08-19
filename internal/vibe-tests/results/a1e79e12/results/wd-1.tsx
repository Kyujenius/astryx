import {useState} from 'react';
import {Button} from './components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from './components/ui/card';
import {Input} from './components/ui/input';
import {Label} from './components/ui/label';
import {Separator} from './components/ui/separator';
import {Tabs, TabsContent, TabsList, TabsTrigger} from './components/ui/tabs';

export default function CheckoutFlow() {
  const [step, setStep] = useState('cart');

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Checkout</h1>
      <Tabs value={step} onValueChange={setStep}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="cart">Cart</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
          <TabsTrigger value="done">Done</TabsTrigger>
        </TabsList>
        <TabsContent value="cart">
          <Card><CardHeader><CardTitle>Cart Summary</CardTitle></CardHeader><CardContent className="space-y-4">
            <div className="flex justify-between"><span>Widget Pro x2</span><span>$49.98</span></div>
            <div className="flex justify-between"><span>Gadget Lite x1</span><span>$19.99</span></div>
            <Separator />
            <div className="flex justify-between font-bold"><span>Total</span><span>$69.97</span></div>
            <Button className="w-full" onClick={() => setStep('shipping')}>Continue to Shipping</Button>
          </CardContent></Card>
        </TabsContent>
        <TabsContent value="shipping">
          <Card><CardHeader><CardTitle>Shipping</CardTitle></CardHeader><CardContent className="space-y-4">
            <div className="space-y-2"><Label htmlFor="name">Full name</Label><Input id="name" /></div>
            <div className="space-y-2"><Label htmlFor="addr">Address</Label><Input id="addr" /></div>
            <div className="grid grid-cols-2 gap-4"><div className="space-y-2"><Label htmlFor="city">City</Label><Input id="city" /></div><div className="space-y-2"><Label htmlFor="zip">Zip</Label><Input id="zip" /></div></div>
            <Button className="w-full" onClick={() => setStep('payment')}>Continue to Payment</Button>
          </CardContent></Card>
        </TabsContent>
        <TabsContent value="payment">
          <Card><CardHeader><CardTitle>Payment</CardTitle></CardHeader><CardContent className="space-y-4">
            <div className="space-y-2"><Label htmlFor="card">Card number</Label><Input id="card" placeholder="1234 5678 9012 3456" /></div>
            <div className="grid grid-cols-2 gap-4"><div className="space-y-2"><Label htmlFor="exp">Expiry</Label><Input id="exp" placeholder="MM/YY" /></div><div className="space-y-2"><Label htmlFor="cvc">CVC</Label><Input id="cvc" placeholder="123" /></div></div>
            <Button className="w-full" onClick={() => setStep('done')}>Place Order</Button>
          </CardContent></Card>
        </TabsContent>
        <TabsContent value="done">
          <Card><CardContent className="text-center space-y-4 pt-6">
            <div className="p-3 rounded-md bg-green-50 text-green-800">Order placed successfully!</div>
            <h2 className="text-2xl font-bold">Thank you!</h2>
            <p className="text-muted-foreground">Your order #12345 has been confirmed.</p>
          </CardContent></Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
