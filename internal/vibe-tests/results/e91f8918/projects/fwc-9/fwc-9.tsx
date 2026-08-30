import React, {useState} from 'react';
import {DateInput} from '@astryxdesign/core/DateInput';
import {TimeInput} from '@astryxdesign/core/TimeInput';
import {Button} from '@astryxdesign/core/Button';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Card} from '@astryxdesign/core/Card';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Selector} from '@astryxdesign/core/Selector';

export default function MeetingScheduler() {
  const [date, setDate] = useState<string>('');
  const [startTime, setStartTime] = useState<string>('09:00');
  const [duration, setDuration] = useState<string>('30');

  const durationOptions = [
    {value: '15', label: '15 minutes'},
    {value: '30', label: '30 minutes'},
    {value: '45', label: '45 minutes'},
    {value: '60', label: '1 hour'},
    {value: '90', label: '1.5 hours'},
    {value: '120', label: '2 hours'},
  ];

  return (
    <Card padding={4} maxWidth={480}>
      <VStack gap={4}>
        <Heading level={2}>Schedule a Meeting</Heading>
        <DateInput
          label="Meeting date"
          value={date}
          onChange={setDate}
          isRequired
        />
        <HStack gap={3}>
          <TimeInput
            label="Start time"
            value={startTime}
            onChange={setStartTime}
          />
          <Selector
            label="Duration"
            options={durationOptions}
            value={duration}
            onChange={setDuration}
          />
        </HStack>
        <Text type="supporting">
          {date && startTime
            ? `Meeting on ${date} at ${startTime} for ${duration} minutes`
            : 'Select a date and time to schedule your meeting'}
        </Text>
        <HStack gap={2} hAlign="end">
          <Button label="Cancel" variant="ghost" onClick={() => {}} />
          <Button label="Schedule" variant="primary" onClick={() => {}} />
        </HStack>
      </VStack>
    </Card>
  );
}
