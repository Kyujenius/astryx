import {useState} from 'react';
import {ComplexSelector} from '@astryxdesign/core/ComplexSelector';
import {RadioList} from '@astryxdesign/core/RadioList';
import {TextInput} from '@astryxdesign/core/TextInput';
import {VStack} from '@astryxdesign/core/VStack';
import {Button} from '@astryxdesign/core/Button';

const snackOptions = ['Apple', 'Banana', 'Orange', 'Other'];

export default function SnackSelector() {
  const [snack, setSnack] = useState('');
  const [customSnack, setCustomSnack] = useState('');

  return (
    <div className="max-w-sm">
      <ComplexSelector
        label="Choose a snack"
        value={snack}
        onChange={setSnack}
        triggerLabel={snack === 'Other' ? customSnack || 'Other' : snack || undefined}
      >
        {(value, onChange, close) => (
          <VStack gap={3} padding={3}>
            <RadioList
              label="Snack options"
              value={value}
              onChange={(val) => {
                onChange(val);
                if (val !== 'Other') close();
              }}
              options={snackOptions}
            />
            {value === 'Other' && (
              <VStack gap={2}>
                <TextInput
                  label="Custom snack"
                  value={customSnack}
                  onChange={setCustomSnack}
                  placeholder="Enter your snack"
                />
                <Button
                  label="Apply"
                  variant="primary"
                  onClick={() => close()}
                  isDisabled={!customSnack}
                />
              </VStack>
            )}
          </VStack>
        )}
      </ComplexSelector>
    </div>
  );
}
