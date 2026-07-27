import {DateInput} from '@astryxdesign/core/DateInput';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {useState} from 'react';

export default function HotelDatePicker() {
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const today = new Date();
  const nights = checkIn && checkOut ? Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)) : 0;
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <Heading level={2}>Book Your Stay</Heading>
      <Text className="mt-1 mb-4">Select your check-in and check-out dates</Text>
      <div className="flex gap-4">
        <DateInput label="Check-in" value={checkIn} onChange={setCheckIn} min={today} />
        <DateInput label="Check-out" value={checkOut} onChange={setCheckOut} min={checkIn || today} />
      </div>
      {nights > 0 && <Text className="mt-4 text-sm text-gray-600">{nights} night{nights > 1 ? 's' : ''}</Text>}
    </div>
  );
}
