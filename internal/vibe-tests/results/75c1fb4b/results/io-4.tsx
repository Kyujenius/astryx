// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState, useCallback} from 'react';
import {NumberInput} from '@astryxdesign/core/NumberInput';
import {Stack} from '@astryxdesign/core/Stack';
import {Button} from '@astryxdesign/core/Button';

interface QuantitySelectorProps {
  itemId?: string;
  initialQuantity?: number;
}

export default function QuantitySelector({itemId = 'item-1', initialQuantity = 1}: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState<number | null>(initialQuantity);

  const updateQuantity = useCallback(async (newQty: number) => {
    setQuantity(newQty);
    await fetch('/api/cart/update', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({itemId, quantity: newQty}),
    });
  }, [itemId]);

  return (
    <Stack direction="horizontal" gap={2}>
      <Button
        label="Decrease"
        isIconOnly
        variant="secondary"
        isDisabled={quantity !== null && quantity <= 1}
        onClick={() => quantity !== null && updateQuantity(Math.max(1, quantity - 1))}
      />
      <NumberInput
        label="Quantity"
        isLabelHidden
        value={quantity}
        onChange={updateQuantity}
        min={1}
        max={99}
      />
      <Button
        label="Increase"
        isIconOnly
        variant="secondary"
        isDisabled={quantity !== null && quantity >= 99}
        onClick={() => quantity !== null && updateQuantity(Math.min(99, quantity + 1))}
      />
    </Stack>
  );
}
