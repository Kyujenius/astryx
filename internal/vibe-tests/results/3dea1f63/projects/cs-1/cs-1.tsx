import {useState} from 'react';
import {ComplexSelector} from '@astryxdesign/core/ComplexSelector';
import {VStack} from '@astryxdesign/core/VStack';
import {Text} from '@astryxdesign/core/Text';

const fruits = ['Apple', 'Banana', 'Cherry', 'Mango', 'Peach'];
const ripenessLevels = ['Unripe', 'Nearly Ripe', 'Ripe', 'Overripe'];

type Selection = {fruit: string; ripeness: string} | null;

export default function FruitPicker() {
  const [value, setValue] = useState<Selection>(null);

  return (
    <VStack gap={3} padding={4}>
      <ComplexSelector
        label="Fruit and ripeness"
        value={value}
        onChange={setValue}
        triggerLabel={value ? `${value.fruit} - ${value.ripeness}` : undefined}
        placeholder="Choose fruit and ripeness"
      >
        {(currentValue, onChange, close) => (
          <div className="p-4">
            <div className="grid gap-1" style={{gridTemplateColumns: `80px repeat(${ripenessLevels.length}, 1fr)`}}>
              <div />
              {ripenessLevels.map((level) => (
                <div key={level} className="text-center text-sm font-medium p-2">
                  {level}
                </div>
              ))}
              {fruits.map((fruit) => (
                <>
                  <div key={`label-${fruit}`} className="flex items-center font-medium text-sm">
                    {fruit}
                  </div>
                  {ripenessLevels.map((level) => {
                    const isSelected = currentValue?.fruit === fruit && currentValue?.ripeness === level;
                    return (
                      <button
                        key={`${fruit}-${level}`}
                        className={`p-2 rounded border text-center cursor-pointer transition-colors ${
                          isSelected ? 'bg-blue-100 border-blue-500' : 'border-gray-200 hover:bg-gray-50'
                        }`}
                        onClick={() => { onChange({fruit, ripeness: level}); close(); }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            onChange({fruit, ripeness: level});
                            close();
                          }
                        }}
                      >
                        {isSelected ? '\u2713' : '\u00A0'}
                      </button>
                    );
                  })}
                </>
              ))}
            </div>
          </div>
        )}
      </ComplexSelector>
    </VStack>
  );
}
