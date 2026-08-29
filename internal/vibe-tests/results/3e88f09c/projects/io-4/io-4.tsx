import {useState, useCallback} from 'react';
import {NumberInput} from '@astryxdesign/core/NumberInput';
import {VStack} from '@astryxdesign/core/VStack';
import {Text} from '@astryxdesign/core/Text';

export default function QuantitySelector() {
  const [quantity, setQuantity] = useState<number>(1);
  const [updating, setUpdating] = useState(false);

  const handleChange = useCallback(async (value: number) => {
    const clamped = Math.max(1, Math.min(99, value));
    setQuantity(clamped);
    setUpdating(true);
    try {
      await fetch('/api/cart/update', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({quantity: clamped}),
      });
    } finally {
      setUpdating(false);
    }
  }, []);

  return (
    <VStack gap="sm">
      <NumberInput
        label="Quantity"
        value={quantity}
        onChange={handleChange}
        min={1}
        max={99}
        step={1}
      />
      {updating && <Text type="supporting">Updating cart...</Text>}
    </VStack>
  );
}
