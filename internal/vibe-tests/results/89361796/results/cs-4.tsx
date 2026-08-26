import {useState} from 'react';
import {ComplexSelector} from '@astryxdesign/core/ComplexSelector';
import {RadioList, RadioListItem} from '@astryxdesign/core/RadioList';
import {TextInput} from '@astryxdesign/core/TextInput';
import {VStack} from '@astryxdesign/core/VStack';
import {Button} from '@astryxdesign/core/Button';

export default function SnackSelector() {
  const [snack, setSnack] = useState('Apple');
  const [customSnack, setCustomSnack] = useState('');

  return (
    <ComplexSelector
      label="Snack"
      value={snack}
      onChange={setSnack}
      triggerLabel={snack}
    >
      {(value, onChange, close) => (
        <VStack gap={2} padding={2}>
          <RadioList label="Choose a snack" value={value} onChange={onChange}>
            <RadioListItem value="Apple" label="Apple" />
            <RadioListItem value="Banana" label="Banana" />
            <RadioListItem value="Orange" label="Orange" />
            <RadioListItem value="__other" label="Other" />
          </RadioList>
          {value === '__other' && (
            <TextInput
              label="Custom snack"
              value={customSnack}
              onChange={setCustomSnack}
              placeholder="Enter your snack"
            />
          )}
          {value === '__other' && (
            <Button
              variant="filled"
              onPress={() => {
                if (customSnack.trim()) {
                  onChange(customSnack.trim());
                  close();
                }
              }}
            >
              Apply
            </Button>
          )}
        </VStack>
      )}
    </ComplexSelector>
  );
}
