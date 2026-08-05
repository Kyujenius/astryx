// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';

export default function DateRangePicker() {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const today = new Date().toISOString().split('T')[0];

  return (
    <div style={{padding: 24, maxWidth: 400, fontFamily: 'sans-serif'}}>
      <h3 style={{margin: '0 0 8px'}}>Book Your Stay</h3>
      <p style={{margin: '0 0 16px', color: '#666'}}>Select check-in and check-out dates</p>
      <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
        <label style={{display: 'flex', flexDirection: 'column', gap: 4}}>
          Check-in
          <input type="date" min={today} value={checkIn} onChange={(e) => setCheckIn(e.target.value)} style={{padding: 8, border: '1px solid #ccc', borderRadius: 4}} />
        </label>
        <label style={{display: 'flex', flexDirection: 'column', gap: 4}}>
          Check-out
          <input type="date" min={checkIn || today} value={checkOut} onChange={(e) => setCheckOut(e.target.value)} style={{padding: 8, border: '1px solid #ccc', borderRadius: 4}} />
        </label>
      </div>
      {checkIn && checkOut && (
        <button style={{marginTop: 16, padding: '8px 16px', background: '#0066cc', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer'}}>Confirm Booking</button>
      )}
    </div>
  );
}