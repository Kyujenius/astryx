import {useState} from 'react';

export default function HotelDatePicker() {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const today = new Date().toISOString().split('T')[0];

  return (
    <div style={{padding: 24, fontFamily: 'system-ui, sans-serif'}}>
      <h2 style={{fontSize: 24, fontWeight: 600, marginBottom: 8}}>Select Your Stay</h2>
      <p style={{color: '#666', marginBottom: 16}}>
        Pick your check-in and check-out dates
      </p>
      <div style={{display: 'flex', gap: 16, flexWrap: 'wrap'}}>
        <label style={{display: 'flex', flexDirection: 'column', gap: 4}}>
          <span style={{fontSize: 14, fontWeight: 500}}>Check-in</span>
          <input
            type="date"
            value={checkIn}
            min={today}
            onChange={(e) => {
              setCheckIn(e.target.value);
              if (checkOut && e.target.value > checkOut) setCheckOut('');
            }}
            style={{padding: '8px 12px', border: '1px solid #ccc', borderRadius: 6}}
          />
        </label>
        <label style={{display: 'flex', flexDirection: 'column', gap: 4}}>
          <span style={{fontSize: 14, fontWeight: 500}}>Check-out</span>
          <input
            type="date"
            value={checkOut}
            min={checkIn || today}
            onChange={(e) => setCheckOut(e.target.value)}
            style={{padding: '8px 12px', border: '1px solid #ccc', borderRadius: 6}}
          />
        </label>
      </div>
      {checkIn && checkOut && (
        <div style={{marginTop: 16, padding: 12, background: '#f5f5f5', borderRadius: 8}}>
          <p style={{margin: 0}}>Check-in: {checkIn}</p>
          <p style={{margin: '4px 0 0'}}>Check-out: {checkOut}</p>
        </div>
      )}
    </div>
  );
}
