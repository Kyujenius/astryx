import {useState} from 'react';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Label} from '@/components/ui/label';

export default function SnackSelector() {
  const [selected, setSelected] = useState('');
  const [customSnack, setCustomSnack] = useState('');
  const [appliedSnack, setAppliedSnack] = useState<string | null>(null);

  return (
    <div className="space-y-4 max-w-sm">
      <div className="space-y-2">
        <Label>Choose a snack</Label>
        <Select value={selected} onValueChange={setSelected}>
          <SelectTrigger><SelectValue placeholder="Select a snack..." /></SelectTrigger>
          <SelectContent>
            <SelectItem value="Apple">Apple</SelectItem>
            <SelectItem value="Banana">Banana</SelectItem>
            <SelectItem value="Orange">Orange</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {selected === 'Other' && (
        <div className="space-y-2">
          <Label>Custom snack</Label>
          <Input value={customSnack} onChange={(e) => setCustomSnack(e.target.value)} placeholder="Enter your snack..." />
          <Button onClick={() => { if (customSnack.trim()) setAppliedSnack(customSnack); }}>Apply</Button>
        </div>
      )}
      {appliedSnack && <p>Selected: {appliedSnack}</p>}
      {selected && selected !== 'Other' && <p>Selected: {selected}</p>}
    </div>
  );
}
