import {useState} from 'react';
import {Selector} from '@astryxdesign/core/Selector';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Button} from '@astryxdesign/core/Button';
import {Stack} from '@astryxdesign/core/Stack';

export default function SnackSelector() {
  const [selected, setSelected] = useState<string>('');
  const [customSnack, setCustomSnack] = useState('');
  const [appliedSnack, setAppliedSnack] = useState('');

  const options = [
    {value: 'apple', label: 'Apple'},
    {value: 'banana', label: 'Banana'},
    {value: 'orange', label: 'Orange'},
    {value: 'other', label: 'Other'},
  ];

  const handleApply = () => {
    if (customSnack.trim()) {
      setAppliedSnack(customSnack.trim());
    }
  };

  return (
    <Stack direction="vertical" gap={3}>
      <Selector
        label="Choose a snack"
        options={options}
        value={selected}
        onChange={setSelected}
        placeholder="Select a snack..."
      />
      {selected === 'other' && (
        <Stack direction="horizontal" gap={2} vAlign="end">
          <TextInput
            label="Custom snack"
            value={customSnack}
            onChange={setCustomSnack}
            placeholder="Enter your snack..."
          />
          <Button label="Apply" variant="primary" onClick={handleApply} />
        </Stack>
      )}
      {appliedSnack && (
        <p>Your snack: {appliedSnack}</p>
      )}
    </Stack>
  );
}
