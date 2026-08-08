// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Label} from '@/components/ui/label';

export default function QuantitySelector() {
  const [quantity, setQuantity] = useState(1);
  const unitPrice = 29.99;
  const total = quantity * unitPrice;

  const decrement = () => setQuantity(q => Math.max(1, q - 1));
  const increment = () => setQuantity(q => Math.min(99, q + 1));
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val)) {setQuantity(Math.max(1, Math.min(99, val)));}
  };

  return (
    <div className="w-72 space-y-3">
      <Label>Quantity</Label>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={decrement} disabled={quantity <= 1}>-</Button>
        <Input
          type="number"
          value={quantity}
          onChange={handleChange}
          min={1}
          max={99}
          className="w-20 text-center"
        />
        <Button variant="outline" size="sm" onClick={increment} disabled={quantity >= 99}>+</Button>
      </div>
      <p className="text-sm text-muted-foreground">
        ${unitPrice.toFixed(2)} each - Total: ${total.toFixed(2)}
      </p>
    </div>
  );
}
