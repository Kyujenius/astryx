import {useState} from 'react';
import {ComplexSelector} from '@astryxdesign/core/ComplexSelector';
import {RadioList, RadioListItem} from '@astryxdesign/core/RadioList';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Button} from '@astryxdesign/core/Button';
import {VStack} from '@astryxdesign/core/VStack';

export default function SnackSelector() {
  const [snack, setSnack] = useState('');

  return (
    <ComplexSelector
      label="Snack"
      value={snack}
      onChange={setSnack}
      triggerLabel={snack || undefined}
      placeholder="Select a snack..."
    >
      {(value, onChange, close) => {
        const [draft, setDraft] = useState(value || 'Apple');
        const [customSnack, setCustomSnack] = useState('');

        return (
          <VStack gap={3} padding={3}>
            <RadioList label="Choose a snack" value={draft} onChange={setDraft}>
              <RadioListItem value="Apple" label="Apple" />
              <RadioListItem value="Banana" label="Banana" />
              <RadioListItem value="Orange" label="Orange" />
              <RadioListItem value="Other" label="Other" />
            </RadioList>
            {draft === 'Other' && (
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
              onClick={() => {
                onChange(draft === 'Other' ? customSnack : draft);
                close();
              }}
            />
          </VStack>
        );
      }}
    </ComplexSelector>
  );
}
