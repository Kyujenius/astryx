import {useState} from 'react';
import {ComplexSelector} from '@astryxdesign/core/ComplexSelector';
import {RadioList, RadioListItem} from '@astryxdesign/core/RadioList';
import {TextInput} from '@astryxdesign/core/TextInput';
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
      {(value, onChange, close) => {
        const [selection, setSelection] = useState(
          ['Apple', 'Banana', 'Orange'].includes(value) ? value : 'Other'
        );
        const [custom, setCustom] = useState(
          ['Apple', 'Banana', 'Orange'].includes(value) ? '' : value
        );

        return (
          <div>
            <RadioList label="Choose a snack" value={selection} onChange={setSelection}>
              <RadioListItem value="Apple" label="Apple" />
              <RadioListItem value="Banana" label="Banana" />
              <RadioListItem value="Orange" label="Orange" />
              <RadioListItem value="Other" label="Other" />
            </RadioList>
            {selection === 'Other' && (
              <>
                <TextInput
                  label="Custom snack"
                  value={custom}
                  onChange={setCustom}
                  placeholder="Enter a snack"
                />
                <Button
                  label="Apply"
                  variant="primary"
                  onClick={() => {
                    if (custom.trim()) {
                      onChange(custom.trim());
                      close();
                    }
                  }}
                />
              </>
            )}
            {selection !== 'Other' && (
              <Button
                label="Apply"
                variant="primary"
                onClick={() => {
                  onChange(selection);
                  close();
                }}
              />
            )}
          </div>
        );
      }}
    </ComplexSelector>
  );
}
