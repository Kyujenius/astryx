import {useState} from 'react';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {Button} from '@/components/ui/button';
import {Calendar} from '@/components/ui/calendar';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';

type DeadlinePreset = 'today' | 'tomorrow' | 'next-week' | 'custom';

function getPresetDate(preset: DeadlinePreset): Date {
  const now = new Date();
  switch (preset) {
    case 'today': return now;
    case 'tomorrow': return new Date(now.setDate(now.getDate() + 1));
    case 'next-week': return new Date(now.setDate(now.getDate() + 7));
    default: return now;
  }
}

export default function DeadlinePicker() {
  const [open, setOpen] = useState(false);
  const [deadline, setDeadline] = useState<Date | undefined>();
  const [time, setTime] = useState('09:00');
  const [tab, setTab] = useState<string>('presets');

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[240px] justify-start text-left">
          {deadline ? deadline.toLocaleDateString() + ' ' + time : 'Set a deadline'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4" align="start">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="presets">Presets</TabsTrigger>
            <TabsTrigger value="custom">Custom</TabsTrigger>
          </TabsList>
          <TabsContent value="presets" className="space-y-2 pt-2">
            {(['today', 'tomorrow', 'next-week'] as const).map((preset) => (
              <Button
                key={preset}
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  setDeadline(getPresetDate(preset));
                  setOpen(false);
                }}
              >
                {preset === 'today' ? 'Today' : preset === 'tomorrow' ? 'Tomorrow' : 'Next week'}
              </Button>
            ))}
          </TabsContent>
          <TabsContent value="custom" className="space-y-3 pt-2">
            <Calendar mode="single" selected={deadline} onSelect={setDeadline} />
            <div className="space-y-1">
              <Label htmlFor="time">Time</Label>
              <Input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
            </div>
            <Button className="w-full" onClick={() => setOpen(false)}>Apply</Button>
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
}
