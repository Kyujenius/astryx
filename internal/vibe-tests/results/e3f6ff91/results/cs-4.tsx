// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {Selector} from '@astryxdesign/core/Selector';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Stack} from '@astryxdesign/core/Stack';
import {Button} from '@astryxdesign/core/Button';

export default function SnackSelector() {
  const [selected, setSelected] = useState('');
  const [customSnack, setCustomSnack] = useState('');
  const [appliedCustom, setAppliedCustom] = useState('');

  const options = [
    {value: 'apple', label: 'Apple'},
    {value: 'banana', label: 'Banana'},
    {value: 'orange', label: 'Orange'},
    {value: 'other', label: 'Other'},
  ];

  return (
    <Stack gap={3}>
      <Selector
        label="Choose a snack"
        options={options}
        value={selected}
        onChange={setSelected}
        placeholder="Select a snack..."
      />
      {selected === 'other' && (
        <Stack direction="horizontal" gap={2} align="end">
          <TextInput
            label="Custom snack"
            value={customSnack}
            onChange={setCustomSnack}
            placeholder="Enter your snack"
          />
          <Button
            label="Apply"
            variant="primary"
            onClick={() => setAppliedCustom(customSnack)}
          />
        </Stack>
      )}
    </Stack>
  );
}
