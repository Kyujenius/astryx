import {useState} from 'react';
import {Selector} from '@astryxdesign/core/Selector';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Button} from '@astryxdesign/core/Button';
import {VStack} from '@astryxdesign/core/VStack';

export default function SnackSelector() {
  const [selected, setSelected] = useState<string>('');
  const [customSnack, setCustomSnack] = useState('');
  const [appliedSnack, setAppliedSnack] = useState<string | null>(null);

  const handleChange = (value: string) => {
    setSelected(value);
    if (value !== 'other') {
      setAppliedSnack(value);
    }
  };

  const handleApplyCustom = () => {
    if (customSnack.trim()) {
      setAppliedSnack(customSnack.trim());
    }
  };

  return (
    <VStack gap={3}>
      <Selector
        label="Snack"
        options={['Apple', 'Banana', 'Orange', {value: 'other', label: 'Other'}]}
        value={selected}
        onChange={handleChange}
        placeholder="Choose a snack"
      />
      {selected === 'other' && (
        <VStack gap={2}>
          <TextInput
            label="Custom snack"
            value={customSnack}
            onChange={setCustomSnack}
            placeholder="Enter your snack"
          />
          <Button onClick={handleApplyCustom}>Apply</Button>
        </VStack>
      )}
      {appliedSnack && <p>Selected snack: {appliedSnack}</p>}
    </VStack>
  );
}
