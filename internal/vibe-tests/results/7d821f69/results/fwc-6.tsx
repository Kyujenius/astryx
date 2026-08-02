import React, {useState} from 'react';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {Label} from '@/components/ui/label';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';

export default function ShippingMethodSelector() {
  const [method, setMethod] = useState('standard');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipping Method</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup value={method} onValueChange={setMethod}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="standard" id="standard" />
            <Label htmlFor="standard">Standard (Free - 5-7 days)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="express" id="express" />
            <Label htmlFor="express">Express ($9.99 - 2-3 days)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="overnight" id="overnight" />
            <Label htmlFor="overnight">Overnight ($24.99 - Next day)</Label>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
