// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState, useCallback} from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';

export default function QuantitySelector() {
  const [quantity, setQuantity] = useState(1);
  const [isUpdating, setIsUpdating] = useState(false);

  const update = useCallback(async (newVal: number) => {
    const clamped = Math.max(1, Math.min(99, newVal));
    setQuantity(clamped);
    setIsUpdating(true);
    try {
      await fetch('/api/cart/update', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({quantity: clamped}),
      });
    } finally {
      setIsUpdating(false);
    }
  }, []);

  return (
    <div className="flex items-center gap-2 p-4 border rounded-lg max-w-xs">
      <Label htmlFor="qty" className="font-medium">Quantity:</Label>
      <div className="flex items-center gap-1">
        <Button variant="outline" size="icon" onClick={() => update(quantity - 1)} disabled={quantity <= 1 || isUpdating} aria-label="Decrease quantity">-</Button>
        <Input id="qty" type="number" min={1} max={99} value={quantity} onChange={e => update(Number(e.target.value))} className="w-14 text-center" disabled={isUpdating} />
        <Button variant="outline" size="icon" onClick={() => update(quantity + 1)} disabled={quantity >= 99 || isUpdating} aria-label="Increase quantity">+</Button>
      </div>
    </div>
  );
}
