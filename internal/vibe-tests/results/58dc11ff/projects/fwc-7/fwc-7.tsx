import {useState} from 'react';
import {Slider} from '@/components/ui/slider';
import {Label} from '@/components/ui/label';

export default function PriceRangeFilter() {
  const [range, setRange] = useState([20, 80]);

  return (
    <div className="flex flex-col gap-4 p-6 max-w-md">
      <h3 className="text-lg font-semibold">Price Range</h3>
      <p className="text-2xl font-medium">
        ${range[0]} - ${range[1]}
      </p>
      <div className="flex flex-col gap-2">
        <Label>Price range</Label>
        <Slider
          value={range}
          onValueChange={setRange}
          min={0}
          max={200}
          step={5}
          minStepsBetweenThumbs={1}
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>$0</span>
          <span>$200</span>
        </div>
      </div>
    </div>
  );
}
