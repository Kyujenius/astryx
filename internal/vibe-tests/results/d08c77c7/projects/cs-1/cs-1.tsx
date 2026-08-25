import {useState} from 'react';
import {ComplexSelector} from '@astryxdesign/core/ComplexSelector';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Text} from '@astryxdesign/core/Text';
import stylex from '@stylexjs/stylex';

const fruits = ['Apple', 'Banana', 'Cherry', 'Mango', 'Peach'];
const ripenessLevels = ['Unripe', 'Nearly Ripe', 'Ripe', 'Overripe'];

type Selection = {fruit: string; ripeness: string} | null;

const styles = stylex.create({
  grid: {
    display: 'grid',
    gridTemplateColumns: `repeat(${ripenessLevels.length}, 1fr)`,
    gap: 4,
    padding: 8,
  },
  cell: {
    padding: 8,
    borderRadius: 4,
    cursor: 'pointer',
    textAlign: 'center' as const,
    border: '1px solid #e0e0e0',
  },
  cellSelected: {
    backgroundColor: '#e3f2fd',
    borderColor: '#1976d2',
  },
  header: {
    fontWeight: 'bold' as const,
    padding: 8,
    textAlign: 'center' as const,
  },
});

export default function FruitPicker() {
  const [value, setValue] = useState<Selection>(null);

  return (
    <VStack gap={3} padding={4}>
      <ComplexSelector
        label="Fruit and ripeness"
        value={value}
        onChange={setValue}
        triggerLabel={
          value ? `${value.fruit} - ${value.ripeness}` : undefined
        }
        placeholder="Choose fruit and ripeness"
      >
        {(currentValue, onChange, close) => (
          <VStack gap={2} padding={3}>
            <HStack gap={2}>
              <div {...stylex.props(styles.header)} />
              {ripenessLevels.map((level) => (
                <div key={level} {...stylex.props(styles.header)}>
                  <Text>{level}</Text>
                </div>
              ))}
            </HStack>
            {fruits.map((fruit) => (
              <HStack key={fruit} gap={2}>
                <div {...stylex.props(styles.header)}>
                  <Text>{fruit}</Text>
                </div>
                {ripenessLevels.map((level) => {
                  const isSelected =
                    currentValue?.fruit === fruit &&
                    currentValue?.ripeness === level;
                  return (
                    <div
                      key={level}
                      role="gridcell"
                      tabIndex={0}
                      {...stylex.props(styles.cell, isSelected && styles.cellSelected)}
                      onClick={() => {
                        onChange({fruit, ripeness: level});
                        close();
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          onChange({fruit, ripeness: level});
                          close();
                        }
                      }}
                    >
                      <Text>{isSelected ? '\u2713' : '\u00A0'}</Text>
                    </div>
                  );
                })}
              </HStack>
            ))}
          </VStack>
        )}
      </ComplexSelector>
    </VStack>
  );
}
