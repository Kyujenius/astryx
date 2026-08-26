import {useState} from 'react';
import {Card, CardContent} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';

export default function QuantitySelector() {
  const [qty, setQty] = useState(1);
  const price = 29.99;

  return (
    <Card>
      <CardContent className="pt-6 space-y-3">
        <p className="font-medium">Wireless Headphones</p>
        <p className="text-sm text-muted-foreground">${price.toFixed(2)} each</p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setQty(Math.max(1, qty - 1))} disabled={qty <= 1}>-</Button>
          <Input
            type="number"
            value={qty}
            onChange={(e) => setQty(Math.max(1, Math.min(99, parseInt(e.target.value) || 1)))}
            className="w-16 text-center"
            min={1}
            max={99}
            aria-label="Quantity"
          />
          <Button variant="outline" size="sm" onClick={() => setQty(Math.min(99, qty + 1))} disabled={qty >= 99}>+</Button>
        </div>
        <p className="font-bold">Total: ${(qty * price).toFixed(2)}</p>
      </CardContent>
    </Card>
  );
}
