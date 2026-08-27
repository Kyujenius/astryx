import {useState} from 'react';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';

export default function SnackSelector() {
  const [snack, setSnack] = useState('');
  const [draft, setDraft] = useState('Apple');
  const [customSnack, setCustomSnack] = useState('');
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline">{snack || 'Select a snack...'}</Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="flex flex-col gap-3">
          <RadioGroup value={draft} onValueChange={setDraft}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Apple" id="apple" />
              <Label htmlFor="apple">Apple</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Banana" id="banana" />
              <Label htmlFor="banana">Banana</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Orange" id="orange" />
              <Label htmlFor="orange">Orange</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Other" id="other" />
              <Label htmlFor="other">Other</Label>
            </div>
          </RadioGroup>
          {draft === 'Other' && (
            <Input
              placeholder="Enter your snack..."
              value={customSnack}
              onChange={(e) => setCustomSnack(e.target.value)}
            />
          )}
          <Button onClick={() => {
            setSnack(draft === 'Other' ? customSnack : draft);
            setOpen(false);
          }}>Apply</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
