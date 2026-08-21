import {useState} from 'react';
import {ComplexSelector} from '@astryxdesign/core/ComplexSelector';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
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
        <VStack gap={3} padding={3}>
          <Text type="label">Select fruit and ripeness</Text>
          <div
            role="grid"
            aria-label="Fruit ripeness grid"
            style={{display: 'grid', gridTemplateColumns: `auto repeat(${ripenessLevels.length}, 1fr)`, gap: '4px'}}
          >
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
        </VStack>
      )}
    </ComplexSelector>
  );
}
