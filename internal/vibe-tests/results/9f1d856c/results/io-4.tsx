import {useState} from 'react';
import {NumberInput} from '@astryxdesign/core/NumberInput';
import {HStack} from '@astryxdesign/core/HStack';
import {Text} from '@astryxdesign/core/Text';
import {Card} from '@astryxdesign/core/Card';
import {VStack} from '@astryxdesign/core/VStack';
import {Button} from '@astryxdesign/core/Button';

export default function QuantitySelector() {
  const [quantity, setQuantity] = useState(1);
  const pricePerItem = 29.99;

  return (
    <Card width={320} padding={4}>
      <VStack gap={3}>
        <Text>Premium Widget</Text>
        <Text color="secondary">${pricePerItem.toFixed(2)} each</Text>
        <NumberInput
          label="Quantity"
          value={quantity}
          onChange={(val) => setQuantity(val ?? 1)}
          min={1}
          max={99}
          step={1}
        />
        <HStack hAlign="between" vAlign="center">
          <Text>Total:</Text>
          <Text>${(quantity * pricePerItem).toFixed(2)}</Text>
        </HStack>
        <Button label="Add to cart" variant="primary" width="100%" />
      </VStack>
    </Card>
  );
}
