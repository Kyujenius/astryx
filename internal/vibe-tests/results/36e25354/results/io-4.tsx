// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';
import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';

export default function QuantitySelector() {
  const [quantity, setQuantity] = useState(1);
  const unitPrice = 24.99;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val)) {setQuantity(Math.min(99, Math.max(1, val)));}
  };

  return (
    <div className="p-6 space-y-3">
      <Label htmlFor="qty" className="font-semibold">Quantity</Label>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          disabled={quantity <= 1}
          aria-label="Decrease quantity"
        >-</Button>
        <Input
          id="qty"
          type="number"
          value={quantity}
          onChange={handleChange}
          min={1}
          max={99}
          className="w-20 text-center"
        />
        <Button
          variant="outline"
          size="icon"
          onClick={() => setQuantity((q) => Math.min(99, q + 1))}
          disabled={quantity >= 99}
          aria-label="Increase quantity"
        >+</Button>
      </div>
      <p className="text-sm text-muted-foreground">
        Subtotal: ${(unitPrice * quantity).toFixed(2)}
      </p>
    </div>
  );
}
