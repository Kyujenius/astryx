import {useState} from 'react';
export default function HotelDatePicker() {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const today = new Date().toISOString().split('T')[0];
  const nights = checkIn && checkOut ? Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)) : 0;
  return (<div style={{maxWidth: 400, margin: '0 auto', padding: 24, border: '1px solid #ddd', borderRadius: 8}}><h2 style={{fontSize: 24, marginBottom: 8}}>Book Your Stay</h2><p style={{color: '#666', marginBottom: 16}}>Select your dates</p><div style={{display: 'flex', gap: 16}}><div style={{flex: 1}}><label style={{display: 'block', fontSize: 14, marginBottom: 4}}>Check-in</label><input type="date" min={today} value={checkIn} onChange={e => setCheckIn(e.target.value)} style={{width: '100%', padding: 8, border: '1px solid #ccc', borderRadius: 4}} /></div><div style={{flex: 1}}><label style={{display: 'block', fontSize: 14, marginBottom: 4}}>Check-out</label><input type="date" min={checkIn || today} value={checkOut} onChange={e => setCheckOut(e.target.value)} style={{width: '100%', padding: 8, border: '1px solid #ccc', borderRadius: 4}} /></div></div>{nights > 0 && <p style={{marginTop: 16, color: '#666'}}>{nights} night{nights > 1 ? 's' : ''}</p>}</div>);
}
