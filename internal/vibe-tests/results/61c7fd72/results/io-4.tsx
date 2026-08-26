import {useState} from 'react';
import {NumberInput} from '@astryxdesign/core/NumberInput';
import {Button} from '@astryxdesign/core/Button';
import {Card} from '@astryxdesign/core/Card';
import {Text} from '@astryxdesign/core/Text';

export default function QuantitySelector() {
  const [qty, setQty] = useState(1);
  const price = 29.99;

  return (
    <Card padding={3}>
      <div className="flex flex-col gap-3">
        <Text weight="medium">Wireless Headphones</Text>
        <Text color="secondary">${price.toFixed(2)} each</Text>
        <div className="flex items-center gap-2">
          <Button variant="outlined" size="sm" onPress={() => setQty(Math.max(1, qty - 1))} isDisabled={qty <= 1} aria-label="Decrease">-</Button>
          <NumberInput label="Quantity" isLabelHidden value={qty} onChange={(v) => setQty(Math.max(1, v ?? 1))} min={1} max={99} width={64} />
          <Button variant="outlined" size="sm" onPress={() => setQty(Math.min(99, qty + 1))} isDisabled={qty >= 99} aria-label="Increase">+</Button>
        </div>
        <Text weight="bold">Total: ${(qty * price).toFixed(2)}</Text>
      </div>
    </Card>
  );
}
