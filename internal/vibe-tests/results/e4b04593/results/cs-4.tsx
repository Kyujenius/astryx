import {useState} from 'react';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Button} from '@/components/ui/button';

const snacks = ['Apple', 'Banana', 'Orange', 'Other'];

export default function SnackSelector() {
  const [snack, setSnack] = useState('');
  const [customSnack, setCustomSnack] = useState('');

  return (
    <div className="max-w-sm space-y-4">
      <div className="space-y-2">
        <Label htmlFor="snack-select">Choose a snack</Label>
        <Select value={snack} onValueChange={setSnack}>
          <SelectTrigger>
            <SelectValue placeholder="Select a snack" />
          </SelectTrigger>
          <SelectContent>
            {snacks.map((s) => (
              <SelectItem key={s} value={s}>{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {snack === 'Other' && (
        <div className="space-y-2">
          <Label htmlFor="custom-snack">Custom snack</Label>
          <Input
            id="custom-snack"
            value={customSnack}
            onChange={(e) => setCustomSnack(e.target.value)}
            placeholder="Enter your snack"
          />
          <Button disabled={!customSnack}>Apply</Button>
        </div>
      )}
    </div>
  );
}
