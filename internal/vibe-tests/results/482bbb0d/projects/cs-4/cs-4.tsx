import {useState} from 'react';
import {Label} from '@/components/ui/label';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';

const SNACKS = ['Apple', 'Banana', 'Orange'];

export default function SnackSelector() {
  const [selected, setSelected] = useState('');
  const [customSnack, setCustomSnack] = useState('');
  const [showCustom, setShowCustom] = useState(false);

  const handleSelect = (val: string) => {
    if (val === 'other') {
      setShowCustom(true);
      setSelected('');
    } else {
      setShowCustom(false);
      setSelected(val);
    }
  };

  const handleApply = () => {
    if (customSnack) {
      setSelected(customSnack);
      setShowCustom(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 max-w-sm">
      <Label htmlFor="snack-select">Snack</Label>
      <Select value={selected} onValueChange={handleSelect}>
        <SelectTrigger id="snack-select">
          <SelectValue placeholder="Choose a snack" />
        </SelectTrigger>
        <SelectContent>
          {SNACKS.map((snack) => (
            <SelectItem key={snack} value={snack}>{snack}</SelectItem>
          ))}
          <SelectItem value="other">Other</SelectItem>
        </SelectContent>
      </Select>
      {showCustom && (
        <div className="flex gap-2">
          <Input
            placeholder="Type your snack"
            value={customSnack}
            onChange={(e) => setCustomSnack(e.target.value)}
          />
          <Button onClick={handleApply} disabled={!customSnack}>
            Apply
          </Button>
        </div>
      )}
    </div>
  );
}
