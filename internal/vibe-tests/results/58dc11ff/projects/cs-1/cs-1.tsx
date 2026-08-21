import {useState} from 'react';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {Label} from '@/components/ui/label';

const fruits = ['Apple', 'Banana', 'Mango', 'Strawberry'];
const ripenessLevels = ['Unripe', 'Almost Ripe', 'Ripe', 'Overripe'];

export default function FruitPicker() {
  const [fruit, setFruit] = useState('Apple');
  const [ripeness, setRipeness] = useState('Ripe');

  return (
    <div className="flex flex-col gap-4 p-6 max-w-sm">
      <h2 className="text-lg font-semibold">Fruit Picker</h2>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="fruit-select">Fruit</Label>
          <Select value={fruit} onValueChange={setFruit}>
            <SelectTrigger id="fruit-select">
              <SelectValue placeholder="Select fruit" />
            </SelectTrigger>
            <SelectContent>
              {fruits.map(f => (
                <SelectItem key={f} value={f}>{f}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="ripeness-select">Ripeness</Label>
          <Select value={ripeness} onValueChange={setRipeness}>
            <SelectTrigger id="ripeness-select">
              <SelectValue placeholder="Select ripeness" />
            </SelectTrigger>
            <SelectContent>
              {ripenessLevels.map(r => (
                <SelectItem key={r} value={r}>{r}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">
        Selected: {fruit} - {ripeness}
      </p>
    </div>
  );
}
