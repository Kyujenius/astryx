// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {RadioList, RadioListItem} from '@astryxdesign/core/RadioList';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Button} from '@astryxdesign/core/Button';

export default function SnackSelector() {
  const [selected, setSelected] = useState('');
  const [customSnack, setCustomSnack] = useState('');
  const [appliedSnack, setAppliedSnack] = useState('');

  return (
    <div className="p-4 max-w-md">
      <RadioList label="Choose a snack" value={selected} onChange={setSelected}>
        <RadioListItem label="Apple" value="apple" />
        <RadioListItem label="Banana" value="banana" />
        <RadioListItem label="Orange" value="orange" />
        <RadioListItem label="Other" value="other" />
      </RadioList>
      {selected === 'other' && (
        <div className="mt-4 flex flex-col gap-2">
          <TextInput label="Custom snack" value={customSnack} onChange={setCustomSnack} placeholder="Enter your snack" />
          <Button label="Apply" onPress={() => setAppliedSnack(customSnack.trim())} />
        </div>
      )}
      {appliedSnack && <p className="mt-2 text-sm">Selected: {appliedSnack}</p>}
    </div>
  );
}