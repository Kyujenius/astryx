// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {Label} from '@/components/ui/label';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';

export default function SnackSelector() {
  const [selected, setSelected] = useState('');
  const [customSnack, setCustomSnack] = useState('');
  const [applied, setApplied] = useState('');

  return (
    <div className="space-y-4 p-4 max-w-sm">
      <div className="space-y-2">
        <Label>Choose a snack</Label>
        <Select value={selected} onValueChange={setSelected}>
          <SelectTrigger>
            <SelectValue placeholder="Select a snack" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="orange">Orange</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {selected === 'other' && (
        <div className="space-y-2">
          <Label htmlFor="custom">Custom snack</Label>
          <Input
            id="custom"
            value={customSnack}
            onChange={(e) => setCustomSnack(e.target.value)}
            placeholder="Enter your snack"
          />
          <Button
            disabled={!customSnack}
            onClick={() => setApplied(customSnack)}
          >
            Apply
          </Button>
        </div>
      )}
      {applied && <p className="text-sm text-green-600">Selected snack: {applied}</p>}
    </div>
  );
}
