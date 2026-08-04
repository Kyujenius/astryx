// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';
import {useState} from 'react';
import {NumberInput} from '@astryxdesign/core/NumberInput';
import {Button} from '@astryxdesign/core/Button';
import {HStack} from '@astryxdesign/core/HStack';
import {VStack} from '@astryxdesign/core/VStack';
import {Text} from '@astryxdesign/core/Text';

export default function QuantitySelector() {
  const [quantity, setQuantity] = useState(1);
  const unitPrice = 24.99;

  return (
    <VStack gap={3} padding={4}>
      <Text type="label" weight="semibold">Quantity</Text>
      <HStack gap={2}>
        <Button
          label="Decrease quantity"
          isIconOnly
          variant="secondary"
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          isDisabled={quantity <= 1}
        >-</Button>
        <NumberInput
          label="Quantity"
          isLabelHidden
          value={quantity}
          onChange={(v) => setQuantity(Math.min(99, Math.max(1, v)))}
          min={1}
          max={99}
        />
        <Button
          label="Increase quantity"
          isIconOnly
          variant="secondary"
          onClick={() => setQuantity((q) => Math.min(99, q + 1))}
          isDisabled={quantity >= 99}
        >+</Button>
      </HStack>
      <Text type="supporting">
        Subtotal: ${(unitPrice * quantity).toFixed(2)}
      </Text>
    </VStack>
  );
}
