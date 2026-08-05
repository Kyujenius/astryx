// Copyright (c) Meta Platforms, Inc. and affiliates.

"use client";
import {useState} from 'react';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Label} from '@/components/ui/label';

export default function SnackSelector() {
  const [selected, setSelected] = useState('');
  const [customSnack, setCustomSnack] = useState('');
  const [appliedSnack, setAppliedSnack] = useState('');

  return (
    <div className="p-4 max-w-md space-y-4">
      <Label>Choose a snack</Label>
      <RadioGroup value={selected} onValueChange={setSelected}>
        {['apple', 'banana', 'orange', 'other'].map((opt) => (
          <div key={opt} className="flex items-center space-x-2">
            <RadioGroupItem value={opt} id={opt} />
            <Label htmlFor={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</Label>
          </div>
        ))}
      </RadioGroup>
      {selected === 'other' && (
        <div className="space-y-2">
          <Input placeholder="Enter your snack" value={customSnack} onChange={(e) => setCustomSnack(e.target.value)} />
          <Button onClick={() => setAppliedSnack(customSnack.trim())}>Apply</Button>
        </div>
      )}
      {appliedSnack && <p className="text-sm text-muted-foreground">Selected: {appliedSnack}</p>}
    </div>
  );
}