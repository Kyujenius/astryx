import {useState} from 'react';
import {ComplexSelector} from '@astryxdesign/core/ComplexSelector';
import {RadioList, RadioListItem} from '@astryxdesign/core/RadioList';
import {TextInput} from '@astryxdesign/core/TextInput';

export default function SnackSelector() {
  const [snack, setSnack] = useState('');
  const [customSnack, setCustomSnack] = useState('');

  const triggerLabel = snack === 'other' ? customSnack || 'Other' : snack || undefined;

  return (
    <ComplexSelector
      label="Snack"
      value={snack}
      onChange={setSnack}
      triggerLabel={triggerLabel}
      placeholder="Choose a snack"
    >
      {(value, onChange, close) => (
        <div>
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
            <button onClick={() => close()} type="button">Apply</button>
          )}
        </div>
      )}
    </ComplexSelector>
  );
}
