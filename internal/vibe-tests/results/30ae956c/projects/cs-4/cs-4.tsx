import {useState} from 'react';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';

export default function SnackSelector() {
  const [snack, setSnack] = useState('Apple');
  const [selection, setSelection] = useState('Apple');
  const [customSnack, setCustomSnack] = useState('');
  const [open, setOpen] = useState(false);

  const handleApply = () => {
    if (selection === 'Other') {
      if (customSnack.trim()) {
        setSnack(customSnack.trim());
        setOpen(false);
      }
    } else {
      setSnack(selection);
      setOpen(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline">{snack}</Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="space-y-4">
          <RadioGroup value={selection} onValueChange={setSelection}>
            {['Apple', 'Banana', 'Orange', 'Other'].map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={option} />
                <Label htmlFor={option}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
          {selection === 'Other' && (
            <Input
              placeholder="Enter custom snack"
              value={customSnack}
              onChange={(e) => setCustomSnack(e.target.value)}
            />
          )}
          <Button onClick={handleApply} className="w-full">Apply</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
