import {useState} from 'react';
import {ComplexSelector} from '@astryxdesign/core/ComplexSelector';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';

const fruits = ['Apple', 'Banana', 'Mango', 'Strawberry'];
const ripenessLevels = ['Unripe', 'Almost Ripe', 'Ripe', 'Overripe'];

interface FruitSelection {
  fruit: string;
  ripeness: string;
}

export default function FruitPicker() {
  const [selection, setSelection] = useState<FruitSelection>({fruit: 'Apple', ripeness: 'Ripe'});

  return (
    <ComplexSelector<FruitSelection>
      label="Fruit and Ripeness"
      value={selection}
      onChange={setSelection}
      triggerLabel={`${selection.fruit} - ${selection.ripeness}`}
    >
      {(value, onChange, close) => (
        <div className="flex flex-col gap-3 p-3">
          <Text type="label">Select fruit and ripeness</Text>
          <div className="grid gap-1" style={{gridTemplateColumns: `auto repeat(${ripenessLevels.length}, 1fr)`}} role="grid" aria-label="Fruit ripeness grid">
            <div />
            {ripenessLevels.map(r => (
              <Text key={r} type="supporting" color="secondary">{r}</Text>
            ))}
            {fruits.map(fruit => (
              <>
                <Text key={`label-${fruit}`} type="label">{fruit}</Text>
                {ripenessLevels.map(ripeness => (
                  <Button
                    key={`${fruit}-${ripeness}`}
                    label={`${fruit} ${ripeness}`}
                    variant={value.fruit === fruit && value.ripeness === ripeness ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => {
                      onChange({fruit, ripeness});
                      close();
                    }}
                  />
                ))}
              </>
            ))}
          </div>
        </div>
      )}
    </ComplexSelector>
  );
}
