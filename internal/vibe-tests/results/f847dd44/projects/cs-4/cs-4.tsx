import {useState} from 'react';
import {Selector} from '@astryxdesign/core/Selector';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Button} from '@astryxdesign/core/Button';
import {VStack} from '@astryxdesign/core/VStack';

export default function SnackSelector() {
  const [selected, setSelected] = useState<string>('');
  const [customSnack, setCustomSnack] = useState('');
  const [appliedSnack, setAppliedSnack] = useState<string | null>(null);

  return (
    <VStack gap="md">
      <Selector
        label="Choose a snack"
        options={['Apple', 'Banana', 'Orange', 'Other']}
        value={selected}
        onChange={setSelected}
        placeholder="Select a snack..."
      />
      {selected === 'Other' && (
        <VStack gap="sm">
          <TextInput
            label="Custom snack"
            value={customSnack}
            onChange={setCustomSnack}
            placeholder="Enter your snack..."
          />
          <Button
            label="Apply"
            variant="primary"
            onPress={() => {
              if (customSnack.trim()) {
                setAppliedSnack(customSnack);
              }
            }}
          />
        </VStack>
      )}
      {appliedSnack && <p>Selected: {appliedSnack}</p>}
      {selected && selected !== 'Other' && <p>Selected: {selected}</p>}
    </VStack>
  );
}
