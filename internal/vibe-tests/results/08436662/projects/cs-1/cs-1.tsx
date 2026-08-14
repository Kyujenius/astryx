import {ComplexSelector} from '@astryxdesign/core/ComplexSelector';
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
    <div className="p-4">
      <ComplexSelector
        label="Fruit & Ripeness"
        value={selection}
        onChange={setSelection}
        triggerLabel={`${selection.fruit} — ${selection.ripeness}`}
      >
        {(value, onChange, close) => (
          <div className="p-3 space-y-4">
            <Heading level={4}>Pick a fruit and ripeness</Heading>
            <div className="grid grid-cols-4 gap-2">
              {fruits.map((fruit) => (
                <div key={fruit} className="space-y-1">
                  <Text type="label" className="font-medium">{fruit}</Text>
                  {ripenessLevels.map((level) => (
                    <button
                      key={level}
                      className={`block w-full px-2 py-1 rounded text-sm text-left transition-colors ${
                        value.fruit === fruit && value.ripeness === level
                          ? 'bg-blue-100 text-blue-800 font-medium'
                          : 'hover:bg-gray-100'
                      }`}
                      onClick={() => {
                        onChange({fruit, ripeness: level});
                        close();
                      }}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </ComplexSelector>
    </div>
  );
}
