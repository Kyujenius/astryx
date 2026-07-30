import {DateRangeInput, type DateRange} from '@astryxdesign/core/DateRangeInput';
import {Stack} from '@astryxdesign/core/Stack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Card} from '@astryxdesign/core/Card';
import {useState} from 'react';

export default function HotelBookingDatePicker() {
  const [dateRange, setDateRange] = useState<DateRange | null>(null);

  const today = new Date();
  const todayISO = today.toISOString().split('T')[0] as `${number}-${number}-${number}`;

  const nights = dateRange
    ? Math.ceil(
        (new Date(dateRange.end).getTime() - new Date(dateRange.start).getTime()) /
          (1000 * 60 * 60 * 24)
      )
    : 0;

  return (
    <Card>
      <Stack gap={4}>
        <Heading level={2}>Book Your Stay</Heading>
        <Text type="supporting">
          Select your check-in and check-out dates to see availability.
        </Text>

        <DateRangeInput
          label="Stay dates"
          value={dateRange}
          onChange={setDateRange}
          min={todayISO}
          placeholder="Select check-in and check-out"
          description="Past dates are not available for booking"
        />

        {dateRange && (
          <Stack gap={1}>
            <Text type="label">
              {nights} night{nights !== 1 ? 's' : ''} selected
            </Text>
            <Text type="supporting">
              {new Date(dateRange.start).toLocaleDateString()} -{' '}
              {new Date(dateRange.end).toLocaleDateString()}
            </Text>
          </Stack>
        )}
      </Stack>
    </Card>
  );
}
