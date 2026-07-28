// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState, useCallback} from 'react';
import {NumberInput} from '@astryxdesign/core/NumberInput';
import {Text} from '@astryxdesign/core/Text';
import {Card} from '@astryxdesign/core/Card';

export default function QuantitySelector() {
  const [quantity, setQuantity] = useState<number>(1);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleChange = useCallback(async (value: number) => {
    const clamped = Math.max(1, Math.min(99, value));
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
    <Card padding={4} maxWidth={280}>
      <div className="flex items-center gap-3">
        <Text weight="medium">Quantity:</Text>
        <NumberInput
          label="Quantity"
          isLabelHidden
          value={quantity}
          onChange={handleChange}
          min={1}
          max={99}
          isLoading={isUpdating}
          size="sm"
        />
      </div>
    </Card>
  );
}
