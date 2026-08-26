import {useState} from 'react';
import {NumberInput} from '@astryxdesign/core/NumberInput';
import {Button} from '@astryxdesign/core/Button';
import {HStack} from '@astryxdesign/core/HStack';
import {VStack} from '@astryxdesign/core/VStack';
import {Card} from '@astryxdesign/core/Card';
import {Text} from '@astryxdesign/core/Text';

export default function QuantitySelector() {
  const [quantity, setQuantity] = useState(1);
  const price = 29.99;

  return (
    <Card padding={3}>
      <VStack gap={2}>
        <Text weight="medium">Wireless Headphones</Text>
        <Text color="secondary">${price.toFixed(2)} each</Text>
        <HStack gap={2} align="center">
          <Button
            variant="outlined"
            size="sm"
            onPress={() => setQuantity(Math.max(1, quantity - 1))}
            isDisabled={quantity <= 1}
            aria-label="Decrease quantity"
          >
            -
          </Button>
          <NumberInput
            label="Quantity"
            isLabelHidden
            value={quantity}
            onChange={(v) => setQuantity(Math.max(1, v ?? 1))}
            min={1}
            max={99}
            width={64}
          />
          <Button
            variant="outlined"
            size="sm"
            onPress={() => setQuantity(Math.min(99, quantity + 1))}
            isDisabled={quantity >= 99}
            aria-label="Increase quantity"
          >
            +
          </Button>
        </HStack>
        <Text weight="bold">Total: ${(quantity * price).toFixed(2)}</Text>
      </VStack>
    </Card>
  );
}
