// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {RadioList, RadioListItem} from '@astryxdesign/core/RadioList';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Stack} from '@astryxdesign/core/Stack';
import {Button} from '@astryxdesign/core/Button';
import {Field} from '@astryxdesign/core/Field';

export default function SnackSelector() {
  const [selected, setSelected] = useState('');
  const [customSnack, setCustomSnack] = useState('');
  const [applied, setApplied] = useState('');

  return (
    <Stack gap={4} padding={4}>
      <RadioList label="Choose a snack" value={selected} onChange={setSelected}>
        <RadioListItem value="apple" label="Apple" />
        <RadioListItem value="banana" label="Banana" />
        <RadioListItem value="orange" label="Orange" />
        <RadioListItem value="other" label="Other" />
      </RadioList>
      {selected === 'other' && (
        <Stack gap={2}>
          <TextInput
            label="Custom snack"
            value={customSnack}
            onChange={setCustomSnack}
            placeholder="Enter your snack"
          />
          <Button
            label="Apply"
            variant="primary"
            isDisabled={!customSnack}
            onClick={() => setApplied(customSnack)}
          />
        </Stack>
      )}
      {applied && <p>Selected snack: {applied}</p>}
    </Stack>
  );
}
