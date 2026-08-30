import React, {useState} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';

export default function MeetingScheduler() {
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('09:00');
  const [duration, setDuration] = useState('30');
  return (
    <Card className="w-full max-w-md">
      <CardHeader><CardTitle>Schedule a Meeting</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2"><Label htmlFor="date">Meeting date</Label><Input id="date" type="date" value={date} onChange={e => setDate(e.target.value)} required /></div>
        <div className="flex gap-3">
          <div className="flex-1 space-y-2"><Label htmlFor="time">Start time</Label><Input id="time" type="time" value={startTime} onChange={e => setStartTime(e.target.value)} /></div>
          <div className="flex-1 space-y-2">
            <Label>Duration</Label>
            <Select value={duration} onValueChange={setDuration}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="15">15 min</SelectItem><SelectItem value="30">30 min</SelectItem><SelectItem value="60">1 hour</SelectItem><SelectItem value="120">2 hours</SelectItem></SelectContent></Select>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{date && startTime ? `Meeting on ${date} at ${startTime} for ${duration} min` : 'Select date and time'}</p>
        <div className="flex justify-end gap-2"><Button variant="ghost">Cancel</Button><Button>Schedule</Button></div>
      </CardContent>
    </Card>
  );
}
