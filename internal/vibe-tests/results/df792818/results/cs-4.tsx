// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Label} from '@/components/ui/label';

export default function SnackSelector() {
  const [selected, setSelected] = useState('');
  const [customSnack, setCustomSnack] = useState('');

  return (
    <div className="flex flex-col gap-4 max-w-sm">
      <div className="flex flex-col gap-2">
        <Label htmlFor="snack">Choose a snack</Label>
        <Select value={selected} onValueChange={setSelected}>
          <SelectTrigger id="snack">
            <SelectValue placeholder="Select a snack..." />
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
        <div className="flex items-end gap-2">
          <div className="flex-1 flex flex-col gap-2">
            <Label htmlFor="custom">Custom snack</Label>
            <Input
              id="custom"
              value={customSnack}
              onChange={e => setCustomSnack(e.target.value)}
              placeholder="Enter your snack"
            />
          </div>
          <Button onClick={() => {}}>Apply</Button>
        </div>
      )}
    </div>
  );
}
