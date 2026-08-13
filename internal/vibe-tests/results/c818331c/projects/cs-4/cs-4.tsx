import {useState} from 'react';
import {ComplexSelector} from '@astryxdesign/core/ComplexSelector';
import {RadioList, RadioListItem} from '@astryxdesign/core/RadioList';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Button} from '@astryxdesign/core/Button';

const SNACKS = ['Apple', 'Banana', 'Orange', 'Other'];

export default function SnackSelector() {
  const [selected, setSelected] = useState('');
  const [customSnack, setCustomSnack] = useState('');

  const displayValue = selected === 'Other' ? customSnack || 'Other' : selected;

  return (
    <div className="max-w-sm">
      <ComplexSelector
        label="Snack"
        value={displayValue}
        onChange={setSelected}
        triggerLabel={displayValue || undefined}
        placeholder="Choose a snack"
      >
        {(value, onChange, close) => (
          <div className="flex flex-col gap-3 p-2">
            <RadioList
              label="Choose a snack"
              isLabelHidden
              value={selected}
              onChange={(val) => {
                setSelected(val);
                if (val !== 'Other') {
                  onChange(val);
                  close();
                }
              }}
            >
              {SNACKS.map((snack) => (
                <RadioListItem key={snack} label={snack} value={snack} />
              ))}
            </RadioList>
            {selected === 'Other' && (
              <TextInput
                label="Custom snack"
                value={customSnack}
                onChange={(val) => setCustomSnack(val)}
                placeholder="Type your snack"
                hasAutoFocus
              />
            )}
            {selected === 'Other' && customSnack && (
              <Button
                label="Apply"
                variant="primary"
                onClick={() => {
                  onChange(customSnack);
                  close();
                }}
              />
            )}
          </div>
        )}
      </ComplexSelector>
    </div>
  );
}
