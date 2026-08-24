import {Selector} from '@astryxdesign/core/Selector';
import {useState} from 'react';

const fruits = ['Apple', 'Banana', 'Mango', 'Peach', 'Strawberry'];
const ripenessLevels = ['Unripe', 'Nearly Ripe', 'Ripe', 'Overripe'];

type FruitChoice = {fruit: string; ripeness: string};

export default function FruitPicker() {
  const [selected, setSelected] = useState<FruitChoice | null>(null);

  const options = fruits.flatMap((fruit, fi) => [
    ...(fi > 0 ? [{type: 'divider' as const}] : []),
    {type: 'section' as const, title: fruit, items: ripenessLevels.map(r => ({
      value: `${fruit}::${r}`,
      label: `${fruit} - ${r}`,
    }))},
  ]);

  return (
    <Selector
      label="Fruit & Ripeness"
      placeholder="Pick a fruit and ripeness"
      options={options}
      value={selected ? `${selected.fruit}::${selected.ripeness}` : undefined}
      hasSearch
      onChange={(val) => {
        const [fruit, ripeness] = val.split('::');
        setSelected({fruit, ripeness});
      }}
    />
  );
}
