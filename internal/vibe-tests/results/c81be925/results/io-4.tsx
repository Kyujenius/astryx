import {useState} from 'react';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Label} from '@/components/ui/label';

export default function QuantitySelector() {
  const [qty, setQty] = useState(1);
  const [updating, setUpdating] = useState(false);

  const update = async (v: number) => {
    const clamped = Math.max(1, Math.min(99, v));
    setQty(clamped);
    setUpdating(true);
    try { await fetch('/api/cart/update', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({quantity: clamped})}); }
    finally { setUpdating(false); }
  };

  return (
    <div className="space-y-2 max-w-xs">
      <Label>Quantity</Label>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={() => update(qty - 1)} disabled={qty <= 1}>-</Button>
        <Input type="number" value={qty} onChange={(e) => update(Number(e.target.value))} min={1} max={99} className="w-20 text-center" />
        <Button variant="outline" size="sm" onClick={() => update(qty + 1)} disabled={qty >= 99}>+</Button>
      </div>
      {updating && <p className="text-sm text-muted-foreground">Updating cart...</p>}
    </div>
  );
}
