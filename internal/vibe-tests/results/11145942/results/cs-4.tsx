import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Label} from '@/components/ui/label';
import {useState} from 'react';

export default function SnackSelector() {
  const [selected, setSelected] = useState('');
  const [customSnack, setCustomSnack] = useState('');
  const [appliedSnack, setAppliedSnack] = useState('');

  return (
    <div className="space-y-4 max-w-sm">
      <div className="space-y-2">
        <Label htmlFor="snack">Choose a snack</Label>
        <Select value={selected} onValueChange={setSelected}>
          <SelectTrigger><SelectValue placeholder="Select a snack..." /></SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="orange">Orange</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {selected === 'other' && <div className="space-y-2"><Label>Custom snack</Label><Input value={customSnack} onChange={e => setCustomSnack(e.target.value)} placeholder="Enter your snack..." /></div>}
      <Button onClick={() => setAppliedSnack(selected === 'other' ? customSnack : selected)} disabled={selected === 'other' ? !customSnack : !selected}>Apply</Button>
      {appliedSnack && <p className="text-sm text-muted-foreground">Selected: {appliedSnack}</p>}
    </div>
  );
}