// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Label} from '@/components/ui/label';

export default function SnackSelector() {
  const [selected, setSelected] = useState('apple');
  const [customSnack, setCustomSnack] = useState('');
  const [appliedSnack, setAppliedSnack] = useState<string | null>(null);

  const handleApply = () => {
    const value = selected === 'other' ? customSnack : selected;
    setAppliedSnack(value);
  };

  return (
    <div className="space-y-4 p-4">
      <RadioGroup value={selected} onValueChange={setSelected}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="apple" id="apple" />
          <Label htmlFor="apple">Apple</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="banana" id="banana" />
          <Label htmlFor="banana">Banana</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="orange" id="orange" />
          <Label htmlFor="orange">Orange</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="other" id="other" />
          <Label htmlFor="other">Other</Label>
        </div>
      </RadioGroup>
      {selected === 'other' && (
        <Input
          placeholder="Enter your snack"
          value={customSnack}
          onChange={(e) => setCustomSnack(e.target.value)}
        />
      )}
      <Button onClick={handleApply}>Apply</Button>
      {appliedSnack && <p className="text-sm text-green-600">Selected: {appliedSnack}</p>}
    </div>
  );
}
