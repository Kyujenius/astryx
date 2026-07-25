// Copyright (c) Meta Platforms, Inc. and affiliates.

import {VStack} from '@astryxdesign/core/Stack';
import {DateInput} from '@astryxdesign/core/DateInput';
import {TimeInput, type ISOTimeString} from '@astryxdesign/core/TimeInput';
import {NumberInput} from '@astryxdesign/core/NumberInput';
import {Button} from '@astryxdesign/core/Button';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {useState} from 'react';

type ISODate = `${number}${number}${number}${number}-${number}${number}-${number}${number}`;

export default function MeetingScheduler() {
  const [date, setDate] = useState<ISODate | undefined>(undefined);
  const [startTime, setStartTime] = useState<ISOTimeString | undefined>(undefined);
  const [duration, setDuration] = useState<number | null>(30);

  return (
    <VStack gap={4} padding={4} maxWidth={480}>
      <Heading level={2}>Schedule a Meeting</Heading>
      <Text type="supporting">Pick a date, start time, and duration for your meeting.</Text>
      <DateInput
        label="Date"
        value={date}
        onChange={(v) => setDate(v)}
        isRequired
      />
      <TimeInput
        label="Start time"
        value={startTime}
        onChange={(v) => setStartTime(v)}
        isRequired
      />
      <NumberInput
        label="Duration (minutes)"
        value={duration}
        onChange={setDuration}
        min={5}
      />
      <Button
        label="Schedule meeting"
        variant="primary"
        isDisabled={!date || !startTime}
      />
    </VStack>
  );
}
