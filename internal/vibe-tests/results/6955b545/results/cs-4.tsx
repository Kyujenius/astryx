import {useState} from 'react';
import {ComplexSelector} from '@astryxdesign/core/ComplexSelector';
import {RadioList, RadioListItem} from '@astryxdesign/core/RadioList';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Button} from '@astryxdesign/core/Button';

export default function SnackSelector() {
  const [snack, setSnack] = useState('');
  const [customSnack, setCustomSnack] = useState('');

  const triggerLabel = snack === 'other' ? customSnack || 'Other' : snack || undefined;

  return (
    <div className="p-4">
      <ComplexSelector
        label="Snack"
        value={snack}
        onChange={setSnack}
        triggerLabel={triggerLabel}
        placeholder="Choose a snack"
      >
        {(value, onChange, close) => (
          <div className="flex flex-col gap-3 p-2">
            <RadioList label="Available snacks" value={value} onChange={(v) => {
              onChange(v);
              if (v !== 'other') close();
            }}>
              <RadioListItem label="Apple" value="apple" />
              <RadioListItem label="Banana" value="banana" />
              <RadioListItem label="Orange" value="orange" />
              <RadioListItem label="Other" value="other" />
            </RadioList>
            {value === 'other' && (
              <TextInput
                label="Custom snack"
                value={customSnack}
                onChange={setCustomSnack}
                placeholder="Enter your snack"
              />
            )}
            {value === 'other' && (
              <Button label="Apply" size="sm" onClick={() => close()} />
            )}
          </div>
        )}
      </ComplexSelector>
    </div>
  );
}
