import {DateInput} from '@astryxdesign/core/DateInput';
import {Stack} from '@astryxdesign/core/Stack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Card} from '@astryxdesign/core/Card';
import {useState} from 'react';

export default function HotelDatePicker() {
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const today = new Date();

  return (
    <Card>
      <Stack gap="md">
        <Heading level={2}>Book Your Stay</Heading>
        <Text>Select your check-in and check-out dates</Text>
        <Stack direction="horizontal" gap="md">
          <DateInput label="Check-in" value={checkIn} onChange={setCheckIn} min={today} description="Select arrival date" />
          <DateInput label="Check-out" value={checkOut} onChange={setCheckOut} min={checkIn || today} description="Select departure date" />
        </Stack>
        {checkIn && checkOut && (
          <Text>{Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))} nights</Text>
        )}
      </Stack>
    </Card>
  );
}
