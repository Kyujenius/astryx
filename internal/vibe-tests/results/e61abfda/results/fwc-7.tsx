import {useState} from 'react';
import {Slider} from '@astryxdesign/core/Slider';
import {Text} from '@astryxdesign/core/Text';

export default function PriceRangeFilter() {
  const [range, setRange] = useState<[number, number]>([20, 80]);

  return (
    <div className="flex flex-col gap-4 p-6 max-w-sm">
      <Text type="label" display="block">Price Range</Text>
      <Slider
        label="Price range"
        value={range}
        onChange={(v) => setRange(v as [number, number])}
        min={0}
        max={200}
        step={5}
        formatValue={(v) => `$${v}`}
        valueDisplay="tooltip"
      />
      <div className="flex justify-between">
        <Text type="body">${range[0]}</Text>
        <Text type="body">${range[1]}</Text>
      </div>
    </div>
  );
}
