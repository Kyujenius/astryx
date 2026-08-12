import {useState} from 'react';
import {RadioGroup, RadioGroupItem} from '../components/ui/radio-group';
import {Label} from '../components/ui/label';
import {Input} from '../components/ui/input';
import {Button} from '../components/ui/button';

export default function SnackSelector() {
  const [snack, setSnack] = useState('');
  const [customSnack, setCustomSnack] = useState('');

  return (
    <div className="w-full max-w-sm space-y-4 p-4">
      <label className="text-sm font-medium">Choose a snack</label>
      <RadioGroup value={snack} onValueChange={setSnack}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="apple" id="apple" />
          <Label htmlFor="apple">Apple</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="banana" id="banana" />
          <Label htmlFor="banana">Banana</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="orange" id="orange" />
          <Label htmlFor="orange">Orange</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="other" id="other" />
          <Label htmlFor="other">Other</Label>
        </div>
      </RadioGroup>
      {snack === 'other' && (
        <div className="space-y-2">
          <Input
            placeholder="Enter your snack"
            value={customSnack}
            onChange={(e) => setCustomSnack(e.target.value)}
          />
          <Button size="sm" onClick={() => console.log('Applied:', customSnack)}>
            Apply
          </Button>
        </div>
      )}
    </div>
  );
}
