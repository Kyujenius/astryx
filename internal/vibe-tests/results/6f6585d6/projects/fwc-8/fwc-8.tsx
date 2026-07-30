import {useState} from 'react';

export default function HotelBookingDatePicker() {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const today = new Date().toISOString().split('T')[0];

  const nights = checkIn && checkOut ? Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000) : 0;

  return (
    <div style={{border: '1px solid #e5e7eb', borderRadius: 8, padding: 24, maxWidth: 400}}>
      <h2 style={{fontSize: 24, fontWeight: 700, marginBottom: 8}}>Book Your Stay</h2>
      <p style={{color: '#6b7280', fontSize: 14, marginBottom: 16}}>Select check-in and check-out dates.</p>
      <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
        <label style={{display: 'flex', flexDirection: 'column', gap: 4}}>
          <span style={{fontSize: 14, fontWeight: 500}}>Check-in</span>
          <input type="date" value={checkIn} min={today} onChange={e => setCheckIn(e.target.value)} style={{padding: 8, border: '1px solid #d1d5db', borderRadius: 6}} />
        </label>
        <label style={{display: 'flex', flexDirection: 'column', gap: 4}}>
          <span style={{fontSize: 14, fontWeight: 500}}>Check-out</span>
          <input type="date" value={checkOut} min={checkIn || today} onChange={e => setCheckOut(e.target.value)} style={{padding: 8, border: '1px solid #d1d5db', borderRadius: 6}} />
        </label>
        {nights > 0 && <p style={{fontSize: 14, fontWeight: 500}}>{nights} night{nights !== 1 ? 's' : ''} selected</p>}
      </div>
    </div>
  );
}
