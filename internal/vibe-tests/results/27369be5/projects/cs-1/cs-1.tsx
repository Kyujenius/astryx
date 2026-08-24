import {Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue} from '@/components/ui/select';
import {useState} from 'react';

const fruits = ['Apple', 'Banana', 'Mango', 'Peach', 'Strawberry'];
const ripenessLevels = ['Unripe', 'Nearly Ripe', 'Ripe', 'Overripe'];

export default function FruitPicker() {
  const [value, setValue] = useState<string>('');

  return (
    <div className="max-w-xs p-6">
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Pick a fruit and ripeness" />
        </SelectTrigger>
        <SelectContent>
          {fruits.map(fruit => (
            <SelectGroup key={fruit}>
              <SelectLabel>{fruit}</SelectLabel>
              {ripenessLevels.map(ripeness => (
                <SelectItem key={`${fruit}-${ripeness}`} value={`${fruit}::${ripeness}`}>
                  {fruit} - {ripeness}
                </SelectItem>
              ))}
            </SelectGroup>
          ))}
        </SelectContent>
      </Select>
      {value && <p className="mt-3 text-sm text-muted-foreground">Selected: {value.replace('::', ' - ')}</p>}
    </div>
  );
}
