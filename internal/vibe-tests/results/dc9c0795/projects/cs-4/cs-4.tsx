import {useState} from 'react';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Label} from '@/components/ui/label';

export default function SnackSelector() {
  const [selected, setSelected] = useState<string>('');
  const [customSnack, setCustomSnack] = useState('');
  const [appliedSnack, setAppliedSnack] = useState<string | null>(null);

  const handleChange = (value: string) => {
    setSelected(value);
    if (value !== 'other') {
      setAppliedSnack(value);
    }
  };

  const handleApplyCustom = () => {
    if (customSnack.trim()) {
      setAppliedSnack(customSnack.trim());
    }
  };

  return (
    <div className="flex flex-col gap-3 max-w-sm">
      <div>
        <Label htmlFor="snack">Snack</Label>
        <Select value={selected} onValueChange={handleChange}>
          <SelectTrigger id="snack">
            <SelectValue placeholder="Choose a snack" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Apple">Apple</SelectItem>
            <SelectItem value="Banana">Banana</SelectItem>
            <SelectItem value="Orange">Orange</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {selected === 'other' && (
        <div className="flex flex-col gap-2">
          <Label htmlFor="custom">Custom snack</Label>
          <Input
            id="custom"
            value={customSnack}
            onChange={(e) => setCustomSnack(e.target.value)}
            placeholder="Enter your snack"
          />
          <Button onClick={handleApplyCustom}>Apply</Button>
        </div>
      )}
      {appliedSnack && <p className="text-sm text-muted-foreground">Selected snack: {appliedSnack}</p>}
    </div>
  );
}
