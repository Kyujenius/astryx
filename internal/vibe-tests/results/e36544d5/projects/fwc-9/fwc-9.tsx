// Copyright (c) Meta Platforms, Inc. and affiliates.

import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {useState} from 'react';

export default function MeetingScheduler() {
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [duration, setDuration] = useState('30');

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Schedule a Meeting</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="time">Start Time</Label>
          <Input id="time" type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="duration">Duration (minutes)</Label>
          <Input id="duration" type="number" value={duration} onChange={(e) => setDuration(e.target.value)} min="5" />
        </div>
        <Button className="w-full" disabled={!date || !startTime}>Schedule Meeting</Button>
      </CardContent>
    </Card>
  );
}
