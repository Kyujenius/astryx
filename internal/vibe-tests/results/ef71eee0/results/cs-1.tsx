import React, {useState} from 'react';
import {ComplexSelector} from '@astryxdesign/core/ComplexSelector';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {RadioList, RadioListItem} from '@astryxdesign/core/RadioList';
import {Text} from '@astryxdesign/core/Text';

const fruits = ['Apple', 'Banana', 'Mango', 'Peach', 'Strawberry'];
const ripenessLevels = ['Unripe', 'Slightly Ripe', 'Ripe', 'Very Ripe'];

type Selection = {fruit: string; ripeness: string};

export default function FruitPicker() {
  const [value, setValue] = useState<Selection>({fruit: 'Apple', ripeness: 'Ripe'});

  return (
    <ComplexSelector
      label="Fruit and ripeness"
      value={value}
      onChange={setValue}
      triggerLabel={`${value.fruit} - ${value.ripeness}`}
    >
      {(current, onChange, close) => (
        <VStack gap={3} padding={3}>
          <Text type="label">Choose a fruit and ripeness</Text>
          <HStack gap={4}>
            <VStack gap={1}>
              <Text type="label" weight="semibold">Fruit</Text>
              <RadioList
                value={current.fruit}
                onChange={(fruit: string) => onChange({...current, fruit})}
              >
                {fruits.map(f => (
                  <RadioListItem key={f} value={f} label={f} />
                ))}
              </RadioList>
            </VStack>
            <VStack gap={1}>
              <Text type="label" weight="semibold">Ripeness</Text>
              <RadioList
                value={current.ripeness}
                onChange={(ripeness: string) => {
                  onChange({...current, ripeness});
                  close();
                }}
              >
                {ripenessLevels.map(r => (
                  <RadioListItem key={r} value={r} label={r} />
                ))}
              </RadioList>
            </VStack>
          </HStack>
        </VStack>
      )}
    </ComplexSelector>
  );
}
