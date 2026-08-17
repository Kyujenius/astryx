import {useState} from 'react';
import {Slider} from '@/components/ui/slider';
import {Label} from '@/components/ui/label';

export default function PriceRangeFilter() {
  const [range, setRange] = useState([20, 80]);

  return (
    <div className="flex flex-col gap-4 p-6 max-w-sm">
      <Label>Price Range</Label>
      <Slider
        value={range}
        onValueChange={setRange}
        min={0}
        max={200}
        step={5}
      />
      <div className="flex justify-between text-sm">
        <span>${range[0]}</span>
        <span>${range[1]}</span>
      </div>
    </div>
  );
}
