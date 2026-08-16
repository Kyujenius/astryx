import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Calendar} from '@/components/ui/calendar';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';

type Preset = 'today' | 'tomorrow' | 'next-week' | 'custom';

function getPresetDate(key: Preset): Date | undefined {
  const now = new Date();
  switch (key) {
    case 'today': return now;
    case 'tomorrow': return new Date(now.getTime() + 86400000);
    case 'next-week': return new Date(now.getTime() + 7 * 86400000);
    default: return undefined;
  }
}

export default function DeadlinePicker() {
  const [preset, setPreset] = useState<Preset | ''>('');
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState('17:00');
  const [confirmed, setConfirmed] = useState(false);

  const handlePresetChange = (value: string) => {
    const key = value as Preset;
    setPreset(key);
    if (key !== 'custom') {
      setDate(getPresetDate(key));
    }
    setConfirmed(false);
  };

  return (
    <div className="flex flex-col gap-4 p-6 max-w-sm border rounded-lg">
      <Label>Deadline</Label>
      <Select value={preset} onValueChange={handlePresetChange}>
        <SelectTrigger>
          <SelectValue placeholder="Choose a deadline..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="today">Today</SelectItem>
          <SelectItem value="tomorrow">Tomorrow</SelectItem>
          <SelectItem value="next-week">Next week</SelectItem>
          <SelectItem value="custom">Custom date and time</SelectItem>
        </SelectContent>
      </Select>
      {preset === 'custom' && (
        <div className="flex flex-col gap-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                {date ? date.toLocaleDateString() : 'Pick a date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={date} onSelect={(d) => { setDate(d); setConfirmed(false); }} />
            </PopoverContent>
          </Popover>
          <div className="flex flex-col gap-1">
            <Label htmlFor="time">Time</Label>
            <Input id="time" type="time" value={time} onChange={(e) => { setTime(e.target.value); setConfirmed(false); }} />
          </div>
        </div>
      )}
      {date && (
        <Button onClick={() => setConfirmed(true)} disabled={confirmed}>
          {confirmed ? 'Applied' : 'Apply deadline'}
        </Button>
      )}
      {confirmed && (
        <p className="text-sm text-muted-foreground">
          Deadline set: {date?.toLocaleDateString()}{time ? ` at ${time}` : ''}
        </p>
      )}
    </div>
  );
}
