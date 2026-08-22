import {ComplexSelector} from '@astryxdesign/core/ComplexSelector';
import {RadioList, RadioListItem} from '@astryxdesign/core/RadioList';
import {Text} from '@astryxdesign/core/Text';
import {useState} from 'react';

const fruits = ['Apple', 'Banana', 'Mango', 'Peach', 'Strawberry'];
const ripenessLevels = ['Unripe', 'Slightly Ripe', 'Ripe', 'Overripe'];

interface FruitSelection {
  fruit: string;
  ripeness: string;
}

export default function FruitPicker() {
  const [selection, setSelection] = useState<FruitSelection>({fruit: 'Apple', ripeness: 'Ripe'});

  return (
    <ComplexSelector
      label="Fruit & Ripeness"
      value={selection}
      onChange={setSelection}
      triggerLabel={`${selection.fruit} - ${selection.ripeness}`}
    >
      {(value, onChange, close) => (
        <div className="p-4 flex flex-col gap-4">
          <RadioList
            label="Fruit"
            value={value.fruit}
            onChange={(fruit) => onChange({...value, fruit})}
          >
            {fruits.map((f) => (
              <RadioListItem key={f} value={f} label={f} />
            ))}
          </RadioList>
          <RadioList
            label="Ripeness"
            value={value.ripeness}
            onChange={(ripeness) => {
              onChange({...value, ripeness});
              close();
            }}
          >
            {ripenessLevels.map((r) => (
              <RadioListItem key={r} value={r} label={r} />
            ))}
          </RadioList>
        </div>
      )}
    </ComplexSelector>
  );
}
