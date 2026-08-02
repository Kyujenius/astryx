import React, {useState} from 'react';
import {RadioList} from '@astryxdesign/core/RadioList';
import {RadioListItem} from '@astryxdesign/core/RadioList';
import {Card} from '@astryxdesign/core/Card';
import {Text} from '@astryxdesign/core/Text';

export default function ShippingMethodSelector() {
  const [method, setMethod] = useState('standard');

  return (
    <Card>
      <RadioList
        label="Shipping Method"
        value={method}
        onChange={setMethod}
      >
        <RadioListItem
          value="standard"
          label="Standard"
          description="Free - 5-7 business days"
        />
        <RadioListItem
          value="express"
          label="Express"
          description="$9.99 - 2-3 business days"
        />
        <RadioListItem
          value="overnight"
          label="Overnight"
          description="$24.99 - Next day delivery"
        />
      </RadioList>
    </Card>
  );
}
