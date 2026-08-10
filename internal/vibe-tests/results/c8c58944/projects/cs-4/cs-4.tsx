// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {Selector} from '@astryxdesign/core/Selector';
import {TextInput} from '@astryxdesign/core/TextInput';
import {VStack} from '@astryxdesign/core/VStack';
import {Button} from '@astryxdesign/core/Button';

export default function SnackSelector() {
  const [selected, setSelected] = useState('');
  const [customSnack, setCustomSnack] = useState('');
  const [appliedSnack, setAppliedSnack] = useState('');

  const options = [
    {value: 'apple', label: 'Apple'},
    {value: 'banana', label: 'Banana'},
    {value: 'orange', label: 'Orange'},
    {value: 'other', label: 'Other'},
  ];

  const handleApply = () => {
    const snack = selected === 'other' ? customSnack : selected;
    setAppliedSnack(snack);
  };

  return (
    <VStack gap={3} padding={4}>
      <Selector
        label="Choose a snack"
        options={options}
        value={selected}
        onChange={setSelected}
        placeholder="Select a snack..."
      />
      {selected === 'other' && (
        <TextInput
          label="Custom snack"
          value={customSnack}
          onChange={setCustomSnack}
          placeholder="Enter your snack..."
        />
      )}
      <Button
        label="Apply"
        variant="primary"
        onClick={handleApply}
        isDisabled={selected === '' || (selected === 'other' && customSnack === '')}
      />
      {appliedSnack && (
        <Text type="body">Selected snack: {appliedSnack}</Text>
      )}
    </VStack>
  );
}
