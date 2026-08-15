import {useState} from 'react';
import {Selector} from '@astryxdesign/core/Selector';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Button} from '@astryxdesign/core/Button';

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
    <div className="flex flex-col gap-4 p-4">
      <Selector
        label="Choose a snack"
        options={options}
        value={selected}
        onChange={setSelected}
        placeholder="Select a snack..."
      />
      {selected === 'other' && (
        <div className="flex items-end gap-2">
          <TextInput
            label="Custom snack"
            value={customSnack}
            onChange={setCustomSnack}
            placeholder="Enter your snack..."
          />
          <Button label="Apply" variant="primary" onClick={handleApply} />
        </div>
      )}
      {appliedSnack && (
        <p className="text-sm text-gray-600">Your snack: {appliedSnack}</p>
      )}
    </div>
  );
}
