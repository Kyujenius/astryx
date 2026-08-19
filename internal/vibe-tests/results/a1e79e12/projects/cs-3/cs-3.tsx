import {useState} from 'react';
import {Button} from './components/ui/button';
import {Popover, PopoverContent, PopoverTrigger} from './components/ui/popover';
import {Label} from './components/ui/label';
import {Input} from './components/ui/input';

const presets = [
  {label: 'Today', days: 0},
  {label: 'Tomorrow', days: 1},
  {label: 'Next week', days: 7},
];

export default function DeadlinePicker() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('12:00');
  const [isOpen, setIsOpen] = useState(false);

  const handlePreset = (days: number) => {
    const d = new Date();
    d.setDate(d.getDate() + days);
    setDate(d.toISOString().split('T')[0]);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline">
          {date ? date : 'Set deadline'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Quick presets</Label>
            <div className="flex gap-2">
              {presets.map((p) => (
                <Button key={p.label} variant="outline" size="sm" onClick={() => handlePreset(p.days)}>
                  {p.label}
                </Button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="time">Time</Label>
            <Input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setIsOpen(false)}>Apply</Button>
            <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
