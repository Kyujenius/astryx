import {useState} from 'react';
import {Slider} from '@astryxdesign/core/Slider';
import {Text} from '@astryxdesign/core/Text';
import {Card} from '@astryxdesign/core/Card';

export default function PriceRangeFilter() {
  const [range, setRange] = useState<[number, number]>([20, 80]);

  return (
    <Card padding={4} width={360}>
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
      <Text type="body" display="block">
        ${range[0]} - ${range[1]}
      </Text>
    </Card>
  );
}
