import {useState} from 'react';
import {Slider} from '@astryxdesign/core/Slider';
import {VStack} from '@astryxdesign/core/VStack';
import {Text} from '@astryxdesign/core/Text';
import {Heading} from '@astryxdesign/core/Heading';

export default function PriceRangeFilter() {
  const [range, setRange] = useState<[number, number]>([20, 80]);

  return (
    <VStack gap={4} padding={4}>
      <Heading level={3}>Price Range</Heading>
      <Text type="large">
        ${range[0]} - ${range[1]}
      </Text>
      <Slider
        label="Price range"
        value={range}
        onChange={(value) => setRange(value as [number, number])}
        min={0}
        max={200}
        step={5}
        formatValue={(v) => `$${v}`}
        valueDisplay="tooltip"
        minStepsBetweenThumbs={1}
      />
    </VStack>
  );
}
