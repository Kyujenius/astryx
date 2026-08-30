import React, {useState} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Badge} from '@/components/ui/badge';
import {Separator} from '@/components/ui/separator';

type Step = 'cart'|'shipping'|'payment'|'confirmation';
const steps: {key:Step;label:string}[] = [{key:'cart',label:'Cart'},{key:'shipping',label:'Shipping'},{key:'payment',label:'Payment'},{key:'confirmation',label:'Confirmation'}];

export default function CheckoutFlow() {
  const [step, setStep] = useState<Step>('cart');
  const [name, setName] = useState('');
  const [addr, setAddr] = useState('');
  const [card, setCard] = useState('');
  const si = steps.findIndex(s => s.key === step);
  return (
    <Card className="w-full max-w-lg">
      <CardHeader><div className="flex gap-2 justify-center">{steps.map((s,i) => <React.Fragment key={s.key}><Badge variant={i===si?'default':i<si?'secondary':'outline'}>{s.label}</Badge>{i<steps.length-1 && <span className="text-muted-foreground">-</span>}</React.Fragment>)}</div></CardHeader>
      <CardContent className="space-y-4">
        <Separator />
        {step==='cart' && <div className="space-y-3"><CardTitle>Cart Summary</CardTitle><div className="flex justify-between"><span>Wireless Headphones x1</span><span className="font-semibold">$299.99</span></div><div className="flex justify-between"><span>USB-C Cable x2</span><span className="font-semibold">$19.98</span></div><Separator /><div className="flex justify-between font-bold"><span>Total</span><span>$319.97</span></div></div>}
        {step==='shipping' && <div className="space-y-3"><CardTitle>Shipping</CardTitle><div className="space-y-2"><Label>Full Name</Label><Input value={name} onChange={e=>setName(e.target.value)} /></div><div className="space-y-2"><Label>Address</Label><Input value={addr} onChange={e=>setAddr(e.target.value)} /></div></div>}
        {step==='payment' && <div className="space-y-3"><CardTitle>Payment</CardTitle><div className="space-y-2"><Label>Card Number</Label><Input value={card} onChange={e=>setCard(e.target.value)} /></div></div>}
        {step==='confirmation' && <div className="text-center space-y-2"><CardTitle>Order Confirmed</CardTitle><p className="text-muted-foreground">Your order has been placed.</p></div>}
        <div className="flex justify-end gap-2">{si>0 && step!=='confirmation' && <Button variant="ghost" onClick={()=>setStep(steps[si-1].key)}>Back</Button>}{step!=='confirmation' && <Button onClick={()=>setStep(steps[si+1].key)}>{si===steps.length-2?'Place Order':'Continue'}</Button>}</div>
      </CardContent>
    </Card>
  );
}
