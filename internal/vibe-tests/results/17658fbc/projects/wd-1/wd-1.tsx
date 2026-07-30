import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {Badge} from '@/components/ui/badge';
import {CheckCircle2} from 'lucide-react';

type Step = 'cart' | 'shipping' | 'payment' | 'confirmation';

export default function CheckoutFlow() {
  const [step, setStep] = useState<Step>('cart');

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold">Checkout</h1>
      <Tabs value={step} onValueChange={(v) => setStep(v as Step)}>
        <TabsList><TabsTrigger value="cart">Cart</TabsTrigger><TabsTrigger value="shipping">Shipping</TabsTrigger><TabsTrigger value="payment">Payment</TabsTrigger><TabsTrigger value="confirmation">Confirmation</TabsTrigger></TabsList>
        <TabsContent value="cart">
          <Card><CardHeader><CardTitle>Cart Summary</CardTitle></CardHeader><CardContent className="space-y-3">
            <div className="flex justify-between"><span>Widget Pro</span><span>$49.99</span></div>
            <div className="flex justify-between"><span>Premium Cable</span><span>$12.99</span></div>
            <div className="flex justify-between font-bold border-t pt-2"><span>Total</span><span>$62.98</span></div>
            <Button onClick={() => setStep('shipping')}>Continue to Shipping</Button>
          </CardContent></Card>
        </TabsContent>
        <TabsContent value="shipping">
          <Card><CardHeader><CardTitle>Shipping</CardTitle></CardHeader><CardContent className="space-y-3">
            <div><Label>Full name</Label><Input /></div>
            <div><Label>Address</Label><Input /></div>
            <div><Label>City</Label><Input /></div>
            <div className="flex gap-2"><Button variant="ghost" onClick={() => setStep('cart')}>Back</Button><Button onClick={() => setStep('payment')}>Continue</Button></div>
          </CardContent></Card>
        </TabsContent>
        <TabsContent value="payment">
          <Card><CardHeader><CardTitle>Payment</CardTitle></CardHeader><CardContent className="space-y-3">
            <Select defaultValue="credit"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="credit">Credit Card</SelectItem><SelectItem value="paypal">PayPal</SelectItem></SelectContent></Select>
            <div><Label>Card number</Label><Input /></div>
            <div className="flex gap-2"><Button variant="ghost" onClick={() => setStep('shipping')}>Back</Button><Button onClick={() => setStep('confirmation')}>Place Order</Button></div>
          </CardContent></Card>
        </TabsContent>
        <TabsContent value="confirmation">
          <Card><CardContent className="flex flex-col items-center gap-4 py-8">
            <CheckCircle2 className="h-12 w-12 text-green-500" />
            <h2 className="text-2xl font-bold">Order Confirmed</h2>
            <p className="text-muted-foreground">Confirmation email sent.</p>
            <Badge>Order #12345</Badge>
          </CardContent></Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
