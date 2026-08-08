// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {NumberInput} from '@astryxdesign/core/NumberInput';
import {Text} from '@astryxdesign/core/Text';

export default function QuantitySelector() {
  const [quantity, setQuantity] = useState<number | null>(1);
  const unitPrice = 29.99;
  const total = (quantity ?? 0) * unitPrice;

  return (
    <div className="w-72 flex flex-col gap-3">
      <NumberInput
        label="Quantity"
        value={quantity}
        onChange={setQuantity}
        min={1}
        max={99}
        step={1}
      />
      <Text type="supporting" color="secondary">
        ${unitPrice.toFixed(2)} each - Total: ${total.toFixed(2)}
      </Text>
    </div>
  );
}
