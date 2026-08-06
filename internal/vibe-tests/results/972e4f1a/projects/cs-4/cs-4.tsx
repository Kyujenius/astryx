import {Selector} from '@astryxdesign/core/Selector';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Button} from '@astryxdesign/core/Button';
import {Stack} from '@astryxdesign/core/Stack';
import {useState} from 'react';

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

  return (
    <Stack gap={3}>
      <Selector label="Choose a snack" options={options} value={selected} onChange={setSelected} placeholder="Select a snack..." />
      {selected === 'other' && <TextInput label="Custom snack" value={customSnack} onChange={setCustomSnack} placeholder="Enter your snack..." />}
      <Button label="Apply" variant="primary" onClick={() => setAppliedSnack(selected === 'other' ? customSnack : selected)} isDisabled={selected === 'other' ? !customSnack : !selected} />
      {appliedSnack && <p>Selected: {appliedSnack}</p>}
    </Stack>
  );
}