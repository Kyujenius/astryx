import {Selector} from '@astryxdesign/core/Selector';
import {useState} from 'react';

const fruits = ['Apple', 'Banana', 'Mango', 'Peach', 'Strawberry'];
const ripenessLevels = ['Unripe', 'Nearly Ripe', 'Ripe', 'Overripe'];

export default function FruitPicker() {
  const [value, setValue] = useState<string | undefined>();

  const options = fruits.flatMap((fruit, i) => [
    ...(i > 0 ? [{type: 'divider' as const}] : []),
    {type: 'section' as const, title: fruit, items: ripenessLevels.map(r => ({
      value: `${fruit}::${r}`,
      label: `${fruit} - ${r}`,
    }))},
  ]);

  return (
    <div className="p-6 max-w-sm">
      <Selector
        label="Fruit & Ripeness"
        placeholder="Choose fruit and ripeness"
        options={options}
        value={value}
        onChange={setValue}
        hasSearch
        searchPlaceholder="Search fruits..."
      />
      {value && (
        <p className="mt-3 text-sm text-gray-600">
          Selected: {value.replace('::', ' - ')}
        </p>
      )}
    </div>
  );
}
