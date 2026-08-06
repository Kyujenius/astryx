import {NumberInput} from '@astryxdesign/core/NumberInput';
import {IconButton} from '@astryxdesign/core/IconButton';
import {Stack} from '@astryxdesign/core/Stack';
import {useState, useCallback} from 'react';

interface QuantitySelectorProps { initialQuantity?: number; onUpdate?: (quantity: number) => Promise<void>; }

export default function QuantitySelector({initialQuantity = 1, onUpdate}: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState(initialQuantity);
  const [isUpdating, setIsUpdating] = useState(false);

  const updateQuantity = useCallback(async (newQty: number) => {
    const clamped = Math.max(1, Math.min(99, newQty));
    setQuantity(clamped);
    setIsUpdating(true);
    try { await onUpdate?.(clamped); } finally { setIsUpdating(false); }
  }, [onUpdate]);

  return (
    <Stack direction="row" gap={1} align="center">
      <IconButton label="Decrease" icon="remove" variant="secondary" size="sm" isDisabled={quantity <= 1 || isUpdating} onClick={() => updateQuantity(quantity - 1)} />
      <NumberInput label="Quantity" isLabelHidden value={quantity} onChange={val => updateQuantity(val)} min={1} max={99} step={1} size="sm" />
      <IconButton label="Increase" icon="add" variant="secondary" size="sm" isDisabled={quantity >= 99 || isUpdating} onClick={() => updateQuantity(quantity + 1)} />
    </Stack>
  );
}