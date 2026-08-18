import {ComplexSelector} from '@astryxdesign/core/ComplexSelector';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Text} from '@astryxdesign/core/Text';
import {useState} from 'react';

const fruits = ['Apple', 'Banana', 'Mango', 'Strawberry'];
const ripenessLevels = ['Unripe', 'Ripe', 'Overripe'];

type Selection = { fruit: string; ripeness: string };

export default function FruitPicker() {
  const [selection, setSelection] = useState<Selection>({ fruit: 'Apple', ripeness: 'Ripe' });

  return (
    <ComplexSelector<Selection>
      label="Fruit & Ripeness"
      value={selection}
      onChange={setSelection}
      triggerLabel={`${selection.fruit} — ${selection.ripeness}`}
    >
      {(value, onChange, close) => (
        <VStack gap={2} padding={2}>
          <Text type="label">Select fruit and ripeness</Text>
          <div
            role="grid"
            aria-label="Fruit ripeness grid"
            style={{ display: 'grid', gridTemplateColumns: `auto repeat(${ripenessLevels.length}, 1fr)`, gap: '4px' }}
          >
            <div role="columnheader" />
            {ripenessLevels.map((r) => (
              <div key={r} role="columnheader">
                <Text type="supporting">{r}</Text>
              </div>
            ))}
            {fruits.map((fruit) => (
              <div key={fruit} role="row" style={{ display: 'contents' }}>
                <div role="rowheader">
                  <Text type="label">{fruit}</Text>
                </div>
                {ripenessLevels.map((ripeness) => {
                  const isSelected = value.fruit === fruit && value.ripeness === ripeness;
                  return (
                    <button
                      key={ripeness}
                      role="gridcell"
                      aria-selected={isSelected}
                      onClick={() => {
                        onChange({ fruit, ripeness });
                        close();
                      }}
                      style={{
                        padding: '8px',
                        border: isSelected ? '2px solid var(--color-accent)' : '1px solid var(--color-border)',
                        borderRadius: '4px',
                        background: isSelected ? 'var(--color-background-accent)' : 'transparent',
                        cursor: 'pointer',
                      }}
                    >
                      <Text type="supporting">{isSelected ? '✓' : ''}</Text>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </VStack>
      )}
    </ComplexSelector>
  );
}
