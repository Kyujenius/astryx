import {ComplexSelector} from '@astryxdesign/core/ComplexSelector';
import {RadioList} from '@astryxdesign/core/RadioList';
import {VStack} from '@astryxdesign/core/VStack';
import {Text} from '@astryxdesign/core/Text';
import {Heading} from '@astryxdesign/core/Heading';
import {useState} from 'react';

const fruits = ['Apple', 'Banana', 'Mango', 'Strawberry'];
const ripenessLevels = ['Unripe', 'Ripe', 'Very Ripe'];

type FruitSelection = {fruit: string; ripeness: string};

export default function FruitPicker() {
  const [selection, setSelection] = useState<FruitSelection>({
    fruit: 'Apple',
    ripeness: 'Ripe',
  });

  return (
    <ComplexSelector
      label="Fruit & Ripeness"
      value={selection}
      onChange={setSelection}
      triggerLabel={`${selection.fruit} — ${selection.ripeness}`}
    >
      {(value, onChange, close) => (
        <VStack gap={3}>
          <Heading level={4}>Choose a fruit and ripeness</Heading>
          <VStack gap={2}>
            {fruits.map((fruit) => (
              <VStack key={fruit} gap={1}>
                <Text type="label">{fruit}</Text>
                <RadioList
                  label={`${fruit} ripeness`}
                  value={value.fruit === fruit ? value.ripeness : ''}
                  onChange={(ripeness) => {
                    const newValue = {fruit, ripeness};
                    onChange(newValue);
                    close();
                  }}
                  options={ripenessLevels.map((level) => ({
                    value: level,
                    label: level,
                  }))}
                />
              </VStack>
            ))}
          </VStack>
        </VStack>
      )}
    </ComplexSelector>
  );
}
