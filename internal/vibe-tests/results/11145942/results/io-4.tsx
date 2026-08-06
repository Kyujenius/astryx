import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Minus, Plus} from 'lucide-react';
import {useState} from 'react';

export default function QuantitySelector() {
  const [qty, setQty] = useState(1);
  const update = async (n: number) => { const v = Math.max(1, Math.min(99, n)); setQty(v); await fetch('/api/cart/update', {method: 'POST', body: JSON.stringify({quantity: v})}); };

  return (
    <div className="flex items-center gap-1">
      <Button size="icon" variant="outline" disabled={qty <= 1} onClick={() => update(qty - 1)}><Minus className="h-4 w-4" /></Button>
      <Input type="number" min={1} max={99} value={qty} onChange={e => update(Number(e.target.value))} className="w-16 text-center" />
      <Button size="icon" variant="outline" disabled={qty >= 99} onClick={() => update(qty + 1)}><Plus className="h-4 w-4" /></Button>
    </div>
  );
}