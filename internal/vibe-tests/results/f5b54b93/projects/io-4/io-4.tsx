// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState, useCallback} from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Minus, Plus} from 'lucide-react';

interface QuantitySelectorProps {
  itemId?: string;
  initialQuantity?: number;
}

export default function QuantitySelector({itemId = 'item-1', initialQuantity = 1}: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState(initialQuantity);

  const updateQuantity = useCallback(async (newQty: number) => {
    const clamped = Math.min(99, Math.max(1, newQty));
    setQuantity(clamped);
    await fetch('/api/cart/update', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({itemId, quantity: clamped}),
    });
  }, [itemId]);

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="icon" disabled={quantity <= 1} onClick={() => updateQuantity(quantity - 1)}>
        <Minus className="h-4 w-4" />
      </Button>
      <Input
        type="number"
        min={1}
        max={99}
        value={quantity}
        onChange={(e) => updateQuantity(parseInt(e.target.value) || 1)}
        className="w-16 text-center"
        aria-label="Quantity"
      />
      <Button variant="outline" size="icon" disabled={quantity >= 99} onClick={() => updateQuantity(quantity + 1)}>
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}
