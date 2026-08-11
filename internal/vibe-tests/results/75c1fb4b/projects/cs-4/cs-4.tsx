// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {RadioList, RadioListItem} from '@astryxdesign/core/RadioList';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Button} from '@astryxdesign/core/Button';
import {Stack} from '@astryxdesign/core/Stack';

export default function SnackSelector() {
  const [selected, setSelected] = useState('apple');
  const [customSnack, setCustomSnack] = useState('');
  const [appliedSnack, setAppliedSnack] = useState<string | null>(null);

  const handleApply = () => {
    const value = selected === 'other' ? customSnack : selected;
    setAppliedSnack(value);
  };

  return (
    <Stack gap={4}>
      <RadioList label="Choose a snack" value={selected} onChange={setSelected}>
        <RadioListItem label="Apple" value="apple" />
        <RadioListItem label="Banana" value="banana" />
        <RadioListItem label="Orange" value="orange" />
        <RadioListItem label="Other" value="other" />
      </RadioList>
      {selected === 'other' && (
        <TextInput
          label="Custom snack"
          value={customSnack}
          onChange={setCustomSnack}
          placeholder="Enter your snack"
        />
      )}
      <Button label="Apply" variant="primary" onClick={handleApply} />
      {appliedSnack && <p className="text-sm text-green-600 mt-2">Selected: {appliedSnack}</p>}
    </Stack>
  );
}
