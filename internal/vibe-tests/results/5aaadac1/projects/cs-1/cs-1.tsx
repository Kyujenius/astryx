import {useState} from 'react';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {Label} from '@/components/ui/label';

const fruits = ['Apple', 'Banana', 'Cherry', 'Mango', 'Peach'];
const ripenessLevels = ['Unripe', 'Nearly Ripe', 'Ripe', 'Overripe'];

export default function FruitPicker() {
  const [fruit, setFruit] = useState('');
  const [ripeness, setRipeness] = useState('');

  return (
    <div className="space-y-4 p-6 max-w-md">
      <h2 className="text-xl font-semibold">Fruit Picker</h2>
      <div className="space-y-2">
        <Label htmlFor="fruit-select">Fruit</Label>
        <Select value={fruit} onValueChange={setFruit}>
          <SelectTrigger id="fruit-select">
            <SelectValue placeholder="Choose a fruit" />
          </SelectTrigger>
          <SelectContent>
            {fruits.map((f) => (
              <SelectItem key={f} value={f}>{f}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="ripeness-select">Ripeness</Label>
        <Select value={ripeness} onValueChange={setRipeness}>
          <SelectTrigger id="ripeness-select">
            <SelectValue placeholder="Choose ripeness" />
          </SelectTrigger>
          <SelectContent>
            {ripenessLevels.map((level) => (
              <SelectItem key={level} value={level}>{level}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {fruit && ripeness && (
        <p className="text-sm text-muted-foreground">Selected: {fruit} - {ripeness}</p>
      )}
    </div>
  );
}
