import {Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue} from '@/components/ui/select';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {Label} from '@/components/ui/label';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {Button} from '@/components/ui/button';
import {useState} from 'react';

const fruits = ['Apple', 'Banana', 'Mango', 'Peach', 'Strawberry'];
const ripenessLevels = ['Unripe', 'Slightly Ripe', 'Ripe', 'Overripe'];

export default function FruitPicker() {
  const [fruit, setFruit] = useState('Apple');
  const [ripeness, setRipeness] = useState('Ripe');
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[280px] justify-between">
          {fruit} - {ripeness}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-4">
        <div className="flex flex-col gap-4">
          <div>
            <Label className="text-sm font-medium mb-2 block">Fruit</Label>
            <RadioGroup value={fruit} onValueChange={setFruit}>
              {fruits.map((f) => (
                <div key={f} className="flex items-center space-x-2">
                  <RadioGroupItem value={f} id={`fruit-${f}`} />
                  <Label htmlFor={`fruit-${f}`}>{f}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <div>
            <Label className="text-sm font-medium mb-2 block">Ripeness</Label>
            <RadioGroup value={ripeness} onValueChange={(v) => { setRipeness(v); setOpen(false); }}>
              {ripenessLevels.map((r) => (
                <div key={r} className="flex items-center space-x-2">
                  <RadioGroupItem value={r} id={`ripe-${r}`} />
                  <Label htmlFor={`ripe-${r}`}>{r}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
