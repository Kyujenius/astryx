import {Calendar} from '@astryxdesign/core/Calendar';
import {Stack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import {useState} from 'react';

type DateRange = {start: string; end: string};

export default function HotelDatePicker() {
  const [range, setRange] = useState<DateRange | undefined>(undefined);
  const today = new Date().toISOString().split('T')[0];

  return (
    <Stack gap={3} padding={4}>
      <Text type="display-3">Select Your Stay</Text>
      <Text type="supporting" color="secondary">
        Pick your check-in and check-out dates
      </Text>
      <Calendar
        mode="range"
        value={range}
        onChange={(value: DateRange) => setRange(value)}
        min={today}
        numberOfMonths={2}
      />
      {range && (
        <Stack gap={1}>
          <Text type="body">Check-in: {range.start}</Text>
          <Text type="body">Check-out: {range.end}</Text>
        </Stack>
      )}
    </Stack>
  );
}
