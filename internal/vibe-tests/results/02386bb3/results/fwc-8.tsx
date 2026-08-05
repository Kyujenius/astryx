// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {Card} from '@astryxdesign/core/Card';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {TextInput} from '@astryxdesign/core/TextInput';

export default function DateRangePicker() {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const today = new Date().toISOString().split('T')[0];

  return (
    <Card>
      <div className="p-6 space-y-4">
        <Heading level={3}>Book Your Stay</Heading>
        <Text>Select check-in and check-out dates</Text>
        <div className="flex gap-4">
          <TextInput label="Check-in" value={checkIn} onChange={setCheckIn} placeholder="YYYY-MM-DD" />
          <TextInput label="Check-out" value={checkOut} onChange={setCheckOut} placeholder="YYYY-MM-DD" />
        </div>
        {checkIn && checkOut && checkIn >= today && (
          <Button label="Confirm Booking" onPress={() => {}} />
        )}
      </div>
    </Card>
  );
}