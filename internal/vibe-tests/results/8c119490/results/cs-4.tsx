import {useState} from 'react';
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Select, SelectTrigger, SelectValue, SelectContent, SelectItem} from '@/components/ui/select';

export default function SnackSelector() {
  const [snack, setSnack] = useState('Apple');
  const [custom, setCustom] = useState('');

  return (
    <div className="flex flex-col gap-3 w-64">
      <Label>Choose a snack</Label>
      <Select value={snack} onValueChange={setSnack}>
        <SelectTrigger>
          <SelectValue placeholder="Select a snack" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Apple">Apple</SelectItem>
          <SelectItem value="Banana">Banana</SelectItem>
          <SelectItem value="Orange">Orange</SelectItem>
          <SelectItem value="__other">Other</SelectItem>
        </SelectContent>
      </Select>
      {snack === '__other' && (
        <div className="flex flex-col gap-2">
          <Input
            placeholder="Enter custom snack"
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
          />
          <Button
            onClick={() => { if (custom.trim()) setSnack(custom.trim()); }}
            disabled={!custom.trim()}
          >
            Apply
          </Button>
        </div>
      )}
      <p className="text-sm text-muted-foreground">Selected: {snack}</p>
    </div>
  );
}
