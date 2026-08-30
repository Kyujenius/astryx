import React, {useState} from 'react';

export default function MeetingScheduler() {
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('09:00');
  const [duration, setDuration] = useState('30');
  const inputStyle = {width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc', fontSize: 14};
  return (
    <div style={{maxWidth: 480, padding: 24, border: '1px solid #ddd', borderRadius: 8}}>
      <h2 style={{margin: '0 0 16px', fontSize: 20, fontWeight: 600}}>Schedule a Meeting</h2>
      <div style={{marginBottom: 16}}>
        <label style={{display: 'block', marginBottom: 4, fontWeight: 500}}>Meeting date *</label>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} style={inputStyle} required />
      </div>
      <div style={{display: 'flex', gap: 12, marginBottom: 16}}>
        <div style={{flex: 1}}><label style={{display: 'block', marginBottom: 4, fontWeight: 500}}>Start time</label><input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} style={inputStyle} /></div>
        <div style={{flex: 1}}><label style={{display: 'block', marginBottom: 4, fontWeight: 500}}>Duration</label><select value={duration} onChange={e => setDuration(e.target.value)} style={inputStyle}><option value="15">15 min</option><option value="30">30 min</option><option value="60">1 hour</option><option value="120">2 hours</option></select></div>
      </div>
      <p style={{color: '#666', fontSize: 14, marginBottom: 16}}>{date && startTime ? `Meeting on ${date} at ${startTime} for ${duration} min` : 'Select date and time'}</p>
      <div style={{display: 'flex', justifyContent: 'flex-end', gap: 8}}>
        <button style={{padding: '8px 16px', border: 'none', background: 'transparent', cursor: 'pointer'}}>Cancel</button>
        <button style={{padding: '8px 16px', border: 'none', background: '#3b82f6', color: 'white', borderRadius: 4, cursor: 'pointer'}}>Schedule</button>
      </div>
    </div>
  );
}
